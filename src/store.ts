import { configureStore } from '@reduxjs/toolkit';
import { reposApi } from './services/service';

export const store = configureStore({
  reducer: {
    [reposApi.reducerPath]: reposApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reposApi.middleware),
});
