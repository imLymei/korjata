'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import IsLoading from '../components/IsLoading';

export default function User() {
	const { data: session } = useSession({ required: true });
	const [posts, setPosts] = useState([]);

	async function getPosts() {
		const data = {
			method: 'GET',
			header: {
				'Content-Type': 'application/json',
			},
		};

		const response = await fetch('https://korjata.vercel.app/api/posts/getAll');
		const res = await response.json();

		return res.response;
	}

	function formatDate(date) {
		const newDate = date.split('-');
		return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
	}

	getPosts().then((data) => setPosts(data));

	return (
		<>
			{session ? (
				<div className='text-center'>
					<h1 className='text-4xl m-4'>Bem vindo {session.user.name}!</h1>
					<div className='grid grid-cols-3 items-center gap-4'>
						{posts.map((post, index) => {
							return (
								<div
									className='flex flex-col justify-between text-white border border-primary-one-300 rounded-lg p-4 h-72 gap-2'
									key={index}>
									<h2 className='text-2xl font-semibold'>{post.data.title}</h2>
									<h3>{post.data.description}</h3>
									<h3>{post.data.code}</h3>
									<h3>{post.data.bounty}</h3>
									<h3>{formatDate(post.data.dateLimit)}</h3>
								</div>
							);
						})}
					</div>
				</div>
			) : (
				<IsLoading />
			)}
		</>
	);
}
