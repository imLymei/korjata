'use client';

import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import SignInButton from './SignInButton';
import IsLoading from './IsLoading';
import { useState } from 'react';

export default function LogInButtons() {
	const { data: session, status } = useSession();
	const [user, setUser] = useState([]);

	let isLoading = (status == 'loading' || user.length == 0) && status != 'unauthenticated';

	async function getUser() {
		// const baseUrl = 'https://korjata.vercel.app/api/users/get/';
		const baseUrl = 'http://localhost:3000/api/users/get/';

		const url = baseUrl + session.user.email;

		const response = await fetch(url);
		const res = await response.json();

		console.log(res.response.length);
		console.log(res);

		if (res.response.length != 0) return res.response;
		else {
			const user = {
				username: session.user.name.replace(/\s+/g, ''),
				email: session.user.email,
				image: session.user.image,
			};

			return addUser(user);
		}
	}

	async function addUser(user) {
		const newUser = JSON.stringify(user);

		const data = {
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
			},
			body: newUser,
		};

		// const url = 'https://korjata.vercel.app/api/users/add';
		const url = 'http://localhost:3000/api/users/add';

		const response = await fetch(url, data);
		const res = await response.json();

		console.log('added user');

		return res.response;
	}

	if (session && user.length == 0) {
		getUser().then((data) => {
			setUser(data[0].username);
			console.log(data);
		});
	}

	return (
		<div className='flex gap-2 items-center justify-end no-app-region'>
			{isLoading ? <IsLoading /> : session ? <IsLogged session={session} user={user} /> : <NoLogged />}
		</div>
	);
}

function NoLogged() {
	return (
		<>
			<SignInButton text='Entrar'></SignInButton>
		</>
	);
}

function IsLogged({ session, user }) {
	return (
		<>
			<button onClick={signOut} className='py-2 px-4 rounded-xl hover:bg-primary-one-300/10'>
				Sair
			</button>
			<a
				href={`/user/${user}`}
				className='flex justify-center items-center gap-2 p-2 rounded-xl hover:bg-primary-one-300/10'>
				<div className='w-6 border border-primary-one-300 rounded-xl overflow-hidden'>
					<Image src={session.user.image} alt='User image' width={1000} height={1000} />
				</div>
				<p className='max-sm:absolute max-sm:w-0 max-sm:h-0 max-sm:overflow-hidden'>{session.user.name}</p>
			</a>
		</>
	);
}
