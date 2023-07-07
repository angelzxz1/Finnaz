'use client';
import { useSelector, useDispatch } from 'react-redux';
import { api } from 'Finnaz/utils/api';
import { addPurchase, setPurchases } from 'Finnaz/slices/purchases/purchasesSlice';
import type { RootState } from 'Finnaz/utils/store';
import { setUser, clearUser } from 'Finnaz/slices/user/userSlice';
import { store } from 'Finnaz/utils/store';
import { Provider } from 'react-redux';

type AddPurchaseProps = {
	userId: string;
};
const AddPurchase = ({ userId }: AddPurchaseProps) => {
	const dispatch = useDispatch();
	const {
		mutate,
		isLoading: isPosting,
		isSuccess
	} = api.purchase.addPurchase.useMutation({
		onSuccess: data => {
			dispatch(addPurchase(data));
			console.log(data);
		},
		onError: error => {
			console.log(error);
		}
	});

	return (
		<div>
			<button
				onClick={() =>
					mutate({
						userId: userId,
						amount: BigInt(25000),
						date: new Date(),
						day: 'Viernes',
						month: 'Julio',
						year: '2023',
						descripcion: 'Esto es una prueba',
						subcripcion: false
					})
				}
				className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
			>
				Add Purchase
			</button>
			<p>{isPosting.toString()}</p>
			<p>{isSuccess.toString()}</p>
		</div>
	);
};

const PurchaseList = ({ userId }: AddPurchaseProps) => {
	const dispatch = useDispatch();
	const { data: purchaseData, status: purchaseStatus } = api.purchase.getPurchaseByUser.useQuery({
		userId: userId
	});
	// dispatch(setPurchases(purchaseData ? purchaseData : []));
	const { purchases: purchaseList } = useSelector((state: RootState) => state.purchases);

	if (purchaseStatus === 'loading') {
		return <div>Loading...</div>;
	}
	if (purchaseStatus === 'error') return <div>Error</div>;
	return (
		<div>
			{purchaseList.map(purchase => (
				<div key={purchase.id} className="rounded-xl border p-2">
					<p>{purchase.amount.toString()}</p>
					<p>{purchase.date.toString()}</p>
					<p>{purchase.day}</p>
					<p>{purchase.descripcion}</p>
					<p>{purchase.month}</p>
					<p>{purchase.year}</p>
					<p>{purchase.subcripcion}</p>
				</div>
			))}
		</div>
	);
};

const Page = () => {
	const user = useSelector((state: RootState) => state.user);
	const purchases = useSelector((state: RootState) => state.purchases);
	const { purchases: purchaseList } = purchases;
	const dispatch = useDispatch();
	console.log(user);
	if (user.alreadyLoggedIn) {
		// console.log('already logged in');
		//
	}

	const { email, emailVerified, id, image, name, alreadyLoggedIn } = user;

	return (
		<div className="flex h-full w-full flex-col gap-4">
			<div>
				<h1>Testing</h1>
				<p>{email}</p>
				<p>{emailVerified?.toString()}</p>
				<p>ID:{id}</p>
				<p>{image}</p>
				<p>{name}</p>
				<p>{alreadyLoggedIn}</p>
				{/* <p>{purchaseStatus}</p> */}
				<PurchaseList userId={id} />
			</div>

			<AddPurchase userId={id} />
		</div>
	);
};

export default Page;