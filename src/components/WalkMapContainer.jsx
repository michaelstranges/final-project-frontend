import React, { Component } from 'react'
import '../styles/WalkMapContainer.css';
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker } from "react-google-maps"
const google = window.google
//withGoogleMap is a higher order component (HOC)

const WalkMapContainer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAgI-8-W-pU3AW5bBZp0gxO5vqMZMrYy_M&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="container-map" style={{ height: `400px`}} />,
    mapElement: <div style={{ height: `100%`}} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
// Directions Creation - Start, End, Waypoints
      const DirectionsService = new google.maps.DirectionsService();
      //const waypts = [{location: new google.maps.LatLng(43.647986, -79.389184), stopover:false}, {location: new google.maps.LatLng(43.647986, -79.669184), stopover:false}]; //CHANGE
      const waypts = []

      console.log("theNewRoute ==>", this.props.theNewRoute[0] )



      DirectionsService.route({
        origin: new google.maps.LatLng(this.props.theNewRoute[0].start.lat, this.props.theNewRoute[0].start.lng), //CHANGE
        destination: new google.maps.LatLng(this.props.theNewRoute[0].end.lat, this.props.theNewRoute[0].end.lng), //CHANGE
        waypoints: waypts,
        travelMode: google.maps.TravelMode.WALKING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
          console.log(result)
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(43.644665, -79.394945)} //CHANGE
  >
    {console.log("PROPS---> Markers?", props)}
    {console.log("props.theNewMarkers ---> ", props.theNewMarkers)}
    {console.log("props.theNewMarkers ---> ", props.theNewMarkers[0].lat)}

    <Marker position={{ lat: props.theNewMarkers[0].lat, lng: props.theNewMarkers[0].lng }}></Marker>
    <Marker position={{ lat: props.theNewMarkers[1].lat, lng: props.theNewMarkers[1].lng }}></Marker>
    <Marker position={{ lat: props.theNewMarkers[2].lat, lng: props.theNewMarkers[2].lng }}></Marker>
    <Marker position={{ lat: props.theNewMarkers[3].lat, lng: props.theNewMarkers[3].lng }}></Marker>
    <Marker position={{ lat: props.theNewMarkers[4].lat, lng: props.theNewMarkers[4].lng }}></Marker>
    <Marker position={{ lat: props.theNewMarkers[5].lat, lng: props.theNewMarkers[5].lng }}></Marker>

    {props.directions && <DirectionsRenderer directions={props.directions} options={{draggable:true}} />}

    {console.log("POST PROPS--->", props)}

  </GoogleMap>
);

class MyMapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
    console.log("INNER CDM")
  }

  getMyDirections = evt => {
    console.log(evt)
  }

  handleMapClick = () => {
    console.log("this is the event")
  }

//SEND THE PROPS BELOW IN THE RETURN! RECALL FLOW
//Sends theNewRoute set of Start/End points to WalkMapContainer above

  render(){
    console.log("BEFORE the Render")
    return(
      <div>
        <WalkMapContainer theNewRoute={this.props.theRoute} theNewMarkers={this.props.theMarkers}/>
      </div>
    )
  }
}

export default MyMapContainer;
