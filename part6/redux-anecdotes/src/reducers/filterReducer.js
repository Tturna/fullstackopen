const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'CHANGE':
            return action.payload.filter
        default:
            return state
    }
}

export const changeFilter = (filter) => {
    return {
        type: 'CHANGE',
        payload: { filter }
    }
}

export default filterReducer