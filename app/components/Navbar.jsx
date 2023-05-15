'use client';

import { usePathname } from 'next/navigation';
import LogInButtons from './LogInButtons';

export default function Navbar() {
	const pathName = usePathname().split('/');

	return (
		<header className='grid grid-cols-3 py-4'>
			<a href='/' className='text-4xl self-start'>
				KORJATA
			</a>
			<div className='max-sm:opacity-0 max-sm:absolute flex gap-4 items-center justify-center'>
				<a href='/' className={pathName[1] == '' ? 'text-primary-one-300' : ''}>
					Início
				</a>
				<a href='/sobre' className={pathName[1] == 'sobre' ? 'text-primary-one-300' : ''}>
					Sobre Nós
				</a>
				<a href='/comecar' className={pathName[1] == 'comecar' ? 'text-primary-one-300' : ''}>
					Como Começar
				</a>
			</div>
			<LogInButtons />
		</header>
	);
}
