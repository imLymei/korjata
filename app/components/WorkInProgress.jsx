import Image from 'next/image';
import React from 'react';

export default function WorkInProgress() {
	return (
		<>
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
		</>
	);
}
