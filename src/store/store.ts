import { combineReducers, configureStore } from '@reduxjs/toolkit';
import formSlice from './reducers/formSlice';

const rootReducer = combineReducers({
  formSlice: formSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
