import { createSlice } from '@reduxjs/toolkit';
import {
  deleteCategoryById,
  fetchCategories,
  fetchOneCategory,
  getCategoriesType,
} from './categoryThunk';
import { ApiCategories, ApiCategory, Category } from '../types';

interface CategoryState {
  categories: Category[];
  oneCategory: null | ApiCategory;
  deleteLoading: false | string;
}

const initialState: CategoryState = {
  categories: [],
  oneCategory: null,
  deleteLoading: false,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCategories.fulfilled,
      (state: CategoryState, { payload: action }) => {
        state.categories = action;
      },
    );

    builder
      .addCase(fetchOneCategory.pending, (state: CategoryState) => {
        state.oneCategory = null;
      })
      .addCase(
        fetchOneCategory.fulfilled,
        (state: CategoryState, { payload: apiCategory }) => {
          state.oneCategory = apiCategory;
        },
      );

    builder.addCase(
      getCategoriesType.fulfilled,
      (state: CategoryState, { payload: categoriesType }) => {
        const categoriesObject: ApiCategories = categoriesType;
        const categoriesArray: Category[] = [];

        if (categoriesObject) {
          for (const [key, value] of Object.entries(categoriesObject)) {
            categoriesArray.push({
              id: key,
              name: value.name,
              type: value.type,
            });
          }
        }

        state.categories = categoriesArray;
      },
    );

    builder.addCase(
      deleteCategoryById.pending,
      (state: CategoryState, { meta: { arg: categoryId } }) => {
        state.deleteLoading = categoryId;
      },
    );
  },
  selectors: {
    selectCategories: (state) => state.categories,
    selectOneCategory: (state) => state.oneCategory,
  },
});

export const categoriesReducer = categorySlice.reducer;

export const { selectCategories, selectOneCategory } = categorySlice.selectors;
