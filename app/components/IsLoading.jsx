import Image from 'next/image';

export default function IsLoading() {
	return (
		<>
			<div className='w-8 flex justify-center items-center object-contain'>
				<Image src='/loading-dots.gif' alt='User image' width={1000} height={1000} />
			</div>
		</>
	);
}
