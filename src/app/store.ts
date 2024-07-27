import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from '../store/categorySlice';
import { transactionReducer } from '../store/TransactionSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    transactions: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
