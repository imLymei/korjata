import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';

require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

export async function GET(request, { params }) {
	const client = new MongoClient(uri);

	console.log(params);

	try {
		const database = client.db('korjata');
		const posts = database.collection('posts');

		const query = { owner: params.user };
		const post = await posts.find(query);

		let response = [];

		for await (const data of post) {
			response.push(data);
		}

		return NextResponse.json({ response: response });
	} finally {
		await client.close();
	}
}
