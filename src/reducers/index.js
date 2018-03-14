import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import MissionsReducer from './reducer_missions'
import ItemsReducer from './reducer_items'

const rootReducer = combineReducers({
    missions: MissionsReducer,
    items: ItemsReducer,
    form: formReducer
})

export default rootReducer