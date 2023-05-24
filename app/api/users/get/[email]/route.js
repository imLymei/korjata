import { NextResponse } from 'next/server';

require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

export async function GET(request, { params }) {
	try {
		const client = new MongoClient(uri);
		const database = client.db('korjata');
		const users = database.collection('users');

		const query = { email: params.email };
		const user = await users.find(query);

		let response = [];

		for await (const data of user) {
			response.push(data);
		}

		return NextResponse.json({ response: response });
	} finally {
		await client.close();
	}
}
