import { createSlice } from '@reduxjs/toolkit';
import { ApiTransaction, ApiTransactions, Transaction } from '../types';
import {
  addTransaction,
  fetchOneTransaction,
  getTransactions,
} from './TransactionThunk';

interface TransactionState {
  transactions: Transaction[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  oneTransaction: null | ApiTransaction;
}

const initialState: TransactionState = {
  transactions: [],
  total: 0,
  isLoading: false,
  isError: false,
  oneTransaction: null,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(addTransaction.pending, (state: TransactionState) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(addTransaction.fulfilled, (state: TransactionState) => {
      state.isLoading = false;
    });
    builder.addCase(addTransaction.rejected, (state: TransactionState) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(
      getTransactions.fulfilled,
      (state: TransactionState, { payload: transactions }) => {
        const transactionObject: ApiTransactions = transactions;
        const transactionArray: Transaction[] = [];
        state.total = 0;

        if (transactionObject) {
          for (const [key, value] of Object.entries(transactionObject)) {
            if (value.type === 'income') {
              state.total += +value.transactionSum;
            } else {
              state.total -= +value.transactionSum;
            }

            transactionArray.push({
              id: key,
              name: value.name,
              transactionSum: value.transactionSum,
              type: value.type,
              category: value.category,
              date: value.date,
            });
          }
        }

        state.isLoading = false;
        state.transactions = transactionArray.reverse();
      },
    );

    builder.addCase(
      fetchOneTransaction.fulfilled,
      (state: TransactionState, { payload: transaction }) => {
        state.oneTransaction = transaction;
      },
    );
  },
  selectors: {
    selectOneTransaction: (state) => state.oneTransaction,
  },
});

export const transactionReducer = transactionSlice.reducer;

export const { selectOneTransaction } = transactionSlice.selectors;
