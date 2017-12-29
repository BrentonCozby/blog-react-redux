const INITAL_STATE = {
    id: null,
    name: null,
    email: null
}

export default function(state = INITAL_STATE, action) {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                id: action.payload.uid,
                name: action.payload.displayName,
                email: action.payload.email
            }
        case 'LOGOUT':
            return {...state,
                id: null,
                name: null,
                email: null
            }
        default:
            return state
    }
}
