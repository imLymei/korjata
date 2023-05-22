'use client';

import IsLoading from '@/app/components/IsLoading';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function User({ params }) {
	const [posts, setPosts] = useState([]);
	const [user, setUser] = useState([0]);
	const [isLoading, setIsLoading] = useState(true);

	async function getPosts() {
		const baseUrl = 'https://korjata.vercel.app/api/posts/getAll/';
		// const baseUrl = 'http://localhost:3000/api/posts/getAll/';

		const url = baseUrl + params.user;

		const response = await fetch(url);
		const res = await response.json();

		return res.response;
	}

	async function getUser() {
		const baseUrl = 'https://korjata.vercel.app/api/users/getByName/';
		// const baseUrl = 'http://localhost:3000/api/users/getByName/';

		const url = baseUrl + params.user;

		const response = await fetch(url);
		const res = await response.json();

		console.log(res.response.length);

		if (res.response.length == 0) return [0];
		else return res.response;
	}

	if (user.length == 0) {
		getUser().then((data) => setUser(data[0]));
	}

	function formatDate(date) {
		const newDate = date.split('-');
		return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
	}

	useEffect(() => {
		getPosts().then((data) => {
			setPosts(data);
		}).finally(setIsLoading(false));
	}, []);

	const UserData = () => (<div className='text-center'>
	<div className='flex justify-center items-center gap-2 p-4'>
		<h1 className='text-4xl m-4'>{params.user}</h1>
		<div className='w-12 border border-primary-one-300 rounded-xl overflow-hidden'>
			<Image
				src={user.image && user.image != '' ? user.image : '/placeholder.png'}
				alt='User image'
				width={1000}
				height={1000}
			/>
		</div>
	</div>
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
</div>)

	const NotFound = ()  => (<div className='flex justify-center items-center mt-[40vh] text-4xl'><h1>Desculpe, este usuário não existe!</h1></div>)

	return (
		<>
			{isLoading ? (
				<div className='flex justify-center mt-[40vh]'>
					<IsLoading />
				</div>
			) : user[0] != 0 ? <UserData /> : <NotFound />
			
			}
		</>
	);
}
