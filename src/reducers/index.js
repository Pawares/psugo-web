import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import MissionsReducer from './reducer_missions'

const rootReducer = combineReducers({
    missions: MissionsReducer,
    form: formReducer
})

export default rootReducer