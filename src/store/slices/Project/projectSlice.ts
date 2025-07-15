
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios/config';
import { IProject } from '@/models/Project';

interface ProjectState {
  projects: IProject[];
  currentProject: IProject | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

// Async thunk for fetching project by ID
export const fetchProjectById = createAsyncThunk(
  'project/fetchById',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/projects/${projectId}`);
      return response;
    } catch (error: unknown) {
      let errorMessage = 'Failed to fetch project';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    // Your existing sync reducers...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload.data as IProject;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { /* your existing actions */ } = projectSlice.actions;
export default projectSlice.reducer;