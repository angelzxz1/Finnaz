import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type Purchase } from '@prisma/client';

export interface PurchasesState {
	purchases: Purchase[];
}

const initialState: PurchasesState = {
	purchases: []
};

export const purchasesSlice = createSlice({
	name: 'purchases',
	initialState,
	reducers: {
		setPurchases: (state, action: PayloadAction<Purchase[]>) => {
			state.purchases = action.payload;
		},
		clearPurchases: state => {
			state.purchases = [];
		},
		addPurchase: (state, action: PayloadAction<Purchase>) => {
			state.purchases.push(action.payload);
		}
	}
});

export const { setPurchases, clearPurchases, addPurchase } = purchasesSlice.actions;

export default purchasesSlice.reducer;
