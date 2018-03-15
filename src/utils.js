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

export function parseFromFireItem(item) {
    const parsedItem = {}

    if (!item) {
        console.log("Item loading...")
    } else {
        const { geoPoint ,name, radius, timeout, timestamp } = item
        return {
            name: name,
            latitude: geoPoint._lat,
            longitude: geoPoint._long,
            radius: radius,
            timeout: timeout,
            timestamp: timestamp
        }
    }

    return parsedItem 
}