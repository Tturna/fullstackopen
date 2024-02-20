import notificationReducer from "./reducers/notificationReducer";
import errorReducer from "./reducers/errorReducer";
import blogsReducer from "./reducers/blogsReducer";
import userDataReducer from "./reducers/userDataReducer";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        error: errorReducer,
        blogs: blogsReducer,
        userData: userDataReducer
    }
});

export default store;