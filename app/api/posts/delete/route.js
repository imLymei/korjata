import { data } from 'autoprefixer';
import { NextResponse } from 'next/server';

require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI;

export async function PUT(request) {
	const client = new MongoClient(uri);
	try {
		const database = client.db('korjata');
		const posts = database.collection('posts');
		const users = database.collection('users');

		const body = await request.json();

		if (body.id && body.email) {
			posts.deleteOne({ _id: new ObjectId(body.id) }, (error, response) => {
				if (error) throw error;
				console.log('post deleted');
			});

			users.updateMany({ savedPosts: body.id }, { $pull: { savedPosts: body.id } });

			return NextResponse.json({ response: 'Post deleted' });
		} else {
			return NextResponse.json('INVALID DATA');
		}
	} finally {
		await client.close();
	}
}
