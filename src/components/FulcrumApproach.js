import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FulcrumInputComponent from './FulcrumInputComponent';
import FulcrumResultComponent from './FulcrumResultComponent';
import AnalogComponent from './AnalogComponent';
import '../assets/scss/include.scss';

class FulcrumApproach extends Component {
  state = {
    AvgBkflDpt: 0,
    BkflChanWdt: 0,
    HydrolicRad: 0,
    Dee16: 0,
    Dee50: 0,
    Dee84: 0,
    Dee90: 0,
    SedimentDensity: 0,
    DMLMult: 0,
    submitted: false,
  };

  renderFulcrumField = (title, state, name) => {
    return(
      <FulcrumInputComponent
        key={title}
        fulcrumTitle={title}
        inputState={state}
        name={name}
        onChange={this.updateFieldValue}
      />
    );
  }

  renderResults = (title, data) => {
    return(
      <FulcrumResultComponent
        key={title}
        fulcrumTitle={title}
        returnedData={data}
      />
    );
  }

  updateFieldValue = (e) => {

    const {name, value} = e.target;
    console.log("this gets called: new value of " + name + " is: "+value);
    this.setState(() => ({
      [name]: value
    }))
  }

  handleSubmit = (e) => {
      e.preventDefault();

      const {
        AvgBkflDpt,
        BkflChanWdt,
        HydrolicRad,
        Dee16,
        Dee50,
        Dee84,
        Dee90,
        SedimentDensity,
        DMLMult,
      } = this.state;

      this.setState(() => ({
        status: `Submitted AvgBkflDpt: ${AvgBkflDpt}, BkflChanWdt: ${BkflChanWdt}, HydrolicRad: ${HydrolicRad}`,
        submitted: true,
      }))
  }

  render() {
    const {
      AvgBkflDpt,
      BkflChanWdt,
      HydrolicRad,
      Dee16,
      Dee50,
      Dee84,
      Dee90,
      SedimentDensity,
      DMLMult,
      status,
    } = this.state;

    const fieldInputs = [
      {
        title: "Average Bankfull  Channel  Depth,  Hbf (m)[dm=0.5(channel  story  thickness)]",
        state: AvgBkflDpt,
        name: "AvgBkflDpt",
      },
      {
        title: "Bankful Channel Width, Bbf (m)",
        state: BkflChanWdt,
        name: "BkflChanWdt",
      },
      {
        title: "Hydraulic  Radius (m),  R",
        state: HydrolicRad,
        name: "HydrolicRad",

      },
      {
        title: "D16 (mm)",
        state: Dee16,
        name: "Dee16",

      },
      {
        title: "D50 (mm)",
        state: Dee50,
        name: "Dee50",

      },
      {
        title: "D84 (mm)",
        state: Dee84,
        name: "Dee84",

      },
      {
        title: "D90 (mm)",
        state: Dee90,
        name: "Dee90",

      },
      {
        title: "Sediment Density (g/cm^3)",
        state: SedimentDensity,
        name: "SedimentDensity",

      },
      {
        title: "Dimensionless Multiplier,  b. [b=1/(bankfull  annual  proportion)]",
        state: DMLMult,
        name: "DMLMult",
      },
    ]

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>
          Fulcrum Approach
        </h1>
        {!this.state.submitted &&
          <div>
            {fieldInputs.map(
              (fieldObject,index) => this.renderFulcrumField(fieldObject.title, fieldObject.state, fieldObject.name)
            )}

            <button type="submit" onClick={this.handleSubmit} className="padding-grid margin-10">
              Submit
            </button>
          </div>
        }

        <AnalogComponent/>

        {/* {this.state.submitted &&
          <div>
            {fakeResults.map(
              (fieldObject,index) => this.renderResults(fieldObject.title, fieldObject.data )
            )}
          </div> */}
        }

        {status && <div>{status}</div>}
      </form>
    )
  }
}

export default FulcrumApproach;
