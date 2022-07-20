/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { boolean } from 'yup';

interface IQueries {
  page: number;
  count: number;
}

export interface IUsers {
  count: number;
  links: {
    next_url: null | string;
    prev_url: null | string;
  };
  page: number;
  success: boolean;
  total_pages: number;
  total_users: number;
  users: IUser[];
}

export interface IUser {
  email: string;
  id: number;
  name: string;
  phone: string;
  photo: string;
  position: string;
  position_id: number;
  registration_timestamp: number;
}

export interface IPositions {
  "success": boolean;
  "positions": IPosition[];
}

export interface IPosition {
  "id": number;
  "name": string;
}

export interface IToken {
  "success": boolean;
  "token": string;
}

// https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=5
//  https://frontend-test-assignment-api.abz.agency/api/v1/positions
export const baseUrl = ' https://frontend-test-assignment-api.abz.agency/api/v1';
const usersUrl = `${baseUrl}/users`;
const positionsUrl = `${baseUrl}/positions`;
const tokenUrl = `${baseUrl}/token`;

const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer QCWRYhej4z3WGyy1CTGg', // dmytro
};

export const fetchUsers = createAsyncThunk(
  'api/fetchUsers',
  async (page: number, thunkAPI) => {
    try {
      const usersResponse = await axios.get<IUsers>(usersUrl, {
        params: {
          page,
          count: 6,
        },
      });
      return usersResponse.data;
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 429) {
          return thunkAPI.rejectWithValue('Too many requests');
        } else {
          return thunkAPI.rejectWithValue('Could not get data');
        }
      } else {
        return thunkAPI.rejectWithValue('Could not get data');
      }
    }
  }
);

export const fetchMoreUsers = createAsyncThunk(
  'api/fetchMoreUsers',
  async (url: string, thunkAPI) => {
    try {
      const usersResponse = await axios.get<IUsers>(url)
      return usersResponse.data;
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 429) {
          return thunkAPI.rejectWithValue('Too many requests');
        } else {
          return thunkAPI.rejectWithValue('Could not get data');
        }
      } else {
        return thunkAPI.rejectWithValue('Could not get data');
      }
    }
  }
);

export const fetchPositions = createAsyncThunk(
  'api/fetchPositions',
  async (_: null, thunkAPI) => {
    try {
      const positionsResponse = await axios.get<IPositions>(positionsUrl);
      return positionsResponse.data;
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 429) {
          return thunkAPI.rejectWithValue('Too many requests');
        } else {
          return thunkAPI.rejectWithValue('Could not get data');
        }
      } else {
        return thunkAPI.rejectWithValue('Could not get data');
      }
    }
  }
);

export const getToken = createAsyncThunk(
  'api/getToken',
  async (_: null, thunkAPI) => {
    try {
      const tokenResponse = await axios.get<IToken>(tokenUrl);
      return tokenResponse.data;
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 429) {
          return thunkAPI.rejectWithValue('Too many requests');
        } else {
          return thunkAPI.rejectWithValue('Could not get data');
        }
      } else {
        return thunkAPI.rejectWithValue('Could not get data');
      }
    }
  }
);

export interface IPostObj {
  formData: FormData;
  token: string;
}

export interface IPostRequest {
  "success": boolean;
  "user_id": number;
  "message": string;
}

export const postForm = createAsyncThunk(
  'api/postForm',
  async (postObj: IPostObj, thunkAPI) => {
    try {
      const postResponse = await axios.post<IPostRequest>(usersUrl, postObj.formData, {
        headers: {
          'Token': postObj.token
        }
      });
      return postResponse.data;
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          // token expired
          thunkAPI.dispatch(getToken(null))
          return thunkAPI.rejectWithValue('token expired');
        }
        else if (error.response.status === 409) {
          return thunkAPI.rejectWithValue('User with this phone or email already exist');
        }
        else if (error.response.status === 422) {
          return thunkAPI.rejectWithValue('"Validation failed"');
        }
        else {
          return thunkAPI.rejectWithValue('Could not get data');
        }

      } else {
        return thunkAPI.rejectWithValue('Could not get data');
      }
    }
  }
);
