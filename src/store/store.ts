import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/usersSlice';
import snackSlice from './slices/snackSlice';
import positionsSlice from './slices/positionsSlice';

const rootReducer = combineReducers({
  users: userSlice,
  positions: positionsSlice,
  snack: snackSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
