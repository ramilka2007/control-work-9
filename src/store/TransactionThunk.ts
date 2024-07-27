import axiosApi from "../axiosApi";
import {ApiTransaction, ApiTransactions} from "../types";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const addTransaction = createAsyncThunk<void, ApiTransaction>(
    'transaction/add',
    async (transactions: ApiTransaction) => {
        await axiosApi.post(`transaction.json`, transactions);
    });

export const getTransactions = createAsyncThunk<ApiTransactions, void>(
    'transaction/get',
    async () => {
        const response =  await axiosApi.get<ApiTransactions>(`transaction.json`);
        return response.data ?? [];
    });

export const deleteTransactions = createAsyncThunk<void, string>(
    'transaction/delete',
    async (id: string) => {
        await axiosApi.delete(`transaction/${id}.json`);
    });