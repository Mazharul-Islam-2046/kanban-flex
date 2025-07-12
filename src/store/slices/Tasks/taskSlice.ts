import { ITask } from "@/models/Task";
import { createSlice } from "@reduxjs/toolkit";


interface TaskSliceState {
    isLoading: boolean;
    tasks: ITask[];
}

const initialState: TaskSliceState = {
    isLoading: false,
    tasks: [],
}

const taskSLice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action) => {
            const index = state.tasks.findIndex(task => task._id === action.payload._id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task._id !== action.payload);
        },
    },

    // extraReducers: (builder) => {
        // Here I'll add the api calls and their respective reducers
    // },
})




export const { setLoading, setTasks, addTask, updateTask, deleteTask } = taskSLice.actions;
export default taskSLice.reducer;