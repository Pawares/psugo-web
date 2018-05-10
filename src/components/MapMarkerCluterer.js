import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const MyMapComponent = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    // defaultCenter={{ lat: 7.0114278, lng: 100.4965863 }}
    defaultCenter={{ lat: Number(props.markers[0].latitude), lng: Number(props.markers[0].longitude) }}
    defaultZoom={16}
  >
    {
      props.markers.map((marker) => {
        const { latitude, longitude, name } = marker
        return <Marker position={{ lat: Number(latitude), lng: Number(longitude) }} label={name} />
      })
    }
  </GoogleMap>
)))

const MapMarkerCluterer = (props) => {
  return (
    <div>
      <MyMapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8vPVbHSptjITeqdM6vbVehA2u30Vu1eo&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '350px', width: '400px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        {...props}
      />
    </div>
  )
}
export default MapMarkerCluterer
