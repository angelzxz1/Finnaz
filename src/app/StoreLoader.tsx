'use client';
import { setUser, clearUser } from 'Finnaz/slices/user/userSlice';
import { setPurchases } from 'Finnaz/slices/purchases/purchasesSlice';
import type { RootState } from 'Finnaz/utils/store';
import { useSession } from 'next-auth/react';
import type { ReactNode } from 'react';
import { api } from 'Finnaz/utils/api';
import { useSelector, useDispatch } from 'react-redux';

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
					status: status
				})
			);
		} else {
			dispatch(clearUser());
		}
	}

	return <>{children}</>;
};

export default StoreLoader;
