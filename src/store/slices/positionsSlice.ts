import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPosition, IPositions } from '../../interfaces/interfaces';
import { fetchPositions } from '../ActionCreators/ActionCreators';

export interface IPositionsApi {
  positions: IPosition[];
  isLoadingPositions: boolean;
  errorPositions: string | null;
}

const initialState: IPositionsApi = {
  positions: [],
  isLoadingPositions: false,
  errorPositions: null,
};

const positionsSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPositions.fulfilled.type]: (state, action: PayloadAction<IPositions>) => {
      state.positions = action.payload.positions;
      state.isLoadingPositions = false;
      state.errorPositions = null;
    },
    [fetchPositions.pending.type]: (state) => {
      state.isLoadingPositions = true;
    },
    [fetchPositions.rejected.type]: (state, action: PayloadAction<string>) => {
      state.errorPositions = action.payload;
      state.isLoadingPositions = false;
    },
  },
});

export default positionsSlice.reducer;
