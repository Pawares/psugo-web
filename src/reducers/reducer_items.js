import { FETCH_ITEMS } from '../actions/action_item'


export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_ITEMS: return { ...state, [action.id]: action.payload }

    }

    return state
}