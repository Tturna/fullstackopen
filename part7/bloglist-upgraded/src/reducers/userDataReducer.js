import { createSlice } from '@reduxjs/toolkit';

const initialState = { username: null, token: null };

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData(_state, action) {
            return action.payload;
        },
        clearUserData(_state, _action) {
            return initialState;
        }
    }
});

export default userDataSlice.reducer;
export const { setUserData, clearUserData } = userDataSlice.actions;