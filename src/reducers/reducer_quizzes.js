import _ from 'lodash'
import {
  FETCH_QUIZZES,
  CREATE_QUIZ,
  FETCH_QUIZ,
  DELETE_QUIZ,
  UPDATE_QUIZ
} from '../actions/action_quiz'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_QUIZZES:
      return { ...state, [action.id]: action.payload }
    case CREATE_QUIZ:
      return { ...state, [action.id]: action.payload }
    case FETCH_QUIZ:
      return { ...state, [action.id]: action.payload }
    case DELETE_QUIZ:
      return _.omit(state, [action.id])
    case UPDATE_QUIZ:
      return { ...state, [action.id]: action.payload }
    default: return state
  }
}
