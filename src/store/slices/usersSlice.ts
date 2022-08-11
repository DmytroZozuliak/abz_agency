import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUsers, IToken } from '../../interfaces/interfaces';
import { fetchUsers, fetchMoreUsers, getToken } from '../ActionCreators/ActionCreators';

export interface IUsersApi {
  isLoading: boolean;
  error: string | null;
  users: IUser[];
  linkNext: string | null;
  buttonDisable: boolean;
  token: string;
}

const initialState: IUsersApi = {
  isLoading: false,
  error: null,
  users: [],
  linkNext: null,
  buttonDisable: true,
  token: localStorage.getItem('token_ABZ') || '',
};

const usersSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
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
    [getToken.fulfilled.type]: (state, action: PayloadAction<IToken>) => {
      localStorage.setItem('token_ABZ', action.payload.token);
      state.token = action.payload.token;
    },
  },
});

export default usersSlice.reducer;
