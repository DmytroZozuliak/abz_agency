/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

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

// https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=5
export const baseUrl = ' https://frontend-test-assignment-api.abz.agency/api/v1';
const usersUrl = `${baseUrl}/users`;

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

/* import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface IQueries {
  value: string;
  limit: number;
  page: number;
}

export const fetchCharacters = createAsyncThunk(
  'api/fetchCharacters',
  async (queries: IQueries, thunkAPI) => {
    try {
      const { value, limit, page } = queries;
      const characters = await getAllCharactersFilters(value, limit, page);
      return characters;
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

export const fetchQuotes = createAsyncThunk('api/fetchQuotes', async (_, thunkAPI) => {
  try {
    const quotes = await getAllQuotes();
    return quotes;
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
});

// \\\\\\\\\\\\\\\
export const baseUrl = 'https://the-one-api.dev/v2';
const quotesUrl = `${baseUrl}/quote`;
const charactersUrl = `${baseUrl}/character`;

const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer QCWRYhej4z3WGyy1CTGg', // dmytro
  // Authorization: 'Bearer fiyz6lUIy2S17G4TYYJL', // dohlaja
  // Authorization: 'Bearer _wZRVQG21nv9Ww1X6ABY',
};

export interface IFilterPagination {
  docs: string[];
  limit: number;
  offset: number;
  page: number;
  pages: number;
  total: number;
}

export async function getAllCharactersFilters(
  value: string,
  limit = 50,
  page = 1,
  sort = 'asc',
  sortby = 'name'
): Promise<IFilterPagination> {
  const rawCharacters = await axios.get<IFilterPagination>(charactersUrl, {
    headers: headers,
    params: {
      name: `/${value}/i`,
      sort: `${sortby}:${sort}`,
      limit,
      page,
    },
  });
  return rawCharacters.data;
}

export async function getAllQuotes(): Promise<string[]> {
  const rawQuotes = await axios.get(quotesUrl, { headers: headers });
  return rawQuotes.data.docs;
}
 */
