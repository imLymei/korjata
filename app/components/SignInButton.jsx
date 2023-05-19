'use client';

import { signIn } from 'next-auth/react';

function SignInButton({ text }) {
	return (
		<button
			onClick={signIn}
			className='border border-primary-one-300 hover:bg-white/10 hover:scale-105 transition-all duration-300 rounded-lg px-4 py-2 w-fit'>
			{text}
		</button>
	);
}

export default SignInButton;
