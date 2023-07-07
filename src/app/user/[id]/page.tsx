'use client';
import { type Purchase } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { api } from 'Finnaz/utils/api';

type MainBodyProps = {
	id: string;
};
const MainBody = ({ id }: MainBodyProps) => {
	const { data, isLoading: purchaseLoading } = api.purchase.getPurchaseByUser.useQuery({ userId: id });
	// const constraintsRef = useRef(null);
	const [list, setList] = useState<Purchase[]>([]);
	useEffect(() => {
		setList(data ? [...data] : []);
	}, [data]);
	if (purchaseLoading) {
		return <div className="flex grow">Loading...</div>;
	}
	return <div>This is the user</div>;
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
