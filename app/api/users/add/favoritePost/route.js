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

			const id = new ObjectId(body.id);

			if (user.savedPosts.indexOf(id)) {
				user.savedPosts = user.savedPosts.filter((data) => data != id);
				console.log(user.savedPosts.indexOf(id));
			} else {
				user.savedPosts.unshift(id);
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
