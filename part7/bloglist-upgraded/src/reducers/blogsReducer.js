import { createSlice } from '@reduxjs/toolkit';

const blogsSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs(_state, action) {
            return action.payload;
        },
        addBlog(state, action) {
            return state.concat(action.payload);
        },
        updateBlog(state, action) {
            const updated = action.payload;
            return state
                .map((b) => (b.id === updated.id ? updated : b))
                .sort((a, b) => b.likes - a.likes)
        },
        removeBlog(state, action) {
            return state.filter((b) => b.id !== action.payload);
        }
    }
});

export default blogsSlice.reducer;
export const { setBlogs, addBlog, updateBlog, removeBlog } = blogsSlice.actions;