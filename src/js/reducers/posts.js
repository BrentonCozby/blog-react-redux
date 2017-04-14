const INITAL_STATE = {
    all: [],
    active: null
}

export default function(state = INITAL_STATE, action) {
    switch(action.type) {
        case 'GET_POSTS':
            return {...state, all: action.payload.data}
        case 'GET_ONE_POST':
            return {...state, active: action.payload.data}
        default:
            return state
    }
}
