'use client';

import { useSession, signOut, getSession } from 'next-auth/react';
import Image from 'next/image';
import IsLoading from '../components/IsLoading';

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
					<div className='w-60 h-60 relative max-sm:w-[50vw] max-sm:h-[50vw] max-sm:mx-auto col-span-3'>
						<Image
							src='./Connection.svg'
							alt='Image vector de um programador'
							fill
							quality={100}
							priority
							className='object-contain'
						/>
					</div>
					<h2 className='text-xl'>Desculpe, mas essa página ainda está sendo feita...</h2>
				</div>
			</div>
		</div>
	);
}
