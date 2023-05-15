'use client';

import Image from 'next/image';
import { Roboto_Slab } from 'next/font/google';
import { useState } from 'react';

const robotoSlab = Roboto_Slab({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export default function MainSectionOne() {
	const [isEnterprise, setIsEnterprise] = useState(true);

	return (
		<div>
			<div className='flex gap-4'>
				<button
					className={`px-4 py-2 ${isEnterprise ? 'bg-primary-one-300' : 'bg-primary-one-200'} rounded-t-xl`}
					onClick={() => setIsEnterprise(true)}>
					Empresa
				</button>
				<button
					className={`px-4 py-2 ${isEnterprise ? 'bg-primary-one-200' : 'bg-primary-one-300'} rounded-t-xl`}
					onClick={() => setIsEnterprise(false)}>
					Programador
				</button>
			</div>
			<div className='bg-primary-one-300 rounded-b-xl rounded-tr-xl'>
				{isEnterprise ? <Enterprise /> : <Programmer />}
			</div>
		</div>
	);
}

function Enterprise() {
	return (
		<div className='sm:p-8 text-center'>
			<h2 className={`text-4xl px-4 py-2 rounded-xl mb-16 ${robotoSlab.className}`}>
				Porque escolher os programadores da Korjata?
			</h2>
			<div className='grid sm:grid-cols-3 gap-8'>
				<div className='bg-black/30 sm:hover:bg-black/25 shadow-inner shadow-black/25 rounded-card'>
					<div className='mb-4'>
						<Image
							src='./Virtual.svg'
							alt='Image vector de um programador'
							width={1000}
							height={1000}
							quality={100}
							priority
							className='object-contain'
						/>
					</div>
					<h3 className={`text-lg my-4 ${robotoSlab.className}`}>Contato direto com os participantes</h3>
					<p>
						Você se conecta diretamente com os programadores antes mesmo de começarem a trabalhar juntos!
						Escolha quem ira ter a change de solucionar o seu problema!
					</p>
				</div>
				<div className='bg-black/30 sm:hover:bg-black/25 shadow-inner shadow-black/25 rounded-card'>
					<div className='mb-4'>
						<Image
							src='./Online.svg'
							alt='Image vector de um programador'
							width={1000}
							height={1000}
							quality={100}
							priority
							className='object-contain'
						/>
					</div>
					<h3 className={`text-lg my-4 ${robotoSlab.className}`}>Competitividade entre programadores</h3>
					<p>
						Depois de escolher os seus finalistas, cada programador disputara para chegar o mais perto
						possível do seu resultado esperado!
					</p>
				</div>
				<div className='bg-black/30 sm:hover:bg-black/25 shadow-inner shadow-black/25 rounded-card'>
					<div className='mb-4'>
						<Image
							src='./Virtual.svg'
							alt='Image vector de um programador'
							width={1000}
							height={1000}
							quality={100}
							priority
							className='object-contain'
						/>
					</div>
					<h3 className={`text-lg my-4 ${robotoSlab.className}`}>Confiamos em você</h3>
					<p>
						Caso nenhum dos programadores cheguem no seu resultado esperado ou desistam do projeto, você
						recebe um reembolso de 100% do pagamento! E não se preocupe, quem desiste de projetos recebe uma
						penalidade.
					</p>
				</div>
			</div>
		</div>
	);
}

function Programmer() {
	return (
		<div className='sm:p-8 text-center'>
			<h2 className={`text-4xl px-4 py-2 rounded-xl mb-16 ${robotoSlab.className}`}>
				Porque trabalhar na Korjata?
			</h2>
			<div className='grid sm:grid-cols-3 gap-8'>
				<div className='bg-black/30 sm:hover:bg-black/25 shadow-inner shadow-black/25 rounded-card'>
					<div className='mb-4'>
						<Image
							src='./Milestone.svg'
							alt='Image vector de um programador'
							width={1000}
							height={1000}
							quality={100}
							priority
							className='object-contain'
						/>
					</div>
					<h3 className={`text-lg my-4 ${robotoSlab.className}`}>Suba na sua carreira</h3>
					<p>
						Você pode utilizar a quantidade de códigos entregues e sua nota geral de programador como métodos
						de mostrar suas habilidades!
					</p>
				</div>
				<div className='bg-black/30 sm:hover:bg-black/25 shadow-inner shadow-black/25 rounded-card'>
					<div className='mb-4'>
						<Image
							src='./Climbing.svg'
							alt='Image vector de um programador'
							width={100}
							height={1000}
							quality={100}
							priority
							className='object-contain'
						/>
					</div>
					<h3 className={`text-lg my-4 ${robotoSlab.className}`}>Aprimore seus conhecimentos</h3>
					<p>Pratique suas habilidades enquanto ganha dinheiro pelo seu tempo e esforço!</p>
				</div>
				<div className='bg-black/30 sm:hover:bg-black/25 shadow-inner shadow-black/25 rounded-card'>
					<div className='mb-4'>
						<Image
							src='./Build.svg'
							alt='Image vector de um programador'
							width={1000}
							height={1000}
							quality={100}
							priority
							className='object-contain'
						/>
					</div>
					<h3 className={`text-lg my-4 ${robotoSlab.className}`}>Encontre oportunidades</h3>
					<p>Crie conexões com outros programadores e empresas! Quem sabe onde seu proximo emprego está.</p>
				</div>
			</div>
		</div>
	);
}
