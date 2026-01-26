import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
  accessToken: string | null;
  userId: number | null;
};

const initialState: AuthState = {
  accessToken: null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    },
    setUserid(state, action: PayloadAction<number | null>) {
      state.userId = action.payload;
    },
    clearAuth(state) {
      state.accessToken = null;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
