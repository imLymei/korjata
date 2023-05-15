'use client';

import { useSession, signOut, getSession } from 'next-auth/react';

export default function User() {
	const { data: session } = useSession({ required: true });

	return <>{session ? <IsLogged session={session} /> : <NoLogged />}</>;
}

function IsLogged({ session }) {
	return (
		<div>
			<h1>HELOO {session.user.name}</h1>
		</div>
	);
}

function NoLogged() {
	return <h1>no logged</h1>;
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	return {
		props: { session },
	};
}
