import { configureStore } from '@reduxjs/toolkit';
import partsReducer from '@/store/partsSlice';

export const store = configureStore({
  reducer: {
    parts: partsReducer,
  },
});
