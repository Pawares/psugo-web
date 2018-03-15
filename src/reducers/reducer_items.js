import { FETCH_ITEMS, CREATE_ITEM, FETCH_ITEM } from '../actions/action_item'


export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_ITEMS: return { ...state, [action.id]: action.payload }
        case CREATE_ITEM: return { ...state, [action.id]: action.payload }
        case FETCH_ITEM: return { ...state, [action.id]: action.payload }
        default: return state
    }
    
}