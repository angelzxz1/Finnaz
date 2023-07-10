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
				<body
					className={`${inter.className} min-h-screen bg-gradient-to-br from-[#1D0E29] to-black text-white`}
				>
					<NavBar />

					<div className="flex w-full justify-center pt-[37px]">
						<div className="w-full ">{children}</div>
					</div>
				</body>
			</Providers>
		</html>
	);
}
