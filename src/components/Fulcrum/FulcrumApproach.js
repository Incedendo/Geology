import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
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
    AvgBkflDpt: '',
    BkflChanWdt: '',
    HydrolicRad: '',
    Dee16: '',
    Dee50: '',
    Dee84: '',
    Dee90: '',
    SedimentDensity: '',
    DMLMult: '',

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
    displayedResult: false,

    isRiverAnalogue: false,
    isTBD: false,
    TBDMode: "", // "Default" or "Customized"

    //Customized TBD parameters:
        climateFromDropdown: "",
        selectedClimate: "",

        // 6 inputs for the text fields:
        drainage_low: 0,
        drainage_high: 83785,

        selectedRiverSize: "", // set when river size radio buttons are clicked
        isCrossSection: null,
        riverLow: 0,
        riverHigh: '',
        riverWidth: '',
        toggleRiverWidthAttr: false,
        calculatedDepthUsingWidth: false,

        selectedPrecision: "", // set when Precision Radio Buttons are clicked
        isWithin10: null,
        isWithin20: null,

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
  };

  // send a POST request to the Middelware with all the parameters of the Fulcrum (AND TBD) approach.
  // Update stateDisplay response correspondingly
  postFulcrum = () => {

    let JimPostUrl = '';

    if(this.state.TBDMode === "Default"){
      JimPostUrl = 'https://aae79tnck1.execute-api.us-east-1.amazonaws.com/Prod/api/main/Fulcrum';
      console.log("default TBD");
    }else if(this.state.TBDMode === "Customized"){
      JimPostUrl = 'https://aae79tnck1.execute-api.us-east-1.amazonaws.com/Prod/api/main/Comb';
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
      body:
        JSON.stringify({
          "IsFulcrum": true,
          "IsMetric": false,
          "IsRiverAnalogue" : this.state.isRiverAnalogue,
          "IsTBD": this.state.isTBD,
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
          "Fulcrum": {
            "AvgBankfullDepth": this.state.AvgBkflDpt,
            "BankfullWidth": this.state.BkflChanWdt,
            "HydraulicRadius": this.state.HydrolicRad,
            "GrainSizeD16": this.state.Dee16,
            "GrainSizeD50": this.state.Dee50,
            "GrainSizeD84": this.state.Dee84,
            "GrainSizeD90": this.state.Dee90,
            "SedimentDensity": this.state.SedimentDensity,
            "DimensionlessMultiplier": this.state.DMLMult,
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
      console.log(data);
      console.log(data.slope);
      console.log(data.totalSuspendedSedimentVolumeDischargedPerYear_VanRijn);
      this.setState({
        response: data,
      });

      console.log("post successful!!!");
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
        isTBD: true,
        submitClicked: false,
      });
    }else{
      this.setState({
        TBDMode: "Customized",
        isTBD: true,
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
        }))
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
      if(this.validateAllInputsFulcrum()){
        console.log("in validate Fulcrum: " + this.state.TBDMode);
        if(this.state.TBDMode === "Default"){
            console.log("about to POST Fulcrum....");
            this.setState({
              submitted: true,
              submitClicked: true,
              inputs_validated: true,
            });
            this.postFulcrum();
            console.log("Done: "+this.state.submitted);
        }else if(this.state.TBDMode === "Customized"){
            if(this.validateTBDInputs()){
              //do TBD Component Validation
              this.setState({
                submitted: true,
                submitClicked: true,
                inputs_validated: true,
              });
              this.postFulcrum();
              console.log(this.state.submitted);
            }
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
  //                   *** TBD COMPONENTS Subroutines ***
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
        selectedKoppen: '', //set the state to nil for error checking
        enabledKoppenDropdown: false,
      })
    }else{
      //when user chooses Koppen options
      this.setState({
        enabledKoppenDropdown: true,
        selectedFirstOrder: '', //set the state to nil to for error checking
        enabledFirstOrderDropdown: false,
      })
    }
  }

  handleClimateSelectionChangeDropDown = (value) => {
    this.setState({
      climateFromDropdown: value,
    })
    console.log(this.state.climateFromDropdown.value);
  }

  //A function that set the max/min values for either the drainage_low/ drainage_high, crossSectionalArea_Min/ crossSectionalArea_Max, riverDepth_Min/ riverDepth_Max
  setRangeValues = (e) => {
    const {name, value}  = e.target;
    if(value.length !== 0){
      if(!isNaN(value)){
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

    //return depth;
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
            return false;
        }
    }else{
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
            console.log("fail to validate Precision: radio box NOT selected");
            return false;
    }
  }

  //Encapsulating Validate inputs that check for all fields
  validateTBDInputs = () => {
    // check if users choose ALL 3 big Radio Buttons
    if(this.validateClimateInputs() &&
      // this.validateDrainageInputs() &&
      // this.validateRiverInputs() &&
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
        Fulcrum Approach
      </h1>
    </div>

  )

  renderSubmitBtn = () => (
    <div>
      {/* SUBMIT BUTTON */}
      <button type="submit" onClick={this.handleSubmit} className="back-btn-result">
        Submit

      </button>
    </div>
  )

  //render the customized TBD Approach within Fulcrum
  renderTBD = () => (
    <div className={this.state.TBDMode ==="" ? "enclosing-border" : " enclosing-border light-purple-background"}>
      <div className="">
        <div className="TBD-div">
            {!this.state.defaultTBD && !this.state.customizedTBD &&
              <div className="">
                <RadioGroup
                  onChange={ this.setSelectedTBDMode } horizontal
                >
                  <RadioButton
                    value="default"
                    rootColor={this.state.TBDMode ==="" ? "#4B1979" : "grey" }
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
                      <BaseSupSub style={{ display: 'inline-block' }} base="T" sub="bd" />
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
                    rootColor={this.state.TBDMode ==="" ? "#4B1979" : "grey" }
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
                      <BaseSupSub style={{ display: 'inline-block' }} base="T" sub="bd" />
                    </div>

                  </RadioButton>
                </RadioGroup>
              </div>
            }
        </div>


        {this.state.TBDMode === "Default" &&
          <div className="white-txt">
            TBD will be calculated using Default value of [...]
          </div>
        }

        {this.state.TBDMode === "Customized" &&
          this.renderTBDComponents()
        }

      </div>
    </div>
  )

  // render Climate, Drainage Area, River Size and Precision Components
  renderTBDComponents = () => (
    <div className="purple-background">
      <ClimateOrders
        submitClicked = {this.state.submitClicked}
        selectedClimate = {this.state.selectedClimate}
        selectedFirstOrder = {this.state.selectedFirstOrder}
        selectedKoppen = {this.state.selectedKoppen}
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
        riverDepth_Min = {this.state.riverLow}
        riverDepth_Max = {this.state.riverHigh}
        crossSectionalArea_Min = {this.state.riverLow}
        crossSectionalArea_Max = {this.state.riverHigh}
        selectedRiverSize = {this.state.selectedRiverSize}
        setRiverSizeSelectedOption= {this.setRiverSizeSelectedOption}
        setRangeValues = {this.setRangeValues}
        updateFieldValue = {this.updateFieldValue}
        toggleRiverWidthAttr = {this.state.toggleRiverWidthAttr}
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

  renderRiverChannelTable = () => (
    <div>
      {this.state.TBDMode==="Customized" &&
        <div>
          <RiverChannelsTable
            data={this.state.tableData}
            origin="/FulcrumApproach"
          />
        </div>
      }
    </div>
  )


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
        title: "Mean Flow Velocity (m/s)",
        returnedData: this.state.response.meanSlopeVelocity,
      },
      {
        title: "Channel Bankful Discharge (m^3/s)",
        returnedData: this.state.response.channelBankfullDischarge,
      },
      {
        title: "Total BedLoad Discharge (m^3/s)",
        returnedData: this.state.response.totalBedloadDischarge,
      },
      {
        title: "Total Bedload Volume Sediment Discharge (m^3/s)",
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
        title: "Total Bankful Suspended Sediment Discharge (Van Rijn) (m^3/s)",
        returnedData: this.state.response.totalBankfullSuspendedSedimentDischarge_VanRijn,
      },
      {
        title: "Total Bankful Suspended Sediment Discharge (Wright Parker) (m^3/s)",
        returnedData: this.state.response.totalBankfullSuspendedSedimentDischarge_WrightParker,
      },
      {
        title: "Total Combined Sediment Volume Discharge Per Year (Van Rijn) (m^3/yr)",
        returnedData: this.state.response.totalCombinedSedimentVolumeDischargePerYear_VanRijn,
      },
      {
        title: "Total Combined Sediment Volume Discharge Per Year (Wright Parker) (m^3/yr)",
        returnedData: this.state.response.totalCombinedSedimentVolumeDischargePerYear_WrightParker,
      },
      {
        title: "Total Suspended Sediment Volume Discharge Per Year (Van Rijn) (m^3/yr)",
        returnedData: this.state.response.totalSuspendedSedimentVolumeDischargedPerYear_VanRijn,
      },
      {
        title: "Total Suspended Sediment Volume Discharge Per Year (Wright Parker) (m^3/yr)",
        returnedData: this.state.response.totalSuspendedSedimentVolumeDischargedPerYear_WrightParker,
      }
    ];

    const { submitted } = this.state.submitted;

    return (
      <form onSubmit={this.handleSubmit} className="form" style={{
        'background-color': '#DBDBD9'
      }}>

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

            {this.renderTBD()}

            {!this.state.inputs_validated &&
              <div className="error-div-fulcrum">
                Please check the inputs and make sure you have entered all correct values!
              </div>
            }

            {this.renderSubmitBtn()}

          </div>
        }

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

            {this.renderRiverChannelTable()}

          </div>
        }

      </form>
    )
  }
}

export default FulcrumApproach;
