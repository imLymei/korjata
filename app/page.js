import Hero from './components/Hero';
import MainSectionOne from './components/MainSectionOne';

export default function Home() {
	return (
		<>
			<main className='flex flex-col gap-32 my-16'>
				<Hero />
				<MainSectionOne />
			</main>
		</>
	);
}
