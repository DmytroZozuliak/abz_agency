import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers, fetchMoreUsers, IUser, IUsers } from '../ActionCreators/ActionCreators';

export interface IApiPage {
  isLoading: boolean;
  error: string | null;
  users: IUser[];
  linkNext: string | null;
  buttonDisable: boolean;
}

const initialState: IApiPage = {
  isLoading: false,
  error: null,
  users: [],
  linkNext: null,
  buttonDisable: true,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    apiChangeSearch(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUsers>) => {
      const nextLinkUsers = action.payload.links.next_url;
      state.users = action.payload.users;
      state.linkNext = nextLinkUsers;
      state.isLoading = false;
      state.error = null;
      if (nextLinkUsers) {
        state.buttonDisable = false;
      } else {
        state.buttonDisable = true;
      }
    },
    [fetchUsers.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.buttonDisable = true;
    },
    [fetchMoreUsers.fulfilled.type]: (state, action: PayloadAction<IUsers>) => {
      const nextLinkUsers = action.payload.links.next_url;
      state.users = state.users.concat(action.payload.users);
      state.linkNext = nextLinkUsers;
      state.isLoading = false;
      state.error = null;
      if (nextLinkUsers) {
        state.buttonDisable = false;
      } else {
        state.buttonDisable = true;
      }
    },
    [fetchMoreUsers.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchMoreUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.buttonDisable = true;
    },
  },
});

export const { apiChangeSearch } = apiSlice.actions;

export default apiSlice.reducer;
