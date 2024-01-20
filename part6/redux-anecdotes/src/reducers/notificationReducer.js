import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        changeNotification(_state, action) {
            return action.payload
        }
    }
})

export default notificationSlice.reducer
export const { changeNotification } = notificationSlice.actions