import { configureStore } from '@reduxjs/toolkit';

import { toastReducer } from './slices/ToastSlice';

export const store = configureStore({
  reducer: {
    toast: toastReducer,
  },
});

// 타입 추론용 (나중에 꼭 필요)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
