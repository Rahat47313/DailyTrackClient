import { RootState } from '../store';

export const selectUsers = (state: RootState) => state.users.users;
export const selectUsersLoading = (state: RootState) => state.users.isLoading;
export const selectUsersError = (state: RootState) => state.users.error;