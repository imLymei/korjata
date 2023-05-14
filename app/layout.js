import Navbar from './Navbar';
import './globals.css';
import { Roboto } from 'next/font/google';

/*
Colors:
  #f6bd60
  #f7ede2
  #f5cac3
  #84a59d
  #f28482
*/

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700'] });

export const metadata = {
	title: 'Korjata - Resolva problemas, conquiste o sucesso',
	description:
		'Korjata é uma plataforma de conexão entre programadores freelancers e empresas em busca de soluções. Publique seu código e recompense os programadores que o resolverem, ou se aventure pelos projetos e resolva os mais diversos problemas enquanto você ganha recompensas.',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={`bg-black text-white px-2 sm:px-[2vw] lg:px-[19vw] ${roboto.className}`}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
