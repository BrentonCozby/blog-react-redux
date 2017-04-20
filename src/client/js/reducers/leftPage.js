const INITAL_STATE = {
    photoUrl: '',
    headingText: '',
    date: ''
}

export default function(state = INITAL_STATE, action) {
    switch(action.type) {
        case 'SET_HEADING_TEXT':
            return {...state, headingText: action.payload}
        case 'SET_PHOTO_URL':
            return {...state, photoUrl: action.payload}
        case 'SET_DATE':
            return {...state, date: action.payload}
        default:
            return state
    }
}
