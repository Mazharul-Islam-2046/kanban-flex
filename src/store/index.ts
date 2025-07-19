import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/Project/projectSlice';
import projectApi from '@/api/projectApi';

export const store = configureStore({
  reducer: {
    [projectApi.reducerPath]: projectApi.reducer,
    project: projectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      projectApi.middleware
    ),
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;