'use client';

import { useEffect, useState } from 'react';
import WorkInProgress from '../components/WorkInProgress';
import { HiOutlineTrash } from 'react-icons/hi';
import { GiHeartburn } from 'react-icons/gi';
import { useSession } from 'next-auth/react';
import IsLoading from '../components/IsLoading';

export default function Home() {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const { data: session, status } = useSession();

	async function getPosts() {
		const url = 'https://korjata.vercel.app/api/posts/getAll';
		// const url = 'http://localhost:3000/api/posts/getAll';

		const response = await fetch(url);
		const res = await response.json();

		return res.response;
	}

	async function handleFavorites(post) {
		const body = JSON.stringify({
			email: session.user.email,
			id: post._id,
		});

		const data = {
			method: 'PATCH',
			header: {
				'Content-Type': 'application/json',
			},
			body: body,
		};

		const url = 'https://korjata.vercel.app/api/users/add/favoritePost';
		// const url = 'http://localhost:3000/api/users/add/favoritePost';

		const response = await fetch(url, data);
		const res = await response.json();

		console.log('added favorite post');

		return res;
	}

	function formatDate(date) {
		const newDate = date.split('-');
		return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
	}

	useEffect(() => {
		getPosts()
			.then((data) => setPosts(data))
			.finally(setIsLoading(false));
	}, []);

	return (
		<>
			<main className='flex flex-col justify-center items-center'>
				{isLoading ? (
					<IsLoading />
				) : (
					<div
						className={`${
							posts.length != 0 ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3' : 'flex'
						} justify-center items-center w-full gap-4`}>
						{posts.length != 0 ? (
							<>
								{posts.map((post, index) => {
									return (
										<div
											className='relative flex flex-col items-center justify-between bg-black/30 text-white border border-primary-one-300 rounded-lg p-4 h-72 gap-2'
											key={index}>
											{status == 'authenticated' && (
												<button
													onClick={() => handleFavorites(post)}
													className='absolute top-4 right-4 origin-center transition hover:scale-105 hover:text-primary-one-300'>
													<GiHeartburn size={20} />
												</button>
											)}
											<h2 className='text-2xl font-semibold'>{post.data.title}</h2>
											<h3>{post.data.description}</h3>
											<h3>{post.data.code}</h3>
											<h3>{post.data.bounty}</h3>
											<h3>{formatDate(post.data.dateLimit)}</h3>
											<h4>
												by <a href={`/user/${post.owner}`}>{post.owner}</a>
											</h4>
										</div>
									);
								})}
							</>
						) : (
							<h3 className='text-center w-full'>Nenhum Post ainda. :(</h3>
						)}
					</div>
				)}
			</main>
		</>
	);
}
