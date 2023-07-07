'use client';
import { IconLogout, IconLogin } from '@tabler/icons-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
// Redux imports
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from 'Finnaz/utils/store';
import { setUser, clearUser } from 'Finnaz/slices/user/userSlice';

const LoadingButton = () => {
	return (
		<div className="relative mr-8 h-[36px] w-[36px] overflow-hidden rounded-md">
			<div className="ani animate-xMove absolute h-full w-full bg-gradient-to-r from-transparent via-[#ffffff88] to-transparent" />
		</div>
	);
};
type profileLinkProps = {
	name: string | null | undefined;
	id: string;
};

const profileLink = ({ name, id }: profileLinkProps) => {
	return <Link href={`/user/${id}`}> {name ? name : 'Stranger'} </Link>;
};

const NavBar = (): React.JSX.Element => {
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const { email, emailVerified, id, image, name, alreadyLoggedIn, status } = user;
	if (status === 'loading') {
		return (
			<nav className="fixed flex w-full items-center justify-between bg-[#250e4785] leading-none backdrop-blur-[8px]">
				<div className="w-1/5 ">
					<h1 className="ml-8 text-xl">
						<></>
					</h1>
				</div>
				<div className="w-3/5 ">
					<Link href="/">Home</Link>
				</div>
				<div className="flex w-1/5 justify-end ">
					<LoadingButton />
				</div>
			</nav>
		);
	} else if (!alreadyLoggedIn) {
		return (
			<nav className="fixed flex w-full items-center justify-between bg-[#250e4785] leading-none backdrop-blur-[8px]">
				<div className="w-1/5 ">
					<h1 className="ml-8 text-xl">
						<></>
					</h1>
				</div>
				<div className="w-3/5 ">
					<Link href="/">Home</Link>
				</div>
				<div className="flex w-1/5 justify-end ">
					<button
						className="mr-8"
						onClick={() => {
							return void signIn();
						}}
					>
						<div className="flex items-center">
							<div className="mr-2">Sign in</div>
							<IconLogin size="2.25rem" />
						</div>
					</button>
				</div>
			</nav>
		);
	} else {
		return (
			<nav className="fixed flex w-full items-center justify-between bg-[#250e4785] leading-none backdrop-blur-[8px]">
				<div className="w-1/5 ">
					<h1 className="ml-8 text-xl">
						<Link href={`/user/${id}`}> {name} </Link>
					</h1>
				</div>
				<div className="w-3/5 ">
					<Link className="mr-2" href="/">
						Home
					</Link>
					<Link className="mr-2" href="/testing">
						Testing
					</Link>
				</div>
				<div className="flex w-1/5 justify-end ">
					<button className="mr-8" onClick={() => void signOut()}>
						<div className="flex items-center">
							<div className="mr-2">Sign Out</div>
							<IconLogout size="2.25rem" />
						</div>
					</button>
				</div>
			</nav>
		);
	}
};

export default NavBar;
