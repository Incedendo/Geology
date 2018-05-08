import React, { Component } from 'react';
//import other components
import TBDAnalogFrame from '../TBDAnalogFrame';
import '../../assets/scss/include.scss';

class TBDApproach extends Component{
  render(){
    return(
      <div>
        <TBDAnalogFrame
          componentTitle="TBD Approach"
          displayedPresicion={true}
          origin="/TBDApproach"
        />
      </div>
    )
  }
}

export default TBDApproach;
