import { createAsyncThunk } from '@reduxjs/toolkit';
// import { AxiosError } from 'axios';

interface IQueries {
  value: string;
  limit: number;
  page: number;
}

// export const fetchCharacters = createAsyncThunk(
//   'api/fetchCharacters',
//   async (queries: IQueries, thunkAPI) => {
//     try {
//       const { value, limit, page } = queries;
//       const characters = await getAllCharactersFilters(value, limit, page);
//       return characters;
//     } catch (err) {
//       const error = err as AxiosError;
//       if (error.response) {
//         if (error.response.status === 429) {
//           return thunkAPI.rejectWithValue('Too many requests');
//         } else {
//           return thunkAPI.rejectWithValue('Could not get data');
//         }
//       } else {
//         return thunkAPI.rejectWithValue('Could not get data');
//       }
//     }
//   }
// );

// export const fetchQuotes = createAsyncThunk('api/fetchQuotes', async (_, thunkAPI) => {
//   try {
//     const quotes = await getAllQuotes();
//     return quotes;
//   } catch (err) {
//     const error = err as AxiosError;
//     if (error.response) {
//       if (error.response.status === 429) {
//         return thunkAPI.rejectWithValue('Too many requests');
//       } else {
//         return thunkAPI.rejectWithValue('Could not get data');
//       }
//     } else {
//       return thunkAPI.rejectWithValue('Could not get data');
//     }
//   }
// });
