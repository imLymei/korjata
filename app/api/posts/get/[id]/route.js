import { NextResponse } from 'next/server';

require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET(request, { params }) {
	try {
		client.connect()
		const database = client.db('korjata');
		const posts = database.collection('posts');

		const idArray = params.id.split('-')

		idArray.map((data, index) => {
			idArray[index] = new ObjectId(data)
		})

		const query = { '_id': { '$in': idArray} };
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
