import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IUsers, IPositions, IToken, IPostRequest, IErrorData } from '../../interfaces/interfaces';
import { RootState } from '../store';

export const baseUrl = ' https://frontend-test-assignment-api.abz.agency/api/v1';
export const usersUrl = `${baseUrl}/users`;
const positionsUrl = `${baseUrl}/positions`;
const tokenUrl = `${baseUrl}/token`;

export const fetchUsers = createAsyncThunk('api/fetchUsers', async (page: number, thunkAPI) => {
  try {
    const usersResponse = await axios.get<IUsers>(usersUrl, {
      params: {
        page,
        count: 6,
      },
    });
    return usersResponse.data;
  } catch (err) {
    return thunkAPI.rejectWithValue('Could not get data');
  }
});

export const fetchMoreUsers = createAsyncThunk(
  'api/fetchMoreUsers',
  async (url: string, thunkAPI) => {
    try {
      const usersResponse = await axios.get<IUsers>(url);
      return usersResponse.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('Could not get data');
    }
  }
);

export const fetchPositions = createAsyncThunk('api/fetchPositions', async (_: void, thunkAPI) => {
  try {
    const positionsResponse = await axios.get<IPositions>(positionsUrl);
    return positionsResponse.data;
  } catch (err) {
    return thunkAPI.rejectWithValue('Could not get data');
  }
});

export const getToken = createAsyncThunk('api/getToken', async (_: void, thunkAPI) => {
  try {
    const tokenResponse = await axios.get<IToken>(tokenUrl);
    return tokenResponse.data;
  } catch (err) {
    return thunkAPI.rejectWithValue('Could not get data');
  }
});

export const postUser = createAsyncThunk(
  'api/postUser',
  async (body: FormData, { getState, rejectWithValue, dispatch }) => {
    const globalState = getState() as RootState;

    try {
      const response = await axios.post<IPostRequest>(usersUrl, body, {
        headers: {
          Token: globalState.users.token,
        },
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      let message: string | undefined;
      if (error.response) {
        const responseData = error.response.data as IErrorData;
        if (error.response.status === 401) {
          dispatch(getToken());
          message = responseData.message;
        } else if (error.response.status === 409) {
          message = responseData.message;
        } else if (error.response.status === 422) {
          message = responseData.message;
        }
      }

      return rejectWithValue(message || 'Could not get data');
    }
  }
);
