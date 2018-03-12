import { FETCH_MISSIONS } from '../actions/index'
import _ from 'lodash'

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_MISSIONS: return _.mapKeys(action.payload, 'id')
        default: return state
    }
    return state
}