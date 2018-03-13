import { FETCH_MISSIONS, CREATE_MISSION } from '../actions/index'
import _ from 'lodash'

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_MISSIONS: return _.mapKeys(action.payload, 'id')
        case CREATE_MISSION: return [...state, action.payload]
        default: return state
    }
    return state
}