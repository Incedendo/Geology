import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import FulcrumInputComponent from './FulcrumInputComponent';
import FulcrumResultComponent from './FulcrumResultComponent';
import AnalogComponent from './AnalogComponent';
import '../assets/scss/include.scss';

const FulcrumField = ( {...props} ) =>
(
    <FulcrumInputComponent key={props.title}
      { ...props }
    />
);

const FulcrumResults = ({...props}) => (
    <FulcrumResultComponent
      {...props}
    />
)

class FulcrumApproach extends Component {

  state = {
    post: [],
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
    measuringSystem: "metric",
    response: {
      slope: 0,
      meanSlopeVelocity: 0,
      channelBankfullDischarge: 0,
      totalBedloadDischarge: 0,
      totalBedloadVolumeSedimentDischarge: 0,
      tbdWithin10: 0,
      tbdWithin20: 0,
      totalBankfullSuspendedSedimentDischarge_VanRijn: 0,
      totalBankfullSuspendedSedimentDischarge_WrightParker: 0,
      totalCombinedSedimentVolumeDischargePerYear_VanRijn: 0,
      totalCombinedSedimentVolumeDischargePerYear_WrightParker:0,
      totalSuspendedSedimentVolumeDischargePerYear_VanRjin: 0,
      totalSuspendedSedimentVolumeDischargePerYear_WrightParker: 0,
    },
  };

  postFulcrum = () => {

    const JimGetUrl = 'https://geologymiddlewarerafter.azurewebsites.net/api/main/TestReturn';

    const JimPostUrl = 'https://geologymiddlewarerafter.azurewebsites.net/api/main/fulcrum';

    const getRequestData = {
      method: 'GET',
      Origin:'https://powerful-cliffs-45352.herokuapp.com',
    }

    const postRequestData = {
      method: 'POST',
      Origin:'https://powerful-cliffs-45352.herokuapp.com',
      mode: "cors",
      headers: {
        // 'Content-Type': 'text/plain',
        // Accept: 'text/plain',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // 'X-Content-Type-Options': 'nosniff',
      },
      body:
        JSON.stringify({
          "isFulcrum": true,
          "isMetric": false,
          "isRiverAnalogue" : true,
          "isTBD": false,
          "TBD": {
          "isCrossSection": true,
            "isWithin10": true,
            "isWithin20": true,
            "climate": "B",
            "drainage_low": null,
            "drainage_high": null,
            "riverSize_low": null,
            "riverSize_high": null,
          },
          "Fulcrum": {
            "avgBankfullDepth": 9,
            "bankfullWidth": 8,
            "hydraulicRadius": 7,
            "grainSize_d16": 6,
            "grainSize_d50": 5,
            "grainSize_d84": 4,
            "grainSize_d90": 3,
            "sedimentDensity": 2,
            "dimensionlessMultiplier": 1,
          },
        })
    }

    // fetch(JimGetUrl, getRequestData)
    // .then(results => {
    //   return results.json();
    // }).then(data => {
    //     console.log(data);
    //     console.log("Get success!!!");
    //   }
    // );

    fetch(JimPostUrl, postRequestData)
    // .then( results => results.json() )
    .then( response =>
      {
        if (response.status == 200 || response.status == 201) {
            return response.json();
        } else {
          console.log('Failure!', response.status);
        }
      }
    ).then( data => {
      //console.log(data);
      this.setState({ response: data });
    });
  }

  // renderResults = () => (
  //   <div>
  //     {FetchedResults.map(
  //       (fieldObject,index) =>
  //       <FulcrumResultComponent
  //         key={fieldObject.title}
  //         title = {fieldObject.title}
  //         returnedData = {fieldObject.returnedData}
  //       />
  //     )}
  //   </div>
  // )

  updateFieldValue = (e) => {

    const {name, value} = e.target;

    this.setState(() => ({
      [name]: value
    }))
  }

  setMeasureSystem = (e) => {
    if(e.target.value === "imperial"){
      this.setState({
        measuringSystem: "imperial"
      })
    }else{
      this.setState({
        measuringSystem: "metric"
      })
    }
  }

  handleSubmit = (e) => {
      e.preventDefault();

      const {
        state_AvgBkflDpt,
        state_BkflChanWdt,
        state_HydrolicRad,
        state_Dee16,
        state_Dee50,
        state_Dee84,
        state_Dee90,
        state_SedimentDensity,
        state_DMLMult,
      } = this.state;

      this.setState({
        submitted: true,
      });

      this.postFulcrum();
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
      submitted,
      measuringSystem,
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

    const FetchedResults = [
      {
        title: "Slope",
        returnedData: this.state.response.slope,
      },
      {
        title: "Mean Slope Velocity",
        returnedData: this.state.response.meanSlopeVelocity,
      },
      {
        title: "Channel Bankful Discharge",
        returnedData: this.state.response.channelBankfullDischarge,
      },
      {
        title: "Total BedLoad Discharge",
        returnedData: this.state.response.totalBedloadDischarge,
      },
      {
        title: "Total Bedload Volume Sediment Discharge",
        returnedData: this.state.response.totalBedloadVolumeSedimentDischarge,
      },
      {
        title: "TBD Within 10%",
        returnedData: this.state.response.tbdWithin10,
      },
      {
        title: "TBD Within 20%",
        returnedData: this.state.response.tbdWithin20,
      },
      {
        title: "Total Bankful Suspended Sediment Discharge (Van Rijn)",
        returnedData: this.state.response.totalBankfullSuspendedSedimentDischarge_VanRijn,
      },
      {
        title: "Total Bankful Suspended Sediment Discharge (Wright Parker)",
        returnedData: this.state.response.totalBankfullSuspendedSedimentDischarge_WrightParker,
      },
      {
        title: "Total Combined Sediment Volume Discharge Per Year (Van Rijn)",
        returnedData: this.state.response.totalCombinedSedimentVolumeDischargePerYear_VanRijn,
      },
      {
        title: "Total Combined Sediment Volume Discharge Per Year (Wright Parker)",
        returnedData: this.state.response.totalCombinedSedimentVolumeDischargePerYear_WrightParker,
      },
      {
        title: "Total Suspended Sediment Volume Discharge Per Year (Van Rijn)",
        returnedData: this.state.response.totalSuspendedSedimentVolumeDischargePerYear_VanRjin,
      },
      {
        title: "Total Suspended Sediment Volume Discharge Per Year (Wright Parker)",
        returnedData: this.state.response.totalSuspendedSedimentVolumeDischargePerYear_WrightParker,
      },
    ];

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>
          Fulcrum Approach
        </h1>
        {!this.state.submitted &&
          <div>
            <select id= "measuringSystem" onChange={this.setMeasureSystem}>
              <option value="metric">Metric</option>
              <option value="imperial">Imperial</option>
            </select>
            {fieldInputs.map(
              (fieldObject,index) => (<FulcrumField
                key={fieldObject.title}
                title = {fieldObject.title}
                name = {fieldObject.name} state = {fieldObject.state}
                update = {this.updateFieldValue}
              />)
            )}

            <button type="submit" onClick={this.handleSubmit} className="padding-grid margin-10">
              Submit
            </button>
          </div>
        }

        <AnalogComponent/>

        {this.state.submitted &&
          <div>
            Measuring System: {this.state.measuringSystem}
            {FetchedResults.map(
              (fieldObject,index) =>
              <FulcrumResultComponent
                key={fieldObject.title}
                title = {fieldObject.title}
                returnedData = {fieldObject.returnedData}
              />
            )}
          </div>
        }

      </form>
    )
  }
}

export default FulcrumApproach;
