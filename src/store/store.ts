import { combineReducers, configureStore } from '@reduxjs/toolkit';
import apiSlice from './slices/apiSlice';

const rootReducer = combineReducers({
  apiSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
