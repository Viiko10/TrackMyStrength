import { db } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import { fail, redirect } from '@sveltejs/kit';

export const load = async () => {
	const goals = await db.collection('goals').find({}).toArray();

	return {
		goals: goals.map((goal) => ({
			_id: goal._id.toString(),
			description: goal.description ?? '(Kein Beschreibungstext)'
		}))
	};
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const date = formData.get('date')?.toString() ?? '';
		const exercise = formData.get('exercise')?.toString() ?? '';
		const sets = formData.get('sets')?.toString() ?? '';
		const weightRaw = formData.get('weight')?.toString() ?? '';
		const parsedWeight = parseFloat(weightRaw);
		const goalId = formData.get('goalId')?.toString() ?? '';

		if (!date || !exercise || !sets) {
			return fail(400, { message: 'Bitte fülle alle Pflichtfelder aus.' });
		}

		const session = {
			date,
			exercise,
			sets,
			weight: !isNaN(parsedWeight) ? parsedWeight : null,
			createdAt: new Date(),
			...(goalId ? { goalId: new ObjectId(goalId) } : {})
		};

		const result = await db.collection('sessions').insertOne(session);

		// 🔁 Neuberechnung: höchstes Gewicht für dieses Ziel finden
		if (goalId && !isNaN(parsedWeight)) {
			const sessionsWithGoal = await db.collection('sessions')
				.find({ goalId: new ObjectId(goalId), weight: { $ne: null } })
				.toArray();

			const maxWeight = sessionsWithGoal.reduce((max, s) => {
				const w = parseFloat(s.weight);
				return !isNaN(w) && w > max ? w : max;
			}, 0);

			await db.collection('goals').updateOne(
				{ _id: new ObjectId(goalId) },
				{ $set: { achievedValue: maxWeight } }
			);
		}
	}
};
