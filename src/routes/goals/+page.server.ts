import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { ObjectId } from 'mongodb';

// Hilfsfunktion: Extrahiert die höchste verwendete Kilozahl aus "sets" (z. B. "3x10 mit 80kg")
function extractMaxWeight(sets: string): number | null {
	const match = sets.match(/(\d+)\s*kg/i);
	return match ? parseInt(match[1]) : null;
}

export const load: PageServerLoad = async () => {
	const goals = await db.collection('goals').find().toArray();
	const sessions = await db.collection('sessions').find().toArray();

	const goalsWithProgress = goals.map((goal) => {
		const relevantSessions = sessions.filter(
			(session) => session.exercise.toLowerCase() === goal.targetExercise.toLowerCase()
		);

		// Aus allen passenden Sessions das Maximum der Kilozahl extrahieren
		const maxAchieved = Math.max(
			...relevantSessions
				.map((w) => extractMaxWeight(w.sets))
				.filter((w): w is number => w !== null)
		);

		let progress = 0;
		if (goal.targetValue && maxAchieved) {
			progress = Math.min((maxAchieved / goal.targetValue) * 100, 100);
		}

		return {
			_id: goal._id.toString(),
			title: goal.title,
			description: goal.description,
			targetExercise: goal.targetExercise,
			targetValue: goal.targetValue,
			unit: goal.unit,
			status: goal.status,
			achievedValue: Math.round(progress)
		};
	});

	return {
		goals: goalsWithProgress
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		if (!id || typeof id !== 'string') {
			return { status: 400, body: { message: 'Ungültige Ziel-ID' } };
		}

		await db.collection('goals').deleteOne({ _id: new ObjectId(id) });
		return { success: true };
	}
};
