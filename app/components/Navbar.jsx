'use client';

import { usePathname } from 'next/navigation';
import LogInButtons from './LogInButtons';

export default function Navbar() {
	const pathName = usePathname().split('/');

	return (
		<header className='grid grid-cols-3 py-4'>
			<a href='/' className='text-4xl self-start no-app-region'>
				KORJATA
			</a>
			<div className='max-sm:opacity-0 max-sm:w-0 max-sm:h-0 max-sm:overflow-hidden flex gap-4 items-center justify-center no-app-region transition-all text-center'>
				<a href='/' className={pathName[1] == '' ? 'text-primary-one-300' : ''}>
					Início
				</a>

				<a href='/sobre' className={pathName[1] == 'sobre' ? 'text-primary-one-300' : ''}>
					Sobre Nós
				</a>
				<a href='/ultimos-posts' className={pathName[1] == 'ultimos-posts' ? 'text-primary-one-300' : ''}>
					Últimos Posts
				</a>
			</div>
			<LogInButtons />
		</header>
	);
}
