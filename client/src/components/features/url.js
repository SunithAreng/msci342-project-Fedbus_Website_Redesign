import { createSlice } from '@reduxjs/toolkit';

export const serverURL = createSlice({
    name: 'serverURL',
    initialState: {
        value: "",
        // value: "http://localhost:8081",
    },
    reducers: {
        dummy: (state) => {
            state.value += ""
        },
    },
});

export const { dummy } = serverURL.actions;

export default serverURL.reducer;