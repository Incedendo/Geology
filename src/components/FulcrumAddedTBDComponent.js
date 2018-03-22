import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import TBDApproach from './TBDApproach';
//import RadioButton package
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import '../assets/scss/include.scss';

class FulcrumAddedTBDComponent extends Component{

  state = {
    TBDMode: "",
    selectedClimate: "FirstOrder",
    selectedRiverSize: "RiverDepth",
    selectedPrecision: "10%",
  }


  resetOptions = () => {
    this.setState({
      defaultTBD: false,
      customizedTBD: false,
      tenPercentTBD: false,
      twentyPercentTBD: false,
    })
  }

  setSelectedTBDMode = (value) => {
    if(value === "default"){
      this.setState({
        TBDMode: "Default",
      });
    }else{
      this.setState({
        TBDMode: "Customized",
      });
    }
  }

  render(){
    return(
      <div>

        {
          !this.state.defaultTBD && !this.state.customizedTBD &&

          <div>
            {/* <input
              type="radio"
              name="TBDMode"
              onChange={this.setSelectedTBDMode}
              value="default"
            /> Default TBD [default value]

            <input
              type="radio"
              name="TBDMode" onChange={this.setSelectedTBDMode}
              value="customized"
            /> Customized TDB */}

            <RadioGroup
              onChange={ this.setSelectedTBDMode } horizontal
            >
              <RadioButton
                value="default"
                pointColor="green">
                Default TBD [default value]
              </RadioButton>
              <RadioButton
                value="customized"
                pointColor="green">
                Customized TDB
              </RadioButton>
            </RadioGroup>
          </div>
        }

        {this.state.TBDMode === "Default" &&
          <div>
            TBD will be calculated using Default value of [...]
          </div>
        }

        {this.state.TBDMode === "Customized" &&
          <TBDApproach
            submitNotNeeded={true}
          />
        }

      </div>
    )
  }
}


export default FulcrumAddedTBDComponent;
