import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'


const MyMapComponent = withScriptjs(withGoogleMap(props => (

  <GoogleMap
    defaultCenter={{ lat: 7.0114278, lng: 100.4965863 }}
    defaultZoom={16}
  >
    <Marker position={{ lat: 7.0114278, lng: 100.4965863 }} label="คณะนิติศาสตร์" />
    <Marker position={{ lat: 7.0088398, lng: 100.497946 }} label="ศูนย์คอมพิวเตอร์" />
    <Marker position={{ lat: 7.0058629, lng: 100.4998824 }} label="คณะทรัพยากรธรรมชาติ" />
    <Marker position={{ lat: 7.0111761, lng: 100.4967472 }} label="คณะศิลปศาสตร์" />
    <Marker position={{ lat: 7.0060222, lng: 100.5005159 }} label="คณะวิศวกรรมคอมพิวเตอร์" />
    <Marker position={{ lat: 7.0111833, lng: 100.4980263 }} label="คณะวิทยาการจัดการ" />
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
