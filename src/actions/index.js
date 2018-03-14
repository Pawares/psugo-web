import { firestore } from '../database/config'

export const FETCH_MISSIONS = 'FETCH_MISSIONS'
export const CREATE_MISSION = 'CREATE_MISSION'
export const FETCH_MISSION = 'FETCH_MISSION'
export const DELETE_MISSION = 'DELETE_MISSION'

export function fetchMissions() {
    return (dispatch) => {
        firestore.collection('missions').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                dispatch({
                    type: FETCH_MISSIONS,
                    id: doc.id,
                    payload: doc.data()
                })
            })
            
        }).catch((error) => {
            console.log(error)
        })
    }
}

export function createMission(mission, callback) {
    return (dispatch) => {
        firestore.collection('missions').add(mission)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id)
            dispatch({
                type: CREATE_MISSION,
                id: docRef.id,
                payload: mission
            })
            callback()
        })
        .catch((error) => {
            console.error("Error adding document: ", error)
        })
    }
}

export function fetchMission(id) {
    return (dispatch) => {
        firestore.collection('missions').doc(id).get()
        .then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                dispatch({
                    type: FETCH_MISSION,
                    id: id,
                    payload: doc.data() 
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
        .catch((error) => {
            console.log("Error getting document:", error);

        })
    }
}
               
export function deleteMission(id, callback) {
    return (dispatch) => {
        firestore.collection('missions').doc(id).delete()
        .then(() => {
            console.log("Document successfully deleted!")
            dispatch({
                type: DELETE_MISSION,
                id: id
            })
            callback()
        })
        .catch((error) => {
            console.error("Error removing document: ", error)
        })
    }
}