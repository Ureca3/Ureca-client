import { configureStore } from '@reduxjs/toolkit';

import { modalReducer } from './slices/ModalSlice';
import { toastReducer } from './slices/ToastSlice';

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['modal/openModal'],
        ignoredPaths: ['modal.content'],
      },
    }),
});

// 타입 추론용 (나중에 꼭 필요)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
