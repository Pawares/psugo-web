import { firestore } from '../database/config'
import _ from 'lodash'

export const FETCH_MISSIONS = 'fetch_missions'
export const CREATE_MISSION = 'create_mission'

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
                