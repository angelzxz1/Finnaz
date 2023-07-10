'use client';
import React, { useEffect, useState } from 'react';

import { getProviders, signIn, useSession } from 'next-auth/react';
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';

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
	id:string,
	name:string
	Icon: React.JSX.Element;
};
const Button = ({ id, name, Icon }: ButtonProps) => {
	const { id, name } = provider;
	return (
		<button
			className="relative w-full rounded-md bg-white p-2 text-[#A1A1A1] hover:bg-[#f5f5f5]"
			onClick={() => void signIn(id, { callbackUrl: '/', redirect: true })}
		>
			{Icon} <p className="ml-4 w-full">Continue with {name}</p>
		</button>
	);
};

type InputProps = {
	label: string;
	type: string;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
};
const Input = ({ label, type, value, setValue }: InputProps) => {
	return (
		<>
			<label htmlFor={label} className="mt-4 text-[#535353]">
				{label}
			</label>
			<input
				type={type}
				className="w-full rounded-md p-2 text-black"
				value={value}
				onChange={e => {
					e.preventDefault();
					setValue(e.target.value);
				}}
				id={label}
				name={label}
				aria-label={label}
			/>
		</>
	);
};

const Form = () => {
	const [[password, setPassword], [email, setEmail]] = [useState<string>(''), useState<string>('')];
	const [providers, setProviders] = useState<provider[]>([]);
	useEffect(() => {
		listProviders()
			.then(data => {
				setProviders(Object.values(data.providers ? data.providers : {}));
			})
			.catch(e => {
				console.log(e);
			});
	}, []);

	return (
		<form action="" className="form-log-reg">
			<div className="flex h-[87%] w-4/5 flex-col ">
				<h1 className="form-log-reg-h1 font-semibold">Welcome</h1>
				<div className="form-log-reg-message ">
					Say goodbye to overspending and hello to financial freedom. Join Finnas and start tracking your
					expenses with ease
				</div>
				<Input type="email" label="email" setValue={setEmail} value={email} />
				<Input type="password" label="password" setValue={setPassword} value={password} />
				<a href="/#" className="my-4 flex justify-end text-[#8B72A3]">
					Forgot password?
				</a>
				<button className="form-submit-button">Login</button>
				<span className="my-8 flex w-full justify-center text-sm text-[#7B7979]">or</span>
				<Button
					id={'github'}
					name={"GitHub"}
					Icon={<IconBrandGoogle className="absolute left-2 top-2" />}
					key={'github'}
				/>
				<div className="form-signin-login-box">
					You don’t have an account yet?
					<a href="/register" className="redirect-link">
						Sign up
					</a>
				</div>
				<div className="form-terms-of-service">
					<div className="w-4/5 text-center">
						by creating and account you agree to our
						<a href="#" className="redirect-link">
							Terms of Service
						</a>
					</div>
				</div>
			</div>
		</form>
	);
};

export default Form;
