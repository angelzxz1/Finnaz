'use client';
import { setUser, clearUser, setLimit, setBalance } from 'Finnaz/slices/user/userSlice';
import { setPurchases } from 'Finnaz/slices/purchases/purchasesSlice';
import type { RootState } from 'Finnaz/utils/store';
import { useSession } from 'next-auth/react';
import type { ReactNode } from 'react';
import { api } from 'Finnaz/utils/api';
import { useSelector, useDispatch } from 'react-redux';

const InfoLoader = ({ userId, children }: { userId: string; children: ReactNode }) => {
	const dispatch = useDispatch();
	const { data: userInfo, isSuccess } = api.users.getUser.useQuery({ id: userId });
	console.log(userInfo);
	console.log(isSuccess);
	if (isSuccess && userInfo) {
		const { monthlyLimit, monthlySpent } = userInfo;
		console.log(monthlyLimit, monthlySpent);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		dispatch(setLimit(monthlyLimit ? monthlyLimit : 0));
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		dispatch(setBalance(monthlySpent ? monthlySpent : 0));
	}
	return <>{children}</>;
};

const StoreLoader = ({ children }: { children: ReactNode }) => {
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const { data: sessionData, status } = useSession();

	if (user.alreadyLoggedIn) {
		console.log('already logged in');
	} else {
		if (status === 'authenticated' && sessionData) {
			const { user } = sessionData;
			dispatch(
				setUser({
					name: user.name ? user.name : '',
					id: user.id,
					email: user.email ? user.email : '',
					image: user.image ? user.image : '',
					alreadyLoggedIn: true,
					emailVerified: null,
					status: status,
					monthlyLimit: 0,
					monthlySpent: 0
				})
			);
		} else {
			dispatch(clearUser());
		}
	}

	return <InfoLoader userId={user.id}>{children}</InfoLoader>;
};

export default StoreLoader;
