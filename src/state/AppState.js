import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    token: "",
    email: "",
    isAdmin: false
}

export const AppSlice = createSlice({
    name: "AppData",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.isAdmin = action.payload.isAdmin;
        },
        setLogout: (state) => {
            state.token = null;
            state.email = null;
            state.isAdmin = false;
        },

        //    other reducers
    }
})

export const { setLogout, setLogin } = AppSlice.actions;

export default AppSlice.reducer;