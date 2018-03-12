import { combineReducers } from 'redux'
import MissionsReducer from './reducer_missions'

const rootReducer = combineReducers({
    missions: MissionsReducer
})

export default rootReducer