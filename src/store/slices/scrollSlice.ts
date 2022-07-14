import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchUsers,
  fetchMoreUsers,
  IUser,
  IUsers,
  fetchPositions,
  IPosition,
  IPositions,
} from '../ActionCreators/ActionCreators';

export interface IElements {
  getRequestElem: HTMLDivElement | null;
  // postRequestElem: React.RefObject<HTMLElement>;
}

const initialState: IElements = {
  getRequestElem: null,
  // postRequestElem: null,
};

const scrollElements = createSlice({
  name: 'scrollElements',
  initialState,
  reducers: {
    scrollToGetRequest(state, action: PayloadAction<string>) {
      const div = document.createElement('div');
      // state.getRequestElem = div;
      // state.getRequestElem = action.payload;
      // state.getRequestElem = action.payload;
    },
  },
});

export const { scrollToGetRequest } = scrollElements.actions;

export default scrollElements.reducer;
