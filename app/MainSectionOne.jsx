import Image from 'next/image';
import { Roboto_Slab } from 'next/font/google';

const robotoSlab = Roboto_Slab({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export default function MainSectionOne() {
	return (
		<div className='bg-primary-one-100 shadow-2xl shadow-primary-one-100 w-full h-96 p-8 grid justify-center gap-2 rounded-3xl'>
			<div>
				<h2 className={`text-4xl ${robotoSlab.className}`}>Encontre diversos programadores pelo brasil</h2>
			</div>
			<div className='relative row-span-2'>
				<Image
					src='./Bull.svg'
					alt='Image vector de um programador'
					fill
					quality={100}
					priority
					className='object-contain'
				/>
			</div>
		</div>
	);
}
