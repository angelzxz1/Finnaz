import Providers from './Providers';
import { type ReactNode } from 'react';
import { Inter } from 'next/font/google';
import NavBar from './NavBar';
import 'Finnaz/styles/globals.css';
export const metadata = {
	title: 'Finnaz',
	description: 'A finnacial app for the masses'
};

const inter = Inter({ subsets: ['latin'] });

interface Props {
	children: ReactNode;
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<Providers>
				<body className={`${inter.className} bg-gradient-to-br from-[#292929] to-black text-white`}>
					<NavBar />
					<div className="flex h-screen w-full items-center justify-center pt-[2.25rem]">{children}</div>
				</body>
			</Providers>
		</html>
	);
}
