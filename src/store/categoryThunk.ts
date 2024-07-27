import { ApiCategories, ApiCategory, Category } from '../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { AppDispatch } from '../app/store';

export const addCategory = createAsyncThunk<void, ApiCategory>(
  'categories/add-category',
  async (category) => {
    await axiosApi.post(`/categories.json`, category);
  },
);

export const fetchCategories = createAsyncThunk<
  Category[],
  undefined,
  { dispatch: AppDispatch }
>('categories/get-categories', async () => {
  const { data: allCategories } = await axiosApi.get<ApiCategories | null>(
    '/categories.json',
  );

  let newCategories: Category[] = [];

  if (allCategories) {
    newCategories = Object.keys(allCategories).map((key: string) => {
      const category = allCategories[key];
      return {
        id: key,
        ...category,
      };
    });
  }

  return newCategories;
});

export const fetchOneCategory = createAsyncThunk<ApiCategory, string>(
  'categories/fetchOne',
  async (id) => {
    const { data: category } = await axiosApi.get<ApiCategory | null>(
      `/categories/${id}.json`,
    );

    if (category === null) {
      throw new Error('Not found');
    }

    return category;
  },
);

export interface UpdateCategoryArg {
  id: string;
  apiCategory: Category;
}

export const updateCategory = createAsyncThunk<void, UpdateCategoryArg>(
  'categories/update',
  async ({ id, apiCategory }) => {
    await axiosApi.put(`/categories/${id}.json`, apiCategory);
  },
);

export const getCategoriesType = createAsyncThunk<ApiCategories, string>(
  'categories/getByType',
  async (type: string) => {
    const { data: response } = await axiosApi.get(
      `/categories.json?orderBy="type"&equalTo="${type}"`,
    );
    return response;
  },
);

export const deleteCategoryById = createAsyncThunk<void, string>(
  'category/delete',
  async (categoryId: string) => {
    await axiosApi.delete(`/categories/${categoryId}.json`);
  },
);
