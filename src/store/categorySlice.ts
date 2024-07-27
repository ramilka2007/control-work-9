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
  fetchLoading: boolean;
  deleteLoading: false | string;
  createLoading: boolean;
  updateLoading: boolean;
  gettingTypeLoading: boolean;
  fetchOneLoading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  oneCategory: null,
  fetchLoading: false,
  deleteLoading: false,
  createLoading: false,
  updateLoading: false,
  gettingTypeLoading: false,
  fetchOneLoading: false,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state: CategoryState) => {
        state.fetchLoading = true;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state: CategoryState, { payload: action }) => {
          state.categories = action;
          state.fetchLoading = false;
        },
      )
      .addCase(fetchCategories.rejected, (state: CategoryState) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(fetchOneCategory.pending, (state: CategoryState) => {
        state.fetchOneLoading = true;
        state.oneCategory = null;
      })
      .addCase(
        fetchOneCategory.fulfilled,
        (state: CategoryState, { payload: apiCategory }) => {
          state.oneCategory = apiCategory;
          state.fetchOneLoading = false;
        },
      )
      .addCase(fetchOneCategory.rejected, (state: CategoryState) => {
        state.fetchOneLoading = false;
      });

    builder
      .addCase(getCategoriesType.pending, (state: CategoryState) => {
        state.gettingTypeLoading = true;
      })
      .addCase(
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
          state.gettingTypeLoading = false;
        },
      );

    builder
      .addCase(
        deleteCategoryById.pending,
        (state: CategoryState, { meta: { arg: categoryId } }) => {
          state.deleteLoading = categoryId;
        },
      )
      .addCase(deleteCategoryById.fulfilled, (state: CategoryState) => {
        state.deleteLoading = false;
      })
      .addCase(deleteCategoryById.rejected, (state: CategoryState) => {
        state.deleteLoading = false;
      });
  },
  selectors: {
    selectCategories: (state) => state.categories,
    selectOneCategory: (state) => state.oneCategory,
    selectFetchCategoriesLoading: (state) => state.fetchLoading,
    selectDeleteCategoryLoading: (state) => state.deleteLoading,
    selectCreateCategoryLoading: (state) => state.createLoading,
    selectFetchOneCategoryLoading: (state) => state.fetchOneLoading,
    selectUpdateCategoryLoading: (state) => state.updateLoading,
  },
});

export const categoriesReducer = categorySlice.reducer;

export const {
  selectCategories,
  selectOneCategory,
  selectDeleteCategoryLoading,
  selectFetchCategoriesLoading,
  selectUpdateCategoryLoading,
  selectCreateCategoryLoading,
  selectFetchOneCategoryLoading,
} = categorySlice.selectors;
