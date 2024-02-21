import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        setUsers(_state, action) {
            return action.payload;
        }
    }
});

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;