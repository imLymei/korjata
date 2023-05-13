import Hero from './Hero';
import MainSectionOne from './MainSectionOne';

export default function Home() {
	return (
		<>
			<main className='flex flex-col gap-32 mt-16'>
				<Hero />
				<MainSectionOne />
			</main>
		</>
	);
}
