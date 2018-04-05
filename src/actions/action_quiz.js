import { firestore } from '../database/config';

export const FETCH_QUIZZES = 'FETCH_QUIZZES'

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
