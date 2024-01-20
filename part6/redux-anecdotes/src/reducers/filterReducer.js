import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        changeFilter(_state, action) {
            return action.payload
        }
    }
})

// const filterReducer = (state = '', action) => {
//     switch(action.type) {
//         case 'CHANGE':
//             return action.payload.filter
//         default:
//             return state
//     }
// }

// export const changeFilter = (filter) => {
//     return {
//         type: 'CHANGE',
//         payload: { filter }
//     }
// }

export default filterSlice.reducer
export const { changeFilter } = filterSlice.actions