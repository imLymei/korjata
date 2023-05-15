import Image from 'next/image';
import { Roboto_Slab } from 'next/font/google';
import SignInButton from './SignInButton';

const robotoSlab = Roboto_Slab({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export default function Hero() {
	return (
		<div className='flex flex-col items-center'>
			<div className='grid grid-cols-5'>
				<div className='py-32 col-span-2 flex flex-col gap-8'>
					<div className={`text-5xl font-semibold ${robotoSlab.className}`}>
						<h1>
							Resolva <span className='text-primary-two-300'>problemas</span>,
						</h1>
						<h1>
							conquiste o <span className='text-primary-one-300'>sucesso</span>.
						</h1>
					</div>
					<p className='text-xl w-3/4'>
						Korjata é uma plataforma de conexão entre programadores freelancers e empresas em busca de
						soluções.
					</p>
					<SignInButton text={'Cadastre-se gratuitamente'} />
				</div>
				<div className='relative col-span-3'>
					<Image
						src='./Work.svg'
						alt='Image vector de um programador'
						fill
						quality={100}
						priority
						className='object-contain'
					/>
				</div>
			</div>
		</div>
	);
}
