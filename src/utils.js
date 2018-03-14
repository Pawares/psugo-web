import firebase from 'firebase'


export function parseToFireItem(item) {
    const { latitude, longitude, radius, timeout } = item
    const lat = Number(latitude)
    const lng = Number(longitude)
    const r = Number(radius)
    const to = Number(timeout)
    const geoPoint = new firebase.firestore.GeoPoint(lat, lng)
    const timestamp = new firebase.firestore.FieldValue.serverTimestamp()
    return {
        name: item.name,
        geoPoint: geoPoint,
        radius: r,
        timeout: to,
        timestamp
    }

}