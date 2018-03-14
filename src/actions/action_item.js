import { firestore } from '../database/config'

export const FETCH_ITEMS = 'FETCH_ITEMS'


export function fetchItems() {
    return (dispatch) => {
        firestore.collection('items').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data())
                dispatch({
                    type: FETCH_ITEMS,
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