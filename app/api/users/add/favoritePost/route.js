import { NextResponse } from 'next/server';

require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI;

export async function PATCH(request) {
	const client = new MongoClient(uri);
	try {
		const database = client.db('korjata');
		const users = database.collection('users');

		const body = await request.json();

		if (body.id && body.email) {
			let user = await users.findOne({ email: body.email });

			if (user.savedPosts.includes(body.id)) {
				user.savedPosts = user.savedPosts.filter((postID) => postID != body.id);
			} else {
				user.savedPosts.unshift(new ObjectId(body.id));
			}

			const apiResponse = await users.updateOne(
				{ email: body.email },
				{ $set: { savedPosts: user.savedPosts } }
			);

			return NextResponse.json({ response: apiResponse });
		} else {
			return NextResponse.json('INVALID DATA');
		}
	} finally {
		await client.close();
	}
}
