import { firestore } from '../database/config'
import _ from 'lodash'

export const FETCH_MISSIONS = 'fetch_missions'

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
                

// const missions = 
// [
//     { id: "RRW3vlqiU3kIv6u3uTnL", name: "My Home" },
//     { id: "1AxnsD2iURKoPoCWRQfh", name: "มารู้จัก มอ กันเถอะ" }
// ]
// 
// export function fetchMissions() {
//     return {
//         type: FETCH_MISSIONS,
//         payload: missions
//     }
// }