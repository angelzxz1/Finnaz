import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type User } from '@prisma/client';

export interface UsersState {
	id: string;
	name: string;
	email: string;
	emailVerified: Date | null;
	image: string;
	alreadyLoggedIn?: boolean;
	status: 'authenticated' | 'loading' | 'unauthenticated';
}
const initialState: UsersState = {
	id: '',
	name: '',
	email: '',
	emailVerified: null,
	image: '',
	alreadyLoggedIn: false,
	status: 'loading'
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UsersState>) => {
			state.id = action.payload.id;
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.emailVerified = action.payload.emailVerified;
			state.image = action.payload.image;
			state.alreadyLoggedIn = true;
			state.status = 'authenticated';
		},
		clearUser: state => {
			state.id = '';
			state.name = '';
			state.email = '';
			state.emailVerified = null;
			state.image = '';
			state.alreadyLoggedIn = false;
			state.status = 'unauthenticated';
		}
	}
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
