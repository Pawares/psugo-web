import { firestore } from '../database/config'

export const FETCH_MISSIONS = 'FETCH_MISSIONS'
export const CREATE_MISSION = 'CREATE_MISSION'
export const FETCH_MISSION = 'FETCH_MISSION'

export function fetchMissions() {
    return (dispatch) => {
        firestore.collection('missions').get().then((querySnapshot) => {
            let missions = []
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                missions.push({
                    id: doc.id,
                    data: doc.data()
                })
                
            })
            dispatch({
                type: FETCH_MISSIONS,
                payload: missions
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
                let mission = []
                // console.log("Document data:", doc.data());
                mission.push({
                    id: id,
                    data: doc.data()
                })

                dispatch({
                    type: FETCH_MISSION,
                    payload: mission
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
                