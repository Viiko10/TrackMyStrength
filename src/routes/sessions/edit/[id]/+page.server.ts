import { db } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id;

	const session = await db.collection('sessions').findOne({ _id: new ObjectId(id) });
	if (!session) {
		return {
			status: 404,
			error: new Error('Session nicht gefunden')
		};
	}

	const goals = await db.collection('goals').find({ status: 'active' }).toArray();

	return {
		session: {
			_id: session._id.toString(),
			date: session.date,
			exercise: session.exercise,
			sets: session.sets,
			goalId: session.goalId?.toString() ?? '',
			weight: session.weight ?? ''
		},
		goals: goals.map((goal) => ({
			_id: goal._id.toString(),
			description: goal.description
		}))
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();
		const date = data.get('date')?.toString() ?? '';
		const exercise = data.get('exercise')?.toString() ?? '';
		const sets = data.get('sets')?.toString() ?? '';
		const goalId = data.get('goalId')?.toString() ?? '';
		const weightRaw = data.get('weight')?.toString() ?? '';
		const newWeight = weightRaw ? parseFloat(weightRaw) : null;

		const sessionId = new ObjectId(params.id);

		// Hole vorherige Session, um alte Werte zu vergleichen
		const oldSession = await db.collection('sessions').findOne({ _id: sessionId });

		// Aktualisiere die Session
		await db.collection('sessions').updateOne(
			{ _id: sessionId },
			{
				$set: {
					date,
					exercise,
					sets,
					goalId: goalId ? new ObjectId(goalId) : null,
					...(newWeight !== null ? { weight: newWeight } : {})
				}
			}
		);

		if (goalId && newWeight !== null) {
			const oldWeight = oldSession?.weight ?? 0;
			const oldGoalId = oldSession?.goalId?.toString() ?? null;

			const diff = newWeight - oldWeight;

			// Wenn das Ziel gleich geblieben ist ➜ einfach inkrementieren
			if (goalId === oldGoalId && diff !== 0 && !isNaN(diff)) {
				await db.collection('goals').updateOne(
					{ _id: new ObjectId(goalId) },
					{ $set: { achievedValue: diff } }
				);
			}

			// Wenn das Ziel gewechselt wurde ➜ alten Fortschritt abziehen, neuen hinzufügen
			if (goalId !== oldGoalId) {
				if (oldGoalId && oldWeight) {
					await db.collection('goals').updateOne(
						{ _id: new ObjectId(oldGoalId) },
						{ $set: { achievedValue: -oldWeight } }
					);
				}
				if (!isNaN(newWeight)) {
					await db.collection('goals').updateOne(
						{ _id: new ObjectId(goalId) },
						{ $set: { achievedValue: newWeight } }
					);
				}
			}
		}

		return { success: true };
	}
}
