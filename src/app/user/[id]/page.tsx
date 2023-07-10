'use client';
import { type Purchase } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { api } from 'Finnaz/utils/api';
import { useSelector } from 'react-redux';
import { RootState } from 'Finnaz/utils/store';
import Overview from './overview';

type MainBodyProps = {
	id: string;
};
const MainBody = ({ id }: MainBodyProps) => {
	// const user = useSelector((state: RootState) => state.user);
	// const { purchases } = useSelector((state: RootState) => state.purchases);
	// useEffect(() => {
	// 	console.log(purchases);
	// }, [user, purchases]);
	// return (
	// 	<div>
	// 		{purchases.map(purchase => (
	// 			<div key={purchase.id}>{purchase.id}</div>
	// 		))}
	// 	</div>
	// );
	return (
		<main className="w-full">
			<Overview />
		</main>
	);
};

const Page = ({ params }: { params: { id: string } }) => {
	const { data: sessionData, status } = useSession();
	const router = useRouter();
	if (status === 'loading') {
		return <></>;
	} else if (status === 'unauthenticated') {
		return router.push('/auth/signIn');
	} else {
		return <MainBody id={params.id} />;
	}
};
export default Page;
