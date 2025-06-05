import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

const client = new MongoClient(MONGODB_URI);
await client.connect(); // 👉 Verbindung herstellen!

export const db = client.db('trackmystrength');
