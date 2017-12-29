const INITAL_STATE = {
    photoUrl: '',
    headingText: '',
    date: ''
}

export default function(state = INITAL_STATE, action) {
    switch(action.type) {
        case 'SET_LEFT_PAGE':
            const { image, title, date } = action.payload
            return {
                photoUrl: image,
                headingText: title,
                date: date
            }
        default:
            return state
    }
}
