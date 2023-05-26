import './globals.css';
import Navbar from './components/Navbar';
import { Roboto } from 'next/font/google';
import NextProvider from './components/NextProvider';

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700'] });

export const metadata = {
	title: 'Korjata - Resolva problemas, conquiste o sucesso',
	description:
		'Korjata é uma plataforma de conexão entre programadores freelancers e empresas em busca de soluções. Publique seu código e recompense os programadores que o resolverem, ou se aventure pelos projetos e resolva os mais diversos problemas enquanto você ganha recompensas.',
};

export default function RootLayout({ children, session }) {
	return (
		<html lang='en'>
			<body
				className={`min-h-screen bg-gradient-to-bl from-black to-primary-one-300/30 bg-black text-white px-2 sm:px-[4vw] lg:px-[16vw] ${roboto.className}`}>
				<div className='fixed top-0 left-0 h-10 w-screen -z-10 app-region'></div>
				<NextProvider session={session}>
					<Navbar />
					{children}
				</NextProvider>
			</body>
		</html>
	);
}
