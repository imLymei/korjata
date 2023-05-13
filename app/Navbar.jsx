'use client';

import { usePathname } from 'next/navigation';

export default function Navbar() {
	const pathName = usePathname().split('/');

	return (
		<header className='flex justify-between items-center py-4'>
			<a href='/' className='text-4xl'>
				Korjata
			</a>
			<div className='flex gap-4 items-center'>
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
			<div className='flex gap-4 items-center'>
				<a href='/'>Entrar</a>
				<a
					href='/'
					className='bg-primary-one-300 hover:bg-primary-one-200 hover:scale-105 transition-all duration-300 rounded-lg px-4 py-2'>
					Cadastre-se
				</a>
			</div>
		</header>
	);
}
