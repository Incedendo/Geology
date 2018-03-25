import React, { Component } from 'react';
//import other components

import { RiverChannelsTable } from "./Utils";
import TBDResult from './TBD/TBDResult';
import TBDAnalogFrame from './TBDAnalogFrame';
import '../assets/scss/include.scss';

class AnalogComponent extends Component{
  render(){
    return(
      <div>
        <TBDAnalogFrame
          componentTitle="Analog"
          displayedPresicion={false}
        />
      </div>
    )
  }
}

export default AnalogComponent;
