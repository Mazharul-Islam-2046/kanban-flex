
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import taskReducer from './slices/Tasks/taskSlice';
import projectReducer from './slices/Project/projectSlice';


export const store = configureStore({
  reducer: {
    task: taskReducer,
    project: projectReducer,
  }

})



setupListeners(store.dispatch);


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch




