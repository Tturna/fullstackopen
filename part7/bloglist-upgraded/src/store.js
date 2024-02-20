import notificationReducer from "./reducers/notificationReducer";
import errorReducer from "./reducers/errorReducer";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        error: errorReducer
    }
});

export default store;