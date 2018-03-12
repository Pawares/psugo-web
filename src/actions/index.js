export const FETCH_MISSIONS = 'fetch_missions'

const missions = 
[
    { id: "RRW3vlqiU3kIv6u3uTnL", name: "My Home" },
    { id: "1AxnsD2iURKoPoCWRQfh", name: "มารู้จัก มอ กันเถอะ" }
]

export function fetchMissions() {
    return {
        type: FETCH_MISSIONS,
        payload: missions
    }
}