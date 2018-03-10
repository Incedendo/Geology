import React, { Component } from 'react';
import '../assets/scss/include.scss';
import MapContainer from './GoogleAPIScripts/MapContainer';

class DetailedChannelView extends Component{
   state = {
     address: 'London, United Kingdom',
     position: {
       latitude: 51.5085300,
       longitude: -0.1257400
     },
     initial_map_zoom_level: 8,
   };

   render(){
     console.log(this.props);
     return(
       <div>
         <div>
           SiteID: {this.props.location.state.siteID}
         </div>
         <div>
           Latitude: {this.props.location.state.latitude}
         </div>
         <div>
           Longitude: {this.props.location.state.longitude}
         </div>

        <MapContainer/>
       </div>
     )
   }
}

export default DetailedChannelView;
