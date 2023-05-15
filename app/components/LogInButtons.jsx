'use client';

import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import Image from 'next/image';

export default function LogInButtons() {
	const { data: session, status } = useSession();

	let isLoading = status == 'loading';

	return (
		<div className='flex gap-4 items-center justify-end'>
			{isLoading ? <IsLoading /> : session ? <IsLogged session={session} /> : <NoLogged />}
		</div>
	);
}

function NoLogged() {
	return (
		<>
			<button onClick={signIn}>Entrar</button>
			<a
				href='/'
				className='bg-primary-one-300 hover:bg-primary-one-200 hover:scale-105 transition-all duration-300 rounded-lg px-4 py-2'>
				Cadastre-se
			</a>
		</>
	);
}

function IsLogged({ session }) {
	return (
		<>
			<button onClick={signOut}>Sair</button>
			<a
				href='/user'
				className='flex justify-center items-center gap-2 p-2 rounded-xl hover:bg-primary-one-300/10'>
				<div className='w-6 border border-primary-one-300 rounded-xl overflow-hidden'>
					<Image src={session.user.image} alt='User image' width={1000} height={1000} />
				</div>
				<p>{session.user.name}</p>
			</a>
		</>
	);
}

function IsLoading() {
	return (
		<>
			<div className='w-8 h-8 flex justify-center items-center'>
				<Image src='/loading-dots.gif' alt='User image' width={1000} height={1000} />
			</div>
		</>
	);
}
