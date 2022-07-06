import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFormPage {
  personCards: string[];
  form: {
    name: string;
    surname: string;
    date: string;
    file: string;
    dataProcessing: boolean;
  };
  submitBtnDisable: boolean;
}

const initialState: IFormPage = {
  personCards: [],
  form: {
    name: '',
    surname: '',
    date: '',
    file: '',
    dataProcessing: false,
  },
  submitBtnDisable: true,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    formAddCard(state, action: PayloadAction<string>) {
      state.personCards.push(action.payload);
    },

    formDisableSubmit(state, action: PayloadAction<boolean>) {
      state.submitBtnDisable = action.payload;
    },
  },
});

export const { formAddCard, formDisableSubmit } = formSlice.actions;

export default formSlice.reducer;
