import type { ReactNode } from 'react';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type ModalType = 'CALL' | null;

interface ModalState {
  isOpen: boolean;
  type: ModalType;
  content: ReactNode | null;
}

const initialState: ModalState = {
  isOpen: false,
  type: null,
  content: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ type: ModalType; content?: ReactNode }>) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.content = action.payload.content;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.content = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
