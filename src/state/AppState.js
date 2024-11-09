import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    email: "",
    isAdmin: false,
    userId: ""
}

export const AppSlice = createSlice({
    name: "AppData",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.email = action.payload.email;
            state.isAdmin = action.payload.isAdmin;
            state.userId = action.payload.userId;
        },
        setLogout: (state) => {
            state.email = null;
            state.isAdmin = null;
            state.userId = null;
        },

        //    other reducers
    }
})

export const { setLogout, setLogin } = AppSlice.actions;

export default AppSlice.reducer;