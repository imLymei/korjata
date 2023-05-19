'use client';

import { useSession, signOut, getSession } from 'next-auth/react';
import Image from 'next/image';
import IsLoading from '../components/IsLoading';
import WorkInProgress from '../components/WorkInProgress';

export default function User() {
	const { data: session } = useSession({ required: true });

	return <>{session ? <IsLogged session={session} /> : <IsLoading />}</>;
}

function IsLogged({ session }) {
	return (
		<div className='text-center'>
			<h1 className='text-4xl m-4'>Bem vindo {session.user.name}!</h1>
			<div className='translate-y-[40vh]'>
				<div className='-translate-y-1/2 flex flex-col items-center gap-4'>
					<WorkInProgress />
				</div>
				about:blank#blocked
			</div>
		</div>
	);
}
