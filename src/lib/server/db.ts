import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';

const client = new MongoClient(env.MONGODB_URI);
await client.connect(); // 👉 Verbindung herstellen!

export const db = client.db('trackmystrength');
