import axiosApi from '../axiosApi';
import { ApiTransaction, ApiTransactions, Transaction } from '../types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addTransaction = createAsyncThunk<void, ApiTransaction>(
  'transaction/add',
  async (transactions: ApiTransaction) => {
    await axiosApi.post(`transaction.json`, transactions);
  },
);

export const getTransactions = createAsyncThunk<ApiTransactions, void>(
  'transaction/get',
  async () => {
    const response = await axiosApi.get<ApiTransactions>(`transaction.json`);
    return response.data ?? [];
  },
);

export const deleteTransactions = createAsyncThunk<void, string>(
  'transaction/delete',
  async (id: string) => {
    await axiosApi.delete(`transaction/${id}.json`);
  },
);

export const fetchOneTransaction = createAsyncThunk<ApiTransaction, string>(
  'transaction/fetchOne',
  async (id) => {
    const { data: transaction } = await axiosApi.get<ApiTransaction | null>(
      `/transaction/${id}.json`,
    );

    if (transaction === null) {
      throw new Error('Not found');
    }

    return transaction;
  },
);

export interface UpdateCategoryArg {
  id: string;
  apiTransaction: Transaction;
}

export const updateTransaction = createAsyncThunk<void, UpdateCategoryArg>(
  'transaction/update',
  async ({ id, apiTransaction }) => {
    await axiosApi.put(`/transaction/${id}.json`, apiTransaction);
  },
);
