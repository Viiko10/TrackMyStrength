	import { db } from '$lib/server/db';
	import { ObjectId } from 'mongodb';
	import type { PageServerLoad, Actions } from './$types';

	type Session = {
		_id: string;
		date: string;
		exercise: string;
		sets: string;
		goalId?: string;
	};

	type Goal = {
		title: string;
		targetValue: number;
		achievedValue: number;
		description: string;
		status: string;
	};

	export const load: PageServerLoad = async () => {
		const sessionsCollection = db.collection('sessions');
		const goalsCollection = db.collection('goals');

		const rawSessions = await sessionsCollection.find().toArray();

		const goalIds = rawSessions
			.filter((w) => w.goalId)
			.map((w) => new ObjectId(w.goalId));

		const goals = await goalsCollection
			.find({ _id: { $in: goalIds } })
			.toArray();

		const goalMap = new Map(
			goals.map((goal) => [
				goal._id.toString(),
				{
					title: goal.title,
					targetValue: goal.targetValue,
					achievedValue: goal.achievedValue ?? 0,
					description: goal.description ?? '',
					status: goal.status ?? 'offen'
				}
			])
		);

		const sessions = rawSessions.map((w) => ({
			_id: w._id.toString(),
			date: w.date,
			exercise: w.exercise,
			sets: w.sets,
			weight: w.weight ?? '',
			goal: w.goalId ? goalMap.get(w.goalId) ?? null : null
		}));

		return {
			sessions
		};
	};

	export const actions: Actions = {
delete: async ({ request }) => {
	const formData = await request.formData();
	const id = formData.get('id')?.toString();

	if (!id) return;

	const sessionsCollection = db.collection('sessions');
	const sessionId = new ObjectId(id);

	// Lade die Session vor dem Löschen
	const session = await sessionsCollection.findOne({ _id: sessionId });

	// Session löschen
	await sessionsCollection.deleteOne({ _id: sessionId });

	// Ziel-Fortschritt zurücksetzen, falls vorhanden
	if (session?.goalId && session.weight !== undefined) {
		const weight = parseFloat(session.weight);
		if (!isNaN(weight)) {
			await db.collection('goals').updateOne(
				{ _id: new ObjectId(session.goalId) },
				{ $set: { achievedValue: -weight } }
			);
		}
	}
}
	}
