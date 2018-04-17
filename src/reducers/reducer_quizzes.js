import {
  FETCH_QUIZZES,
  CREATE_QUIZ,
} from '../actions/action_quiz'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_QUIZZES:
      return { ...state, [action.id]: action.payload }
    case CREATE_QUIZ:
      return { ...state, [action.id]: action.payload }
    default: return state
  }
}
