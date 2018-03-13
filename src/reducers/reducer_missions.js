import { FETCH_MISSIONS, CREATE_MISSION, FETCH_MISSION, DELETE_MISSION} from '../actions/index'
import _ from 'lodash'

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_MISSIONS: return _.mapKeys(action.payload, 'id')
        case CREATE_MISSION: return state
        case FETCH_MISSION: return { ...state, [action.payload.id] : _.mapKeys(action.payload, 'id')}
        // case FETCH_MISSION: return { ...state, [action.payload.id] : _.mapKeys(action.payload, 'id')}
        case DELETE_MISSION: return _.omit(state, [action.payload])
        default: return state
    }
}