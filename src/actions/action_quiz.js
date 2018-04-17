import { firestore } from '../database/config';

export const FETCH_QUIZZES = 'FETCH_QUIZZES'
export const CREATE_QUIZ = 'CREATE_QUIZ'

export function fetchQuizzes() {
  return (dispatch) => {
    firestore
      .collection('quizzes')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, ' => ', doc.data())
          dispatch({
            type: FETCH_QUIZZES,
            id: doc.id,
            payload: doc.data()
          })
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export function createQuiz(quiz, callback) {
  return (dispatch) => {
    firestore
      .collection('quizzes')
      .add(quiz)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id)
        dispatch({
          type: CREATE_QUIZ,
          id: docRef.id,
          payload: quiz
        })
        callback()
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
