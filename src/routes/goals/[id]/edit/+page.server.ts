
import { ObjectId } from 'mongodb';
import { db } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	console.log('Lade Ziel mit ID:', params.id);

	try {
		const goal = await db.collection('goals').findOne({ _id: new ObjectId(params.id) });

		if (!goal) {
			return {
				status: 404,
				body: { message: 'Ziel nicht gefunden' }
			};
		}

		// Serialisierbares Ziel zurückgeben
		return {
			goal: {
				_id: goal._id.toString(),
				title: goal.title ?? '',
				description: goal.description ?? '',
				type: goal.type ?? '',
				targetExercise: goal.targetExercise ?? '',
				targetValue: goal.targetValue ?? 0,
				unit: goal.unit ?? '',
				status: goal.status ?? 'active',
				achievedValue: goal.achievedValue ?? 0
			}
		};
	} catch (error) {
		console.error('Fehler beim Laden des Ziels:', error);
		return {
			status: 500,
			body: { message: 'Interner Serverfehler' }
		};
	}
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		try {
			const formData = await request.formData();

			const title = formData.get('title')?.toString() || '';
			const description = formData.get('description')?.toString() || '';
			const type = formData.get('type')?.toString() || '';
			const targetExercise = formData.get('targetExercise')?.toString() || '';
			const targetValueRaw = formData.get('targetValue')?.toString();
			const targetValue = targetValueRaw ? parseFloat(targetValueRaw) : 0;
			const unit = formData.get('unit')?.toString() || '';
			const status = formData.get('status')?.toString() || '';
			const achievedValueRaw = formData.get('achievedValue')?.toString();
			const achievedValue = achievedValueRaw ? parseFloat(achievedValueRaw) : 0;


			await db.collection('goals').updateOne(
				{ _id: new ObjectId(params.id) },
				{
					$set: {
						title,
						description,
						type,
						targetExercise,
						targetValue,
						unit,
						status,
						achievedValue
					}
				}
			);

			console.log('Ziel aktualisiert:', params.id);
			return { success: true };
		} catch (error) {
			console.error('Fehler beim Aktualisieren des Ziels:', error);
			return {
				status: 500,
				body: { message: 'Interner Serverfehler' }
			};
		}
	}
};
