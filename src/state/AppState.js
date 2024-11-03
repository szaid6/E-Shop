import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    token: "",
    email: "",
}

export const AppSlice = createSlice({
    name: "AppData",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.token = action.payload.token;
            state.email = action.payload.email;
        },
        setLogout: (state) => {
            state.token = null;
            state.email = null;
        },
    //    other reducers
    }
})

export const { setLogout, setLogin} = AppSlice.actions;

export default AppSlice.reducer;