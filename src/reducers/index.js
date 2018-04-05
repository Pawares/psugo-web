import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import MissionsReducer from './reducer_missions'
import ItemsReducer from './reducer_items'
import QuizzesReducer from './reducer_quizzes'

const rootReducer = combineReducers({
  missions: MissionsReducer,
  items: ItemsReducer,
  quizzes: QuizzesReducer,
  form: formReducer
})

export default rootReducer
