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
		},
		removePurchase: (state, action: PayloadAction<Purchase>) => {
			state.purchases = state.purchases.filter(purchase => purchase.id !== action.payload.id);
		}
	}
});

export const { setPurchases, clearPurchases, addPurchase, removePurchase } = purchasesSlice.actions;

export default purchasesSlice.reducer;
