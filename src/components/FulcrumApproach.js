import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router-dom';
import FulcrumInputComponent from './FulcrumInputComponent';
import FulcrumResultComponent from './FulcrumResultComponent';
import AnalogComponent from './AnalogComponent';
// import FulcrumAddedTBDComponent from './FulcrumAddedTBDComponent';
import TBDApproach from './TBDApproach';
import '../assets/scss/include.scss';

//import Select package
import Select from 'react-select';
import 'react-select/dist/react-select.css';

//import RadioButton package
import { RadioGroup, RadioButton } from 'react-radio-buttons';

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

    valid_AvgBkflDpt: false,
    valid_BkflChanWdt: false,
    valid_HydrolicRad: false,
    valid_Dee16: false,
    valid_Dee50: false,
    valid_Dee84: false,
    valid_Dee90: false,
    valid_SedimentDensity: false,
    valid_DMLMult: false,

    submitted: false,
    submitClicked: false,
    inputs_validated: true,
    isRiverAnalogue: false,
    displayedResult: false,

    TBDMode: "",

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
          "isMetric": this.state.isMetric,
          "isRiverAnalogue" : this.state.isRiverAnalogue,
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
            "avgBankfullDepth": this.state.AvgBkflDpt,
            "bankfullWidth": this.state.BkflChanWdt,
            "hydraulicRadius": this.state.HydrolicRad,
            "grainSize_d16": this.state.Dee16,
            "grainSize_d50": this.state.Dee50,
            "grainSize_d84": this.state.Dee84,
            "grainSize_d90": this.state.Dee90,
            "sedimentDensity": this.state.SedimentDensity,
            "dimensionlessMultiplier": this.state.DMLMult,
          },
        })
    }

    fetch(JimPostUrl, postRequestData)
    .then( response => {
        if (response.status == 200 || response.status == 201) {
            return response.json();
        } else {
          console.log('Failure!', response.status);
        }
      }
    ).then( data => {
      console.log(data.totalSuspendedSedimentVolumeDischargedPerYear_VanRijn);
      this.setState({
        response: data,
      });
    });
  }

  updateFieldValue = (e) => {

    const {name, value} = e.target;

    this.setState(() => ({
      [name]: value
    }));
  }

  //toggle the state to display Form OR Result
  toggleSubmitted = () => {
    this.setState( (prevState) => ({submitted: !prevState.submitted}) );
  }

  //Switches the isMetric state according to the dropdown option chosen on the Measuing System
  // setMeasureSystem = (value) => {
  //   console.log(value);
  //   if(value === "imperial"){
  //     this.setState({
  //       isMetric: false,
  //       measuringSystem: "Imperial",
  //     })
  //   }else{
  //     this.setState({
  //       isMetric: true,
  //       measuringSystem: "Metric",
  //     })
  //   }
  // }

  // Switches the isAnalog state whenever the checkbox is clicked/unclicked
  toggleIsAnalog = () => {
    this.setState( (prevState) => ({isAnalog: !prevState.isAnalog}) )
  }

  //for the added TBD components
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

    console.log("set selected TBD modes");
  }

  validateInputs() {
      if(this.state.valid_AvgBkflDpt &&
          this.state.valid_BkflChanWdt &&
          this.state.valid_HydrolicRad &&
          this.state.valid_Dee16 &&
          this.state.valid_Dee50 &&
          this.state.valid_Dee84 &&
          this.state.valid_Dee90 &&
          this.state.valid_SedimentDensity &&
          this.state.valid_DMLMult){
            console.log("ALL true!!!");
            return true;
      }else{
        console.log("...got errors");
        return false;
      }
  }

  // This method checks if the input by user is a valid number
  validateInputFulcrum = (e) => {
    const {name, value} = e.target;
    const test =  "valid_"+name;
    console.log(test);

    //if the inputs is a valid number
    if(!isNaN(value)){
      if(Number(value) !== 0){
        this.setState(() => ({
          [name]: value,
          [test]: true,
        }));
        console.log("checked for " + name);
      }
    }else{
      console.log("not a number...");
      this.setState(() => ({
        [test]: false,
      }))
    }
  }

  //set the isSubmitted state to true
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

      //make sure the form's inputs are validated before proceed to send the post request to the server.
      if(this.validateInputs()){
        this.setState({
          submitted: true,
          submitClicked: true,
          inputs_validated: true,
        });
        this.postFulcrum();
        console.log(this.state.submitted);
      }else{
        this.setState({
          submitClicked: true,
          inputs_validated: false,
        });
        console.log("unable to post bc inputs are invalid...");

      }
  }

  printResponse = () => {
    console.log(this.state.response);
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

      valid_AvgBkflDpt,
      valid_BkflChanWdt,
      valid_HydrolicRad,
      valid_Dee16,
      valid_Dee50,
      valid_Dee84,
      valid_Dee90,
      valid_SedimentDensity,
      valid_DMLMult,

    } = this.state;

    const fieldInputs = [
      {
        title: "Average Bankfull  Channel  Depth,  Hbf (m)[dm=0.5(channel  story  thickness)]",
        state: AvgBkflDpt,
        name: "AvgBkflDpt",
        isValid: valid_AvgBkflDpt,
      },
      {
        title: "Bankful Channel Width, Bbf (m)",
        state: BkflChanWdt,
        name: "BkflChanWdt",
        isValid: valid_BkflChanWdt,
      },
      {
        title: "Hydraulic  Radius (m),  R",
        state: HydrolicRad,
        name: "HydrolicRad",
        isValid: valid_HydrolicRad,
      },
      {
        title: "D16 (mm)",
        state: Dee16,
        name: "Dee16",
        isValid: valid_Dee16,
      },
      {
        title: "D50 (mm)",
        state: Dee50,
        name: "Dee50",
        isValid: valid_Dee50,
      },
      {
        title: "D84 (mm)",
        state: Dee84,
        name: "Dee84",
        isValid: valid_Dee84,
      },
      {
        title: "D90 (mm)",
        state: Dee90,
        name: "Dee90",
        isValid: valid_Dee90,
      },
      {
        title: "Sediment Density (g/cm^3)",
        state: SedimentDensity,
        name: "SedimentDensity",
        isValid: valid_SedimentDensity,
      },
      {
        title: "Dimensionless Multiplier,  b. [b=1/(bankfull  annual  proportion)]",
        state: DMLMult,
        name: "DMLMult",
        isValid: valid_DMLMult,
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
      }
    ];

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>
          Fulcrum Approach
        </h1>

        {!this.state.submitted &&


          <div>
            {/* <Select
              value={this.state.measuringSystem && this.state.measuringSystem.value}
              onChange={this.setMeasureSystem}
              autoFocus
              autoBlur
              searchable
              options={[
                { value: 'metric', label: 'Metric' },
                { value: 'imperial', label: 'Imperial' },
              ]}
            /> */}

            <div className="">
               {!this.state.submitted
                 ? <Link to="/home">Back</Link>
                 : <button onClick={this.toggleDisplayedResult}>Return</button>
               }
            </div>

            {fieldInputs.map(
              (fieldObject,index) => (
                <FulcrumInputComponent
                  key={fieldObject.title}
                  title = {fieldObject.title}
                  name = {fieldObject.name}
                  state = {fieldObject.state}
                  isValid = {fieldObject.isValid}
                  submitted = {this.state.submitClicked}
                  update = {this.updateFieldValue}
                  validate = {this.validateInputFulcrum}
                />
              )
            )}

            <div>

              {
                !this.state.defaultTBD && !this.state.customizedTBD &&

                <div>

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

            {!this.state.inputs_validated &&
            <div>
              Please check the inputs and make sure you have entered all correct values!
            </div>}

            {/* SUBMIT BUTTON */}
            <button type="submit" onClick={this.handleSubmit} className="padding-grid margin-10">
              Submit
            </button>
          </div>
        }

        {this.state.submitted &&
          <div>
            <button onClick={this.printResponse}>
              DISPLAY RESPONSE
            </button>

            <div className="">
                 <button onClick={this.toggleSubmitted}>Return</button>
               }
            </div>


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
