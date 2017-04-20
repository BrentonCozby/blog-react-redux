const INITAL_STATE = {
    all: [],
    active: null,
    isReadingMode: false
}

export default function(state = INITAL_STATE, action) {
    switch(action.type) {
        case 'GET_POSTS':
            return {...state, all: action.payload.data}
        case 'GET_ONE_POST':
            return {...state, active: action.payload.data}
        case 'DELETE_POST':
            return {...state, active: null}
        case 'TOGGLE_READING_MODE':
            return {...state, isReadingMode: !state.isReadingMode}
        default:
            return state
    }
}
