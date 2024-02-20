import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
    name: "error",
    initialState: "",
    reducers: {
        changeError(_state, action) {
            return action.payload;
        }
    }
});

export default errorSlice.reducer;
export const { changeError } = errorSlice.actions;