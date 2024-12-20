import { RootState } from '../store';

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCurrentCategory = (state: RootState) => state.categories.currentCategory;
export const selectCategoriesLoading = (state: RootState) => state.categories.isLoading;
export const selectCategoriesError = (state: RootState) => state.categories.error;