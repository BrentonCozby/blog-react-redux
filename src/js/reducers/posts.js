const INITAL_STATE = {
    all: [],
    active: null,
    isReadingMode: false
}

export default function(state = INITAL_STATE, action) {
    switch(action.type) {
        case 'GET_POSTS':
            let allPosts = []
            for(let id in action.payload) {
                allPosts.push({
                    id,
                    title: action.payload[id].title,
                    date: action.payload[id].date,
                    image: action.payload[id].image,
                    tags: action.payload[id].tags,
                    content: action.payload[id].content
                })
            }
            return {...state, all: allPosts}
        case 'GET_ONE_POST':
            return {...state, active: action.payload}
        case 'DELETE_POST':
            return {...state, active: null}
        case 'CLEAR_ACTIVE_POST':
            return {...state, active: null}
        case 'TOGGLE_READING_MODE':
            return {...state, isReadingMode: !state.isReadingMode}
        default:
            return state
    }
}
