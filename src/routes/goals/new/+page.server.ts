import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const description = data.get('description')?.toString();
    const type = data.get('type')?.toString();
    const targetExercise = data.get('targetExercise')?.toString();
    const status = data.get('status')?.toString();
    const targetValueRaw = data.get('targetValue')?.toString();
const achievedValueRaw = data.get('achievedValue')?.toString();
const targetValue = targetValueRaw ? parseFloat(targetValueRaw) : null;
const achievedValue = achievedValueRaw ? parseFloat(achievedValueRaw) : null;


    if (!description || !type || !targetExercise || !status) return;

await db.collection('goals').insertOne({
  description,
  type,
  targetExercise,
  status,
  targetValue,
  achievedValue: achievedValue,
  createdAt: new Date()
});


    throw redirect(303, '/goals');
  }
};
