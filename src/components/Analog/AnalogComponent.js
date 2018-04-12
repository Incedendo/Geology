import React, { Component } from 'react';
//import other components
import TBDAnalogFrame from '../TBDAnalogFrame';
import '../../assets/scss/include.scss';

class AnalogComponent extends Component{
  render(){
    return(
      <div>
        <TBDAnalogFrame
          componentTitle="River Analogues"
          displayedPresicion={false}
          origin="/AnalogChannels"
        />
      </div>
    )
  }
}

export default AnalogComponent;
