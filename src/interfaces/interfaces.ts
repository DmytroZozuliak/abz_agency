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
  success: boolean;
  positions: IPosition[];
}

export interface IPosition {
  id: number;
  name: string;
}

export interface IToken {
  success: boolean;
  token: string;
}

export interface IPostObj {
  formData: FormData;
  token: string;
}

export interface IPostRequest {
  success: boolean;
  user_id: number;
  message: string;
}

export interface IErrorData {
  message: string;
  success: boolean;
}

export interface IInitialFormValues {
  name: string;
  email: string;
  phone: string;
  file: null;
  position: string;
}
