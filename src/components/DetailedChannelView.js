import React, { Component } from 'react';
import '../assets/scss/include.scss';
import MapContainer from './GoogleAPIScripts/MapContainer';
import { ChannelLocation, ChannelAttributes, ClimateInformation, ChannelReference } from "./Utils";

class DetailedChannelView extends Component{
   state = {
     address: 'London, United Kingdom',
     position: {
       latitude: 51.5085300,
       longitude: -0.1257400
     },
     initial_map_zoom_level: 8,
   };

   componentDidMount(){
     console.log("component mounted");
   }

   render(){
     console.log(this.props);
     return(
       <div className="enclosing-border">
         <div className="enclosing-border">
           <div>
             SiteID: {this.props.location.state.siteID}
           </div>
           <div>
             Latitude: {this.props.location.state.latitude}
           </div>
           <div>
             Longitude: {this.props.location.state.longitude}
           </div>
         </div>

         <div>

           <div className="enclosing-border inline" style={{
             width: "40%",
             "margin-left": "20px",
             "margin-right": "20px",
             "margin-bottom": "30px"
           }}>
             <table>
               <tr>
                 <th>Firstname</th>
                 <th>Lastname</th>
                 <th>Age</th>
               </tr>
               <tr>
                 <td>Jill</td>
                 <td>Smith</td>
                 <td>50</td>
               </tr>
               <tr>
                 <td>Eve</td>
                 <td>Jackson</td>
                 <td>94</td>
               </tr>
             </table>
           </div>

           <div className="enclosing-border inline" style={{
             width: "40%",
             "margin-left": "20px",
             "margin-right": "20px",
             "margin-bottom": "30px"
           }}>
             <table>
               <tr>
                 <th>Firstname</th>
                 <th>Lastname</th>
                 <th>Age</th>
               </tr>
               <tr>
                 <td>Jill</td>
                 <td>Smith</td>
                 <td>50</td>
               </tr>
               <tr>
                 <td>Eve</td>
                 <td>Jackson</td>
                 <td>94</td>
               </tr>
             </table>
           </div>
         </div>

         <div>
           <div className="enclosing-border inline" style={{
             width: "40%",
             "margin-left": "20px",
             "margin-right": "20px",
             "margin-bottom": "30px"
           }}>
             <table>
               <tr>
                 <th>Firstname</th>
                 <th>Lastname</th>
                 <th>Age</th>
               </tr>
               <tr>
                 <td>Jill</td>
                 <td>Smith</td>
                 <td>50</td>
               </tr>
               <tr>
                 <td>Eve</td>
                 <td>Jackson</td>
                 <td>94</td>
               </tr>
             </table>
           </div>

           <div className="enclosing-border inline" style={{
             width: "40%",
             "margin-left": "20px",
             "margin-right": "20px",
             "margin-bottom": "30px"
           }}>
             <table>
               <tr>
                 <th>Firstname</th>
                 <th>Lastname</th>
                 <th>Age</th>
               </tr>
               <tr>
                 <td>Jill</td>
                 <td>Smith</td>
                 <td>50</td>
               </tr>
               <tr>
                 <td>Eve</td>
                 <td>Jackson</td>
                 <td>94</td>
               </tr>
             </table>
           </div>
         </div>

         <div
           style={{
             "margin-left": "200px",
             "margin-right": "200px",
             "margin-bottom": "30px"
           }}
         >
           <MapContainer/>
         </div>
       </div>
     )
   }
}

export default DetailedChannelView;


// <div
//   style={{
//     width: "40%",
//     "margin-left": "20px",
//     "margin-right": "20px",
//     "margin-bottom": "30px"
//   }}
//   className="inline"
// ><ChannelLocation/></div>
//
// <div
//   style={{
//     width: "40%",
//     "margin-left": "20px",
//     "margin-right": "20px",
//     "margin-bottom": "30px"
//   }}
// className="inline"
// ><ChannelAttributes/></div>
//
// <div
//   style={{
//     width: "40%",
//     "margin-left": "20px",
//     "margin-right": "20px",
//     "margin-bottom": "30px"
//   }}
//   className="inline"
// ><ClimateInformation/></div>
//
// <div
//   style={{
//     width: "40%",
//     "margin-left": "20px",
//     "margin-right": "20px",
//     "margin-bottom": "30px"
//   }}
//   className="inline"
// ><ChannelReference/></div>
//
