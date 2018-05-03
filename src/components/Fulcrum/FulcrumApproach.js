import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FulcrumInputComponent from './FulcrumInputComponent';
import FulcrumResultComponent from './FulcrumResultComponent';
import TBDApproach from '../TBD/TBDApproach';
import RiverChannelsTable  from "../TBD/RiverChannelsTable";

//import Select package
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import BaseSupSub from 'react-basesupsub';

//import RadioButton package
import { RadioGroup, RadioButton } from 'react-radio-buttons';

//import TBD Components
import { ClimateOrders, DrainageArea, RiverSize, TBDPrecision } from '../TBD/TBDComponents';

import '../../assets/scss/include.scss';
//import other components

class FulcrumApproach extends Component {

  state = {
    post: [],

    AvgBkflDpt: 2.31,
    BkflChanWdt: 73,
    HydrolicRad: 2.23,
    Dee16: 0.18,
    Dee50: 0.19,
    Dee84: 0.38,
    Dee90: 0.39,
    SedimentDensity: 2.65,
    DMLMult: 2,

    //booleans to for error checking of inputs
    valid_AvgBkflDpt: true,
    valid_BkflChanWdt: true,
    valid_HydrolicRad: true,
    valid_Dee16: true,
    valid_Dee50: true,
    valid_Dee84: true,
    valid_Dee90: true,
    valid_SedimentDensity: true,
    valid_DMLMult: true,

    submitted: false, //true if all inputs are validated to perform a successful API call
    submitClicked: false,
    loading: true,
    inputs_validated: true,
    errorMessage: '',

    TBDMode: "", // "Default" or "Customized"
    //Customized TBD parameters:
        climateFromDropdown: "",
        selectedClimate: "",
        enabledFirstOrderDropdown: false,
        enabledKoppenDropdown: false,

        // 6 inputs for the text fields:
        drainage_low: null,
        drainage_high: null,

        selectedRiverSize: "", // set when river size radio buttons are clicked
        isCrossSection: false,
        riverLow: null,
        riverHigh: null,
        riverWidth: null,
        toggleRiverWidthAttr: false,
        calculatedDepthUsingWidth: false,

        selectedPrecision: "", // set when Precision Radio Buttons are clicked
        isWithin10: false,
        isWithin20: false,

    //an object to store the calculated esults after submit returns a JSON object.
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
      totalSuspendedSedimentVolumeDischargedPerYear_VanRijn: 0,
      totalSuspendedSedimentVolumeDischargedPerYear_WrightParker: 0,
      data: [],
    },

    //Extra fields for TBD response:
    tableData: [],
    tbdWithin10: 0,
    tbdWithin20: 0,
  };

  // send a POST request to the Middelware with all the parameters of the Fulcrum (AND TBD) approach.
  // Update stateDisplay response correspondingly
  postFulcrum = () => {
    console.log("Printing default river High: '",this.state.riverHigh + "'");

    let JimPostUrl = '';
    let postReqBody = {};
    const FulcrumDataObject = {
      "AvgBankfullDepth": this.state.AvgBkflDpt,
      "BankfullWidth": this.state.BkflChanWdt,
      "HydraulicRadius": this.state.HydrolicRad,
      "GrainSizeD16": this.state.Dee16,
      "GrainSizeD50": this.state.Dee50,
      "GrainSizeD84": this.state.Dee84,
      "GrainSizeD90": this.state.Dee90,
      "SedimentDensity": this.state.SedimentDensity,
      "DimensionlessMultiplier": this.state.DMLMult,
    };

    if(this.state.TBDMode === "Default"){
      JimPostUrl = 'https://aae79tnck1.execute-api.us-east-1.amazonaws.com/Prod/api/main/Fulcrum';
      postReqBody = JSON.stringify({
        "IsFulcrum": true,
        "IsMetric": false,
        "IsRiverAnalogue" : false,
        "IsTBD": true,
        "TBD": {
          //climate:
            "Climate": 'A',

          //drainage:
            "DrainageLow": 0,
            "DrainageHigh": 0,

          //river size:
              "IsCrossSection": false,
              "RiverSizeLow": 0,
              "RiverSizeHigh": 0,

          //precision:
            "IsWithin10": true,
            "IsWithin20": false,
        },
        "Fulcrum": FulcrumDataObject
      });
    }else if(this.state.TBDMode === "Customized"){
      JimPostUrl = 'https://aae79tnck1.execute-api.us-east-1.amazonaws.com/Prod/api/main/Comb';
      postReqBody = JSON.stringify({
        "IsFulcrum": true,
        "IsMetric": false,
        "IsRiverAnalogue" : false,
        "IsTBD": true,
        "TBD": {
          //climate:
            "Climate": this.state.climateFromDropdown.value,

          //drainage:
            "DrainageLow": this.state.drainage_low,
            "DrainageHigh": this.state.drainage_high,

          //river size:
              "IsCrossSection": this.state.isCrossSection,
              "RiverSizeLow": this.state.riverLow,
              "RiverSizeHigh": this.state.riverHigh,

          //precision:
            "IsWithin10": this.state.isWithin10,
            "IsWithin20": this.state.isWithin20,
        },
        "Fulcrum": FulcrumDataObject
      });
      console.log("customzed TBD");
    }

    const postRequestData = {
      method: 'POST',
      Origin:'http://geology-ui.surge.sh',
      mode: "cors",
      headers: {
        // 'Content-Type': 'text/plain',
        // Accept: 'text/plain',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // 'X-Content-Type-Options': 'nosniff',
      },
      body: postReqBody
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
      console.log(data);
      if(this.state.TBDMode === "Default"){
        this.setState({
          response: data
        });
      }else{
        this.setState({
          response: data,
          tableData: data.streams,
          tbdWithin10: data.tbdWithin10,
          tbdWithin20: data.tbdWithin20,
          loading: false,
        });
      }

      console.log("post successful!!!");
    }).catch(err => {
      throw new Error(err)
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

  // Switches the isAnalog state whenever the checkbox is clicked/unclicked
  toggleIsAnalog = () => {
    this.setState( (prevState) => ({isAnalog: !prevState.isAnalog}) )
  }

  //for the added TBD components
  setSelectedTBDMode = (value) => {
    console.log("tbd val: "+ value);
    if(value === "default"){
      this.setState({
        TBDMode: "Default",
        submitClicked: false,
      });
    }else{
      this.setState({
        TBDMode: "Customized",
        submitClicked: false,
      });
    }

    console.log("selected TBD mode: " + this.state.TBDMode);
  }

  validateAllInputsFulcrum() {
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
    const errorMessage = "errorMessage";
    console.log(test);

    //if the inputs is a valid number
    if(!isNaN(value)){
      if(Number(value) > 0){
        this.setState(() => ({
          [name]: value,
          [test]: true,
        }));
        console.log("checked for " + name);
      }else{
        console.log("not a number...");
        this.setState(() => ({
          [name]: "(Must enter a positive number)",
          [test]: false,
          [errorMessage]: "All Fulcrum inputs must be positive numbers.\n",
        }))
      }
    }else{
      console.log("not a number...");
      this.setState(() => ({
        [test]: false,
      }))
    }
  }

  printState = () => {
    console.log(this.state);
  }

  //set the isSubmitted state to true
  handleSubmit = (e) => {
      e.preventDefault();

      // this.printState();

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
      if(this.validateAllInputsFulcrum()){
        console.log("Fulcrum validated, TBD mode: " + this.state.TBDMode);
        if(this.state.TBDMode === "Default"){
            console.log("--- default TBD ---");
            this.setState({
              submitted: true,
              submitClicked: true,
              inputs_validated: true,
            });
            this.postFulcrum();
            this.state.submitted && console.log("Done Default: "+this.state.submitted);
        }else if(this.state.TBDMode === "Customized"){
            if(this.validateTBDInputs()){
              console.log("--- customized tbd ---");
              //do TBD Component Validation
              this.setState({
                submitted: true,
                submitClicked: true,
                inputs_validated: true,
              });
              this.postFulcrum();
              this.state.submitted && console.log("Done Customized: "+ this.state.submitted);
            }
        }else{
          this.setState({
            submitClicked: true,
            inputs_validated: false,
            errorMessage: "Please choose a TBD option\n",
          });
          console.log("unable to post bc user did not choose a TBD option...");
        }
      }else{
        this.setState({
          submitClicked: true,
          inputs_validated: false,
        });
        console.log("unable to post bc inputs are invalid...");
      }
  }

  printResponse = () => {
    console.log(this.state.response.totalSuspendedSedimentVolumeDischargePerYear_WrightParker);
    console.log(this.state.response.totalSuspendedSedimentVolumeDischargePerYear_VanRjin);
    console.log(this.state.response.totalCombinedSedimentVolumeDischargePerYear_WrightParker);
  }


  //----------------------------------------------------------------------
  //
  //           *** TBD COMPONENTS Subroutines for Customzed TBD ***
  //
  //----------------------------------------------------------------------

  //onChange function for Climate Radio Button Group
  setClimateSelectedOption = (value) => {
    this.setState({
      selectedClimate: value,
    })

    if(value === "FirstOrder"){
      //when user chooses First Order option
      this.setState({
        enabledFirstOrderDropdown: true, //disable the radio for first order
        enabledKoppenDropdown: false,
      })
    }else{
      //when user chooses Koppen options
      this.setState({
        enabledKoppenDropdown: true,
        enabledFirstOrderDropdown: false,
      })
    }
  }

  //Update the chosen Value of the Menu Dropdown
  handleClimateSelectionChangeDropDown = (value) => {
    this.setState({
      climateFromDropdown: value,
    })
    console.log(this.state.climateFromDropdown.value);
  }

  //A function that set the max/min values for either the drainage_low/ drainage_high, crossSectionalArea_Min/ crossSectionalArea_Max, riverDepth_Min/ riverDepth_Max
  setRangeValues = (e) => {
    const {name, value}  = e.target;
    //Make sure the textfield is not empty
    if(value.length !== 0){
      //check if the value is a number
      if(!isNaN(value)){
        //check for positive number:
        if(value < 0){
          this.setState(() => ({
            [name]: "(positive number only)",
          }));
        }else{
          this.setState(() => ({
            [name]: value,
          }));
          console.log("set "+ name + " to " + value);
        }
      }else{
        console.log(name + "is not a valid number");
        this.setState(() => ({
          [name]: "(positive number only)",
        }));
      }
    }else{
      console.log(name + "is empty");
      this.setState({
        [name]: "",
      })
    }
  }

  //Save Text Field's input to state on OnChange
  updateFieldValue = (e) => {
    const {name, value} = e.target;
    this.setState(() => ({
      [name]: value
    }));
  }

  //onChange function for River Size Radio Button Group
  setRiverSizeSelectedOption = (value) => {
    this.setState({
      selectedRiverSize: value,
    });

    if(value === "RiverDepth"){
      this.setState({
        riverHigh: 48, //river max depth
        isCrossSection: false,
      })
    }else{
      this.setState({
        riverHigh: 9780, //river max cross-sectional area
        isCrossSection: true,
      })
    }
    console.log(this.state.selectedRiverSize);
  }

  getBaseLog = (x, y) => {
    return Math.log(y) / Math.log(x);
  }

  //calculate River Depth based on the provided River Width using Scientific Formula
  deriveRiverDepthFromWidth = () => {
    let depth = 0;
    let width = this.state.riverWidth;
    width = width / 8.8;
    depth = this.getBaseLog(1.82, width);
    console.log("printing depth: ", depth);
    this.setState({
      riverHigh: depth
    });
  }

  setRiverWidth = (e) => {
    //const {name, value}  = e.target;
    this.setRangeValues(e);
    this.deriveRiverDepthFromWidth();
  }

  toggleRiverWidthAttr = () => {
    this.setState( (prevState) => ({calculatedDepthUsingWidth: !prevState.calculatedDepthUsingWidth}) );

    console.log("calculated depth using width:",this.state.calculatedDepthUsingWidth);
  }

  //onChange function for Precision Radio Button Group
  setPrecisionSelectedOption = (value) => {
    this.setState({
      selectedPrecision: value,
    })
    if(value === "10%"){
      this.setState({
        isWithin10: true,
        isWithin20: false,
      })
    }else{
      this.setState({
        isWithin10: false,
        isWithin20: true,
      })
    }
    console.log(this.state.selectedPrecision);
  }

  // validate if the user enter positive numbers for min and max Cross Sectional Area
  validateClimateInputs = () => {
    if(this.state.selectedClimate !== ""){
        if(this.state.climateFromDropdown !== ""){
            console.log("validated selectedClimate: ", this.state.climateFromDropdown.value);
            return true;
        }else{
            console.log("did not choose an item in the dropdown: ");
            this.setState({
              errorMessage: "Please Select a Climate Type\n"
            })
            return false;
        }
    }else{
      this.setState({
        errorMessage: "Please Select a Climate Order \n"
      })
      console.log("fail to validate selectedClimate: radio box NOT selected");
      return false;
    }
  }

  // validate if the user enter positive numbers for min and max drainage area
  validateDrainageInputs = () => {
    if(this.state.drainage_low > 0 &&  this.state.drainage_high > 0){
            console.log("successfully Validate drainage Inputs: Low: "+ this.state.drainage_low + " , High:  "+ this.state.drainage_high);
            return true;
    }else{
            console.log("fail to validate drainage inputs");
            return false;
    }
  }

  validateRiverInputs = () => {
    if(this.state.selectedRiverSize !== ""){
      if(this.state.riverLow > 0 && this.state.riverHigh > 0){
              console.log("validated River Size: Low: "+ this.state.riverLow + " , High:  "+ this.state.riverHigh);
              return true;
      }else{
              console.log("fail to validate River Size: 1 of the Depth text field is empty");
              return false;
      }
    }else{
      console.log("failed to validate River Inputs: radio box NOT selected");
      return false;
    }
  }

  // validate if the user enter positive numbers for min and max Cross Sectional Area
  validatePrecisionInputs = () => {
    if(this.state.selectedPrecision !== ""){
            console.log("validated Precision: " + this.state.selectedPrecision);
            return true;
    }else{
            this.setState({
              errorMessage: "Please select Precision Radio Box\n"
            })
            console.log("fail to validate Precision: radio box NOT selected");
            return false;
    }
  }

  //Encapsulating Validate inputs that check for all fields
  validateTBDInputs = () => {
    // check if users choose ALL 3 big Radio Buttons
    if(this.validateClimateInputs() &&
      this.validatePrecisionInputs()
    ){
          console.log("validate ALL inputs");
          return true;
    }else{
          console.log("validateInputs() failed");
          return false;
    }
  }

  //----------------------------------------------------------------------
  //
  //                       *** Render Subroutines ***
  //
  //----------------------------------------------------------------------

  renderHeader = () => (
    <div className="header">
      <div className="back-button-div-fulcrum">
         {!this.state.submitted &&
           <Link to="/"
           className="back-button-link">
               Back
            </Link>
         }
      </div>

      <h1>
        Fulcrum Theory Approach Sediment Flux Estimates
      </h1>
    </div>

  )

  renderSubmitBtn = () => (
    <div>
      <button
        onClick={this.clearAll}
        className="back-btn-result">
        Clear
      </button>

      {/* SUBMIT BUTTON */}
      <button type="submit" onClick={this.handleSubmit} className="back-btn-result">
        Submit

      </button>
    </div>
  )

  //render the customized TBD Approach within Fulcrum
  renderTBD = (TBDMode, ...rest) => (
    <div className={TBDMode ==="" ? "enclosing-border" : " enclosing-border light-purple-background"}>
      <div className="">
        <div className="TBD-div">
          <div className="">
            <RadioGroup
              onChange={ this.setSelectedTBDMode } horizontal
            >
              <RadioButton
                value="default"
                rootColor={TBDMode ==="" ? "#4B1979" : "grey" }
                pointColor="white"//"#23CE2B"
                iconInnerSize="0px"
              >
                <div>
                  <div
                    style={{
                      'margin-right': '5px',
                      display: 'inline-block'
                    }}
                  >
                    Default
                  </div>
                  <BaseSupSub style={{ display: 'inline-block' }} base="t" sub="bd" />
                  <div
                    style={{
                      'margin-left': '5px',
                      display: 'inline-block'
                    }}
                  >
                      [default value]
                  </div>
                </div>
              </RadioButton>
              <RadioButton
                value="customized"
                rootColor={TBDMode ==="" ? "#4B1979" : "grey" }
                pointColor="white"//"#23CE2B"
                iconInnerSize="0px"
              >
                <div>
                  <div
                    style={{
                      'margin-right': '5px',
                      display: 'inline-block'
                    }}
                  >
                    Customized
                  </div>
                  <BaseSupSub style={{ display: 'inline-block' }} base="t" sub="bd" />
                </div>

              </RadioButton>
            </RadioGroup>
          </div>
        </div>

        {TBDMode === "Default" &&
          <div className="white-txt">
            <BaseSupSub style={{ display: 'inline-block' }} base=" t" sub="bd" /> will be calculated using Default value of 6.5
          </div>
        }

        {TBDMode === "Customized" &&
          this.renderTBDComponents(...rest)
        }

      </div>
    </div>
  )

  // render Climate, Drainage Area, River Size and Precision Components
  renderTBDComponents = (...rest) => {
    // const {
    //   submitClicked,
    //   selectedClimate, enabledFirstOrderDropdown, enabledKoppenDropdown, climateFromDropdown,
    //   drainage_low, drainage_high,
    //   riverLow, riverHigh, selectedRiverSize, toggleRiverWidthAttr, calculatedDepthUsingWidth, riverWidth,
    //   selectedPrecision
    // } = rest;

    return(
      <div className="purple-background">
        <ClimateOrders
          submitClicked = {this.state.submitClicked}
          selectedClimate = {this.state.selectedClimate}
          enabledFirstOrderDropdown = {this.state.enabledFirstOrderDropdown}
          enabledKoppenDropdown = {this.state.enabledKoppenDropdown}
          climateFromDropdown = {this.state.climateFromDropdown}
          setClimateSelectedOption = {this.setClimateSelectedOption}
          handleClimateSelectionChangeDropDown = {this.handleClimateSelectionChangeDropDown}
        />

        <DrainageArea
          submitClicked = {this.state.submitClicked}
          drainage_low = {this.state.drainage_low}
          drainage_high = {this.state.drainage_high}
          setRangeValues={this.setRangeValues}
          updateFieldValue={this.updateFieldValue}
        />

        <RiverSize
          submitClicked = {this.state.submitClicked}
          riverMin = {this.state.riverLow}
          riverMax = {this.state.riverHigh}
          selectedRiverSize = {this.state.selectedRiverSize}
          setRiverSizeSelectedOption= {this.setRiverSizeSelectedOption}
          setRangeValues = {this.setRangeValues}
          updateFieldValue = {this.updateFieldValue}
          toggleRiverWidthAttr = {this.toggleRiverWidthAttr}
          calculatedDepthUsingWidth = {this.state.calculatedDepthUsingWidth}
          riverWidth = {this.state.riverWidth}
          setRiverWidth = {this.setRiverWidth}
        />

        <TBDPrecision
          submitClicked = {this.state.submitClicked}
          selectedPrecision = {this.state.selectedPrecision}
          setPrecisionSelectedOption= {this.setPrecisionSelectedOption}
        />
      </div>
    )
  }

  renderRiverChannelTable = (loading, TBDMode, tableData, tbdWithin10, tbdWithin20) => (
    <div>
      {TBDMode==="Customized" && loading &&
        <div>
          Please wait...
        </div>
      }

      {TBDMode==="Customized" && !loading &&
        <div>
          <RiverChannelsTable
            data={tableData}
            tbdWithin10={tbdWithin10}
            tbdWithin20={tbdWithin20}
            origin="/FulcrumApproach"
          />
        </div>
      }

      {TBDMode === "Default" &&
      <div className="tbd-value-table">
        <table>
          <tr>
            <th>
              <div
                style={{
                  'margin-right': '5px',
                  display: 'inline-block'
                }}
              >
                  Year Averaged Bankfull Flow Duration,
              </div>
              <BaseSupSub style={{ display: 'inline-block' }} base="t" sub="bd" />
              <div
                style={{
                  'margin-left': '5px',
                  display: 'inline-block'
                }}
              >
                  (days)
              </div>
            </th>
          </tr>
          <tr>
            <td>6.5</td>
          </tr>
        </table>
      </div>
      }
    </div>
  )


  clearAll = () => {
    this.setState({
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

      //booleans to for error checking of inputs
      valid_AvgBkflDpt: true,
      valid_BkflChanWdt: true,
      valid_HydrolicRad: true,
      valid_Dee16: true,
      valid_Dee50: true,
      valid_Dee84: true,
      valid_Dee90: true,
      valid_SedimentDensity: true,
      valid_DMLMult: true,

      submitted: false, //true if all inputs are validated to perform a successful API call
      submitClicked: false,
      loading: true,
      inputs_validated: true,
      errorMessage: '',

      TBDMode: "", // "Default" or "Customized"
      //Customized TBD parameters:
          climateFromDropdown: "",
          selectedClimate: "",
          enabledFirstOrderDropdown: false,
          enabledKoppenDropdown: false,

          // 6 inputs for the text fields:
          drainage_low: null,
          drainage_high: null,

          selectedRiverSize: "", // set when river size radio buttons are clicked
          isCrossSection: false,
          riverLow: null,
          riverHigh: null,
          riverWidth: null,
          toggleRiverWidthAttr: false,
          calculatedDepthUsingWidth: false,

          selectedPrecision: "", // set when Precision Radio Buttons are clicked
          isWithin10: false,
          isWithin20: false,

      //an object to store the calculated esults after submit returns a JSON object.
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
        totalSuspendedSedimentVolumeDischargedPerYear_VanRijn: 0,
        totalSuspendedSedimentVolumeDischargedPerYear_WrightParker: 0,
        data: [],
      },

      //Extra fields for TBD response:
      tableData: [],
      tbdWithin10: 0,
      tbdWithin20: 0,
    })
  }


  //----------------------------------------------------------------------
  //
  //                              Main
  //
  //----------------------------------------------------------------------

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

      submitted,
      submitClicked,
      loading,
      inputs_validated,
      errorMessage,

      TBDMode,

      climateFromDropdown, selectedClimate, enabledFirstOrderDropdown, enabledKoppenDropdown,

      drainage_low, drainage_high,

      selectedRiverSize,riverLow, riverHigh, riverWidth, toggleRiverWidthAttr, calculatedDepthUsingWidth,

      selectedPrecision,

      response,

      tableData,
      tbdWithin10,
      tbdWithin20,

    } = this.state;


    // An array of all Fulcrum inputs to be iterated over in the main render() when loading FulcrumInputComponent for Showing the Form initially

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

    // An array that stores the results of Fulcrum Approach. Only to be call in the main render() to parse results after Submit() succesfully updates all state values.

    const FetchedResults = [
      {
        title: "Slope, S",
        returnedData: response.slope,
      },
      {
        title: "Mean Flow Velocity (m/s)",

        returnedData: response.meanSlopeVelocity,
      },
      {
        title: "Channel Bankful Discharge, Qbf ((m^3)/s)",
        returnedData: response.channelBankfullDischarge,
      },
      {
        title: "Total BedLoad Discharge, Qtbf ((m^3)/s)",
        returnedData: response.totalBedloadDischarge,
      },
      {
        title: "Total Bedload Sediment Volume Discharge, Q ((m^3)/yr)",
        returnedData: response.totalBedloadVolumeSedimentDischarge,
      },
      {
        title: "Average Bankfull Days Within 10%",
        returnedData: response.tbdWithin10,
      },
      {
        title: "Average Bankfull Days Within 20%",
        returnedData: response.tbdWithin20,
      },
      {
        title: "Total Bankfull Suspended Sediment Discharge (Van Rijn), Qss (m^3/s)",
        returnedData: response.totalBankfullSuspendedSedimentDischarge_VanRijn,
      },
      {
        title: "Total Bankfull Suspended Sediment Discharge (Wright Parker), Qss (m^3/s)",
        returnedData: response.totalBankfullSuspendedSedimentDischarge_WrightParker,
      },
      {
        title: "Total Combined Sediment Volume Discharge Per Year (Van Rijn), Q (m^3/yr)",
        returnedData: response.totalCombinedSedimentVolumeDischargePerYear_VanRijn,
      },
      {
        title: "Total Combined Sediment Volume Discharge Per Year (Wright Parker), Q (m^3/yr)",
        returnedData: response.totalCombinedSedimentVolumeDischargePerYear_WrightParker,
      },
      {
        title: "Total Suspended Sediment Volume Discharge Per Year (Van Rijn), Qmas (m^3/yr)",
        returnedData: response.totalSuspendedSedimentVolumeDischargedPerYear_VanRijn,
      },
      {
        title: "Total Suspended Sediment Volume Discharge Per Year (Wright Parker), Qmas (m^3/yr)",
        returnedData: response.totalSuspendedSedimentVolumeDischargedPerYear_WrightParker,
      }
    ];

    //const { submitted } = this.state.submitted;

    return (
      <form onSubmit={this.handleSubmit} className="form" style={{
        'background-color': '#DBDBD9'
      }}>

        {/*
          this.state.submitted controls the logic of this class, which shows 2 different div depending on the state of submitted or not.

          Initially show the form with empty fields for User to enter inputs.
        */}

        {!submitted &&
          <div >
            {this.renderHeader()}

            <div className="enclosing-border">
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
            </div>

            {this.renderTBD(TBDMode, submitClicked,
              selectedClimate, enabledFirstOrderDropdown, enabledKoppenDropdown, climateFromDropdown,
              drainage_low, drainage_high,
              riverLow, riverHigh, selectedRiverSize, toggleRiverWidthAttr, calculatedDepthUsingWidth, riverWidth,
              selectedPrecision
            )}

            {/*
              Display a message to notify user if form inputs are incorrect
             */}

            {!inputs_validated &&
              <div className="error-div-fulcrum">
                Please check the inputs and make sure you have entered all correct values!
                <div>
                  {errorMessage}
                </div>
              </div>
            }

            {this.renderSubmitBtn()}

          </div>
        }

        {/*
          Once the form is submitted, display the results
         */}

        {submitted &&
          <div>
            <div className="header">
              <div className='back-button-div-fulcrum'>
                <button
                  className="back-btn-result"
                  onClick={this.toggleSubmitted}>
                  BACK
                </button>
              </div>


              <h1 className='inline-page-title'>
                Result Page
              </h1>
            </div>

            {FetchedResults.map(
              (fieldObject,index) =>
              <FulcrumResultComponent
                key={fieldObject.title}
                title = {fieldObject.title}
                returnedData = {fieldObject.returnedData}
              />
            )}

            {this.renderRiverChannelTable(loading, TBDMode, tableData, tbdWithin10, tbdWithin20)}

          </div>
        }

      </form>
    )
  }
}

export default FulcrumApproach;

FulcrumApproach.propTypes = {
  AvgBkflDpt: PropTypes.number,
  BkflChanWdt: PropTypes.number,
  HydrolicRad: PropTypes.number,
  Dee16: PropTypes.number,
  Dee50: PropTypes.number,
  Dee84: PropTypes.number,
  Dee90: PropTypes.number,
  SedimentDensity: PropTypes.number,
  DMLMult: PropTypes.number,

  response: PropTypes.shape({
    slope: PropTypes.number.isRequired,
    meanSlopeVelocity: PropTypes.number.isRequired,
    channelBankfullDischarge: PropTypes.number.isRequired,
    totalBedloadDischarge: PropTypes.number.isRequired,
    totalBedloadVolumeSedimentDischarge: PropTypes.number.isRequired,
    tbdWithin10: PropTypes.number.isRequired,
    tbdWithin20: PropTypes.number.isRequired,
    totalBankfullSuspendedSedimentDischarge_VanRijn: PropTypes.number.isRequired,
    totalBankfullSuspendedSedimentDischarge_WrightParker: PropTypes.number.isRequired,
    totalCombinedSedimentVolumeDischargePerYear_VanRijn: PropTypes.number.isRequired,
    totalCombinedSedimentVolumeDischargePerYear_WrightParker:PropTypes.number.isRequired,
    totalSuspendedSedimentVolumeDischargedPerYear_VanRijn: PropTypes.number.isRequired,
    totalSuspendedSedimentVolumeDischargedPerYear_WrightParker: PropTypes.number.isRequired,
    data: PropTypes.array
  })
};
