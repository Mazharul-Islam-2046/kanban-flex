import { IProject } from "@/models/Project";
import { createSlice } from "@reduxjs/toolkit";




interface ProjectState {
    isLoading: boolean;
    projects: IProject[];
}


const initialState: ProjectState = {
    isLoading: false,
    projects: [],
}



const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        addProject: (state, action) => {
            state.projects.push(action.payload);
        },
        updateProject: (state, action) => {
            const index = state.projects.findIndex(project => project._id === action.payload._id);
            if (index !== -1) {
                state.projects[index] = action.payload;
            }
        },
        deleteProject: (state, action) => {
            state.projects = state.projects.filter(project => project._id !== action.payload);
        },
    },
    // extraReducers: (builder) => {
        // Here I'll add the api calls and their respective reducers
    // },
})



export const { setLoading, setProjects, addProject, updateProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;