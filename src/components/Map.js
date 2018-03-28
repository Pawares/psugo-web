import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'


const MyMapComponent = withScriptjs(withGoogleMap(props => (

  <GoogleMap
    defaultCenter={{ lat: Number(props.lat), lng: Number(props.lng) }}
    defaultZoom={18}
  >
    {props.isMarkerShown && <Marker position={{ lat: Number(props.lat), lng: Number(props.lng) }} />}
    {/* {props.isMarkerShown && <Marker position={{ lat: 8.0802853, lng: 99.8911093 }} />} */}
  </GoogleMap>
)))

const Map = (props) => {
  console.log(props)
  return (
    <div>
      <MyMapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8vPVbHSptjITeqdM6vbVehA2u30Vu1eo&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '350px', width: '350px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        isMarkerShown
        {...props}
      />
    </div>
  )
}
export default Map
