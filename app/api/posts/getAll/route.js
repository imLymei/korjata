import { NextResponse } from 'next/server';

require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

export async function GET(request, { params }) {
	const client = new MongoClient(uri);
	try {
		const database = client.db('korjata');
		const posts = database.collection('posts');

		const post = await posts.find({}).sort({ _id: -1 }).limit(6);

		let response = [];

		for await (const data of post) {
			response.push(data);
		}

		return NextResponse.json({ response: response });
	} finally {
		await client.close();
	}
}
