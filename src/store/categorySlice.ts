import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories, fetchOneCategory} from "./categoryThunk";
import {ApiCategory, Category} from "../types";

interface CategoryState {
    categories: Category[];
    oneCategory: null | ApiCategory;
}

const initialState: CategoryState = {
    categories: [],
    oneCategory: null,
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state: CategoryState, {payload: action}) => {
            state.categories = action;
        });

        builder
            .addCase(fetchOneCategory.pending, (state: CategoryState) => {
                state.oneCategory = null;
            })
            .addCase(fetchOneCategory.fulfilled, (state: CategoryState, { payload: apiCategory }) => {
                state.oneCategory = apiCategory;
            })
    },
    selectors: {
        selectCategories: (state) => state.categories,
        selectOneCategory: (state) => state.oneCategory,
    },
});

export const categoriesReducer = categorySlice.reducer;

export const {
    selectOneCategory,
} = categorySlice.selectors;