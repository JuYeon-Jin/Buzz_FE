import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    name: null,
    serverUrl: 'http://localhost:8080',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.isAuthenticated = true;
            state.name = action.payload.name;
        },
        clearUserInfo: (state) => {
            state.isAuthenticated = false;
            state.name = null;
        },
    },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
