import { NextResponse } from 'next/server';

require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request) {
	try {
		client.connect()
		const database = client.db('korjata');
		const users = database.collection('users');

		const body = await request.json();

		if (body.username && body.email) {
			const user = {
				email: body.email,
				username: body.username,
				image: body.image,
			};

			users.insertOne(user, (error, response) => {
				if (error) throw error;
				console.log('user added');
			});

			return NextResponse.json({ response: user });
		} else {
			return NextResponse.json('INVALID DATA');
		}
	} finally {
		await client.close();
	}
}
