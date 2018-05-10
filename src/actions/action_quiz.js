import { firestore } from '../database/config';

export const FETCH_QUIZZES = 'FETCH_QUIZZES'
export const CREATE_QUIZ = 'CREATE_QUIZ'
export const FETCH_QUIZ = 'FETCH_QUIZ'
export const DELETE_QUIZ = 'DELETE_QUIZ'
export const UPDATE_QUIZ = 'UPDATE_QUIZ'

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

export function fetchQuiz(id) {
  return (dispatch) => {
    firestore
      .collection('quizzes')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data())
          dispatch({
            type: FETCH_QUIZ,
            id: id,
            payload: doc.data()
          })
        } else {
          console.log('No such document!')
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })
  }
}

export function deleteQuiz(id, callback) {
  return (dispatch) => {
    firestore
      .collection('quizzes')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!')
        dispatch({
          type: DELETE_QUIZ,
          id: id
        })
        callback()
      })
      .catch((error) => {
        console.error('Error removing document: ', error)
      })
  }
}

export function updateQuiz(id, data, callback) {
  return (dispatch) => {
    firestore
      .collection('quizzes')
      .doc(id)
      .set(data)
      .then(() => {
        dispatch({
          type: UPDATE_QUIZ,
          id: id,
          payload: data
        })
        callback()
      })
      .catch((error) => {
        console.error('Error updating document: ', error)
      })
  }
}