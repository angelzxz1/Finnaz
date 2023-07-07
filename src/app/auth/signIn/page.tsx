'use client';
import { getProviders, signIn, useSession } from 'next-auth/react';
import Aside from './aside';
import Form from './Form';
// import { type SignInResponse } from 'next-auth/react';
// import { getServerSession } from 'next-auth/next';
import React, { useState, useEffect } from 'react';
// import type { GetServerSidePropsContext } from 'next/types';
// import { authOptions } from 'todoz/server/auth';
// import { fetchData } from 'next-auth/client/_utils';

const listProviders = async () => {
	return {
		providers: await getProviders()
	};
};
export interface provider {
	id: string;
	name: string;
	type: string;
	signinUrl: string;
	callbackUrl: string;
}
type ButtonProps = {
	provider: provider;
	Icon: React.JSX.Element;
};
const Button = ({ provider, Icon }: ButtonProps) => {
	const { id, name } = provider;
	return (
		<button
			className="my-4 flex w-full rounded-lg border border-white p-2 hover:bg-white hover:text-black"
			onClick={() => void signIn(id, { callbackUrl: '/', redirect: true })}
		>
			{Icon} <p className="ml-4 w-full">Continue with {name}</p>
		</button>
	);
};

// type InputProps = {
// 	type: string;
// 	value: string;
// 	setValue: React.Dispatch<React.SetStateAction<string>>;
// 	placeholder: string;
// };
// const Input = ({ type, value, setValue, placeholder }: InputProps): React.JSX.Element => {
// 	return (
// 		<>
// 			<input
// 				type={type}
// 				value={value}
// 				onChange={e => {
// 					setValue(e.target.value);
// 				}}
// 				placeholder={placeholder}
// 				className="mb-4 w-full border-b border-white bg-transparent p-2 focus-visible:outline-none"
// 			/>
// 		</>
// 	);
// };

const LoginPage = () => {
	const [data, setData] = useState<provider[] | undefined>(undefined);
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	return (
		<section className="flex h-screen w-screen items-center justify-center">
			<main className="main-log-reg">
				<Aside />
				<Form />
			</main>
		</section>
	);
};

export default LoginPage;
