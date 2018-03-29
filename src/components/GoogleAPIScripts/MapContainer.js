import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';

export class MapContainer extends Component {

  state = {
    selectedPlace: {},
  }

  render() {
    const style = {
      width: '60%',
      height: '70%',
    }

    return (
      <Map
        google={this.props.google}
        style={style}
          initialCenter={{
            lat: this.props.lat,
            lng: this.props.long,
          }}
        zoom={15}
      >

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>???</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDUMDckcX8MPiRqIBPT9FL2rXfCYexrLYo",
})(MapContainer)
