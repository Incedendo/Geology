import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';

export class MapContainer extends Component {

  state = {
    selectedPlace: {},
  }

  render() {

    const style = {
      width: '50%',
      height: '50%'
    }

    return (
      <Map
        google={this.props.google}
        style={style}
          initialCenter={{
            lat: 40.854885,
            lng: -88.081807
          }}
        zoom={15}
      >

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDUMDckcX8MPiRqIBPT9FL2rXfCYexrLYo",
})(MapContainer)
