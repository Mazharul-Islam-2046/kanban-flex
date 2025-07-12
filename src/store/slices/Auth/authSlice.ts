import { IUser } from "@/models/User";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLoading: boolean;
  user: IUser | null;
}

const initialState: AuthState = {
  isLoading: false,
  user: null,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action) => {
        state.isLoading = action.payload;
        },
        setUser: (state, action) => {
        state.user = action.payload;
        },
        clearUser: (state) => {
        state.user = null;
        },
    },

    // extraReducers: (builder) => {
        // Here I'll add the api calls and their respective reducers
    // },
})




export const { setLoading, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;