import { NextResponse } from 'next/server';

require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

export async function POST(request) {
	const client = new MongoClient(uri);
	try {
		const database = client.db('korjata');
		const posts = database.collection('posts');

		const body = await request.json();

		if (body.owner && body.data.title && body.data.code && body.data.bounty && body.data.dateLimit) {
			const post = {
				owner: body.owner,
				data: {
					title: body.data.title,
					description: body.data.description,
					code: body.data.code,
					bounty: body.data.bounty,
					dateLimit: body.data.dateLimit,
				},
			};

			posts.insertOne(post, (error, response) => {
				if (error) throw error;
				console.log('post added');
			});

			return NextResponse.json({ response: post });
		} else {
			return NextResponse.json('INVALID DATA');
		}
	} finally {
		await client.close();
	}
}
