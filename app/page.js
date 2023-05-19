import Hero from './components/Hero';
import MainSectionOne from './components/MainSectionOne';
import NextProvider from './components/NextProvider';

export default function Home({ session }) {
	return (
		<>
			<main className='flex flex-col gap-32 my-16'>
				<NextProvider session={session}>
					<Hero />
					<MainSectionOne />
				</NextProvider>
			</main>
		</>
	);
}
