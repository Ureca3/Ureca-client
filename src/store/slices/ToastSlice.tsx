import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ToastVariant = 'default' | 'success' | 'error';

export interface ToastState {
  open: boolean;
  text: string;
  variant: ToastVariant;
  seq: number;
}

const initialState: ToastState = {
  open: false,
  text: '',
  variant: 'default',
  seq: 0,
};

type ShowPayload = {
  text: string;
  variant?: ToastVariant;
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    show(state, action: PayloadAction<ShowPayload>) {
      state.open = true;
      state.text = action.payload.text;
      state.variant = action.payload.variant ?? 'default';
      state.seq += 1;
    },
    hide(state) {
      state.open = false;
    },
    clear(state) {
      state.open = false;
      state.text = '';
      state.variant = 'default';
    },
  },
});

export const toastActions = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
