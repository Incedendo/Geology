import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import RadioButton package
import { RadioGroup, RadioButton } from 'react-radio-buttons';
//import Select package
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import classNames from 'classnames';

import BaseSupSub from 'react-basesupsub';

//import other components
import RiverChannelsTable  from "./TBD/RiverChannelsTable";

import '../assets/scss/include.scss';

const rootColor = "#23CE2B";
const pointColor = "#FFFFFF";

class TBDAnalogFrame extends Component{
  state = {
    selectedClimate: "", // set when Climate radio buttons are clicked
    climateFromDropdown: "",

    // 6 inputs for the text fields:
    drainage_low: 0,
    drainage_high: 83785,

    selectedRiverSize: "", // set when river size radio buttons are clicked
    isCrossSection: false,
    riverLow: 0,
    riverHigh: '',
    riverWidth: '', //must be empty

    selectedPrecision: "", // set when Precision Radio Buttons are clicked
    isWithin10: false,
    isWithin20: false,

    //boolean state:
    enabledFirstOrderDropdown: false,
    enabledKoppenDropdown: false,
    calculatedDepthUsingWidth: false,
    inputs_validated: true,
    submitClicked: false,
    submitted: false,

    normal_Border: '',
    error_Border: 'red',

    tableData: [],
    tbdWithin10: 0,
    tbdWithin20: 0,
  }

  componentDidMount(){
    this.setState({
      submitted: false,
    })
  }

  // componentDidMount() {
  postTBD = () =>{
    console.log("Printing state: ",this.state);

    const JimPostTBDUrl =
    'https://aae79tnck1.execute-api.us-east-1.amazonaws.com/Prod/api/main/TBD';

    const postRequestData = {
      method: 'POST',
      Origin:'localhost:3000',
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
          "IsFulcrum": false,
          "IsMetric": false,
          "IsRiverAnalogue" : false,
          "IsTBD": true,

          "TBD": {
            //climate:
              "Climate":  this.state.climateFromDropdown.value,

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
            "AvgBankfullDepth": 2.31,
            "BankfullWidth": 73,
            "HydraulicRadius": 2.23,
            "GrainSizeD16": 0.18,
            "GrainSizeD50": 0.19,
            "GrainSizeD84": 0.38,
            "GrainSizeD90": 0.39,
            "SedimentDensity": 2.65,
            "DimensionlessMultiplier": 2,
          },
        })
    }



    if(this.state.riverWidth !== ''){
      const riverDepthGeneratedFromWidth = this.deriveRiverDepthFromWidth();
      this.setState({
        riverHigh: riverDepthGeneratedFromWidth
      });
      console.log("Derive new Depth from Width:", riverDepthGeneratedFromWidth);
    }

    fetch(JimPostTBDUrl, postRequestData)
    // .then( results => results.json() )
    .then( response =>
      {
        if (response.status === 200 || response.status === 201) {
            return response.json();
        } else {
          console.log('TBD Failure!', response.status);
        }
      }
    ).then( data => {
      console.log("expecting returned data");
      console.log(data);
      this.setState({
        tableData: data.streams,
        tbdWithin10: data.tbdWithin10,
        tbdWithin20: data.tbdWithin20,
      })
    });
  }

  handleClimateSelectionChangeDropDown = (value) => {
    this.setState({
      climateFromDropdown: value,
    })
    console.log(this.state.climateFromDropdown.value);
  }

  // handleKoppenSelectionChange = (value) => {
  //   this.setState({
  //     climateFromDropdown: value,
  //   })
  //   console.log(value.value);
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.validateInputs()){
      this.setState({
        inputs_validated: true,
        submitClicked: true,
        submitted: true,
      });
      this.postTBD();
    }else{
      this.setState({
        submitClicked: true,
        inputs_validated: false,
      });
      console.log("unable to post bc inputs are invalid...");
    }
  }

  // validate if the user enter positive numbers for min and max Cross Sectional Area
  validateClimateInputs(){
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
  validateDrainageInputs(){
    if(this.state.drainage_low > 0 ||  this.state.drainage_high > 0){
        if(this.state.drainage_low === ''){
          this.state.drainage_low = 0;
        }
        if(this.state.drainage_high === ''){
          this.state.drainage_high = Number.MAX_VALUE;
        }

        console.log("successfully Validate drainage Inputs: Low: "+ this.state.drainage_low + " , High:  "+ this.state.drainage_high);
        return true;
    }else{
        console.log("fail to validate drainage inputs");
        return false;
    }
  }

  validateRiverInputs(){
    if(this.state.selectedRiverSize !== ""){
      if(this.state.riverLow > 0 || this.state.riverHigh > 0){
          if(this.state.riverLow === ''){
            this.state.riverLow = 0;
          }
          if(this.state.riverHigh === ''){
            this.state.riverHigh = Number.MAX_VALUE;
          }
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
  validatePrecisionInputs(){
    if(this.state.selectedPrecision !== ""){
        console.log("validated Precision: " + this.state.selectedPrecision);
        return true;
    }else{
        console.log("fail to validate Precision: radio box NOT selected");
        return false;
    }
  }

  //Encapsulating Validate inputs that check for all fields
  validateInputs(){
    if(this.validateClimateInputs()){
      if(this.props.displayedPresicion){
        if(this.validatePrecisionInputs()){
          console.log("validate Weather AND Precision inputs");
          return true;
        }
        else{
          console.log("Please choose one of Precision Boxex");
          return false;
        }
      }
      console.log("validate ONLY weather inputs");
      return true;
    }else {
      console.log("validateInputs() failed");
      return false;
    }

    // check if users choose ALL 3 big Radio Buttons

    // if(this.props.displayedPresicion){
    //   if(this.validateClimateInputs() ||
    //     (
    //       this.validateDrainageInputs() ||
    //       this.validateRiverInputs()
    //     )
    //     && this.validatePrecisionInputs()
    //   ){
    //         console.log("validate ALL inputs");
    //         return true;
    //   }else{
    //         console.log("validateInputs() failed");
    //         return false;
    //   }
    // }else{
    //   if( this.validateClimateInputs() ){
    //       if(this.validateDrainageInputs() ||
    //       this.validateRiverInputs()){
    //
    //       }
    //         console.log("validate ALL inputs");
    //         return true;
    //   }else{
    //         console.log("validateInputs() failed");
    //         return false;
    //   }
    // }
  }

  renderClimateOrders = () => {

    var title = classNames({
      "leftAlignedText-Title": true,
      "title-error": this.state.submitClicked && (this.state.selectedClimate === "" || this.state.climateFromDropdown === "")
    })

    var selectColorError = classNames({
      "error-color-First-order": this.state.submitClicked && this.state.selectedFirstOrder === "",
      "error-color-Koppen": this.state.submitClicked &&  this.state.selectedKoppen === "",
    })

    return(
      <div className="enclosing-border purple-background">
        <Grid className="padding-grid">
          <Row>
            <Col sm={4} md={2} className={title}>
                Climate:
            </Col>

            <Col sm={4} md={9} className="leftAlignedText">
              {/* <input
                  type="radio"
                  name="selectedClimate"
                  value="FirstOrder"
                  checked={this.state.selectedClimate === 'FirstOrder'}
                  onChange={this.setSelectedOption}
                  className=""
                /> First Order
               <input
                 type="radio"
                 name="selectedClimate"
                 value="KoppenClassification"
                 checked={this.state.selectedClimate === 'KoppenClassification'}  onChange={this.setSelectedOption}
                 className=""
               /> Koppen Classification */}
               <div >
                 <RadioGroup
                   onChange={ this.setClimateSelectedOption } horizontal
                 >
                   <RadioButton
                     className="rounded-border"
                     value="FirstOrder"
                     iconSize="6px"
                     iconInnerSize="3px"
                     rootColor = {this.state.selectedClimate ==="" ? "white" : "grey"}
                     pointColor = {pointColor}
                     selected={this.state.selectedClimate==="FirstOrder"}>
                     Major Climate
                   </RadioButton>
                   <RadioButton
                     value="KoppenClassification"
                     iconInnerSize="0px"
                     rootColor = {this.state.selectedClimate ==="" ? "white" : "grey"}
                     pointColor={pointColor}
                     selected={this.state.selectedClimate==="KoppenClassification"}>
                     Köppen Climate
                   </RadioButton>
                 </RadioGroup>
               </div>

            </Col>
          </Row>

          <Row>
            <Col sm={4} md={2} >

            </Col>
            <Col sm={4} md={9} >
              <div className="select-padding">
                {this.state.enabledFirstOrderDropdown &&
                  <Select
                    name="first-order"
                    value={this.state.climateFromDropdown && this.state.climateFromDropdown.value}
                    // className={selectColorError}
                    onChange={this.handleClimateSelectionChangeDropDown}
                    autoFocus
                    autoBlur
                    searchable
                    options={[
                      { value: 'A', label: 'Tropical - A' },
                      { value: 'B', label: 'Arid - B' },
                      { value: 'C', label: 'Temperate - C' },
                      { value: 'D', label: 'Cold - D' },
                      { value: 'E', label: 'Polar - E' },
                    ]}
                  />
                }

               {this.state.enabledKoppenDropdown &&
                 <Select
                   name="first-order"
                   value={this.state.climateFromDropdown && this.state.climateFromDropdown.value}
                   onChange={this.handleClimateSelectionChangeDropDown}
                  //  className={selectColorError}
                   autoFocus
                   autoBlur
                   searchable
                   options={[
                     { value: 'Af', label: 'Tropical Rainforest - Af' },
                     { value: 'Am', label: 'Tropical Monsoon - Am' },
                     { value: 'Aw', label: 'Tropical Savannah - Aw' },
                     { value: 'BSh', label: 'Arid,Steppe,Hot - BSh' },
                     { value: 'BSk', label: 'Arid,Steppe,Cold - BSk' },

                     { value: 'BWh', label: 'Arid,Desert,Hot - BWh' },
                     { value: 'BWk', label: 'Arid,Desert,Cold - BWk' },
                     { value: 'Cfa', label: 'Temperate,Without dry season,Hot Summer - Cfa' },
                     { value: 'Cfb', label: 'Temperate,Without dry season,Warm Summer - Cfb' },
                     { value: 'Cfc', label: 'Temperate,Without dry season,Cool Summer - Cfc' },

                     { value: 'Csa', label: 'Temperate,Dry Summer,Hot Summer - Csa' },
                     { value: 'Csb', label: 'Temperate,Dry Summer,Warm Summer - Csb' },
                     { value: 'Csc', label: 'Temperate,Dry Summer,Cool Summer - Csc' },
                     { value: 'Cwa', label: 'Temperate,Dry Winter,Hot Summer - Cwa' },
                     { value: 'Cwb', label: 'Temperate,Dry Winter,Warm Summer - Cwb' },

                     { value: 'Cwc', label: 'Temperate,Dry Winter,Cool Summer - Cwc' },
                     { value: 'Dfa', label: 'Cold,Without dry season,Hot Summer - Dfa' },
                     { value: 'Dfb', label: 'Cold,Without dry season,Warm Summer - Dfb' },
                     { value: 'Dfc', label: 'Cold,Without dry season,Cool Summer - Dfc' },
                     { value: 'Dfd', label: 'Cold,Without dry season,Very Cold Winter - Dfd' },

                     { value: 'Dsa', label: 'Cold,Dry Summer,Hot Summer - Dsa' },
                     { value: 'Dsb', label: 'Cold,Dry Summer,Warm Summer - Dsb' },
                     { value: 'Dsc', label: 'Cold,Dry Summer,Cool Summer - Dsc' },
                     { value: 'Dsd', label: 'Cold,Dry Summer,Very Cold Winter - Dsd' },
                     { value: 'Dwa', label: 'Cold,Dry Winter,Hot Summer - Dwa' },

                     { value: 'Dwb', label: 'Cold,Dry Winter,Warm Summer - Dwb' },
                     { value: 'Dwc', label: 'Cold,Dry Winter,Cool Summer - Dwc' },
                     { value: 'Dwd', label: 'Cold,Dry Winter,Very Cold Winter - Dwd' },
                     { value: 'EF', label: 'Polar,Frost - EF' },
                     { value: 'ET', label: 'Polar,Tundra - ET' },

                   ]}
                 />
               }
              </div>
            </Col>
          </Row>
        </Grid>

      </div>
    )
  }

  //display the Drainage Area section in TBD and Analog Approach
  renderDrainageArea = () => {
    var textfieldMin = classNames({
      'black-txt': true,
      'text-field-error': this.state.submitClicked && (this.state.drainage_low < 0 || this.state.drainage_low === "(positive number only)"),
    });

    var textfieldMax = classNames({
      'black-txt': true,
      'text-field-error': this.state.submitClicked && (this.state.drainage_high < 0 || this.state.drainage_low === "(positive number only)"),
    });

    var title = classNames({
      "leftAlignedText-Title": true,
      "title-error": this.state.submitClicked &&
      (
        this.state.drainage_low < 0 || this.state.drainage_high < 0 ||
        this.state.drainage_low === "(positive number only)" ||
        this.state.drainage_high === "(positive number only)"
      )
    })

    return(
      <div className="enclosing-border purple-background">
        <Grid className="padding-grid">
            <Col sm={4} md={2} className={title}>
                Drainage Area (meter squared):
            </Col>
            <Col sm={4} md={10} className="leftAlignedText">
              <div className="inline-with-right-margin">
                Min: <input  className="black-txt"
                  type="textbox"
                  name="drainage_low"
                  className={textfieldMin}
                  onBlur={this.setRangeValues}
                  value={this.state.drainage_low}
                  onChange={this.updateFieldValue}
                />
              </div>
              <div className="inline-no-right-margin">
                Max: <input  className="black-txt"
                  type="textbox"
                  name="drainage_high"
                  className={textfieldMax}
                  onBlur={this.setRangeValues}
                  value={this.state.drainage_high}
                  onChange={this.updateFieldValue}
                />
              </div>
           </Col>
        </Grid>
      </div>
    )
  }

  updateFieldValue = (e) => {

    const {name, value} = e.target;

    this.setState(() => ({
      [name]: value
    }));
  }

  renderRiverSize = () => {
    var textfieldRiverLow = classNames({
      'black-txt': true,
      'text-field-error': this.state.submitClicked && this.state.riverLow < 0,
    });

    var textfieldRiverHigh = classNames({
      'black-txt': true,
      'text-field-error': this.state.submitClicked && this.state.riverHigh < 0,
    });

    var title = classNames({
      "leftAlignedText-Title": true,
      "title-error": this.state.submitClicked &&
      (
        this.state.riverLow < 0 ||
        this.state.riverHigh < 0 ||
        this.state.riverLow === "(positive number only)" ||
        this.state.riverHigh === "(positive number only)"
      )
    })

    return(
      <div className="enclosing-border purple-background">
        <Grid className="padding-grid">
          <Col sm={4} md={2} className={title}>
              River Size:
          </Col>
          <Col sm={4} md={9} className="leftAlignedText">
            {/* <input
                type="radio"
                name="selectedRiverSize"
                value="RiverDepth"
                checked={this.state.selectedRiverSize==='RiverDepth'}
                onChange={this.setSelectedOption}
                className=""
              /> River Depth
             <input
               type="radio"
               name="selectedRiverSize"
               value="CrossSectionalArea"
               checked={this.state.selectedRiverSize==='CrossSectionalArea'} onChange={this.setSelectedOption}
               className=""
             /> Cross Sectional Area */}

             <RadioGroup
               onChange={ this.setRiverSizeSelectedOption } horizontal
             >
               <RadioButton
                 value="RiverDepth"
                 rootColor = {this.state.selectedRiverSize ==="" ? "white" : "grey"}
                 pointColor={pointColor}
                 iconInnerSize="0px"
               >
                 River Depth (km)
               </RadioButton>
               <RadioButton
                 value="CrossSectionalArea"
                 rootColor = {this.state.selectedRiverSize ==="" ? "white" : "grey"}
                 pointColor = {pointColor}
                 iconInnerSize="0px"
               >

                 <div>
                   <div
                     style={{
                       'margin-right': '2px',
                       display: 'inline-block'
                     }}
                   >
                     Cross Sectional Area (
                   </div>
                   <BaseSupSub style={{ display: 'inline-block' }} base="km" sup="2" />
                   <div
                     style={{
                       'margin-left': '2px',
                       display: 'inline-block'
                     }}
                   >
                      )
                   </div>
                 </div>
               </RadioButton>
             </RadioGroup>
           </Col>
        </Grid>

        {this.state.selectedRiverSize !== '' &&
        <Grid className="padding-grid">
          <Col sm={4} md={2} className="rightAlignedText">

          </Col>

          <Col sm={4} md={9} className="leftAlignedText">
            {this.state.selectedRiverSize === "RiverDepth" &&
            <div>
              <div className="inline-with-right-margin">
                Min: <input
                  type="textbox"
                  name="riverLow"
                  className={textfieldRiverLow}
                  onBlur={this.setRangeValues}
                  onChange={this.updateFieldValue}
                  value={this.state.riverLow}
                />
              </div>
              <div className="inline-no-right-margin">
                Max: <input
                  type="textbox"
                  name="riverHigh"
                  className={textfieldRiverHigh}
                  onBlur={this.setRangeValues}
                  onChange={this.updateFieldValue}
                  value={this.state.riverHigh}
                />
              </div>
            </div>
            }

            {this.state.selectedRiverSize === "CrossSectionalArea" &&
            <div>
              <div className="inline-with-right-margin">
                Min: <input
                  type="textbox"
                  name="riverLow"
                  className={textfieldRiverLow}
                  onBlur={this.setRangeValues}
                  onChange={this.updateFieldValue}
                  value={this.state.riverLow}
                />
              </div>
              <div className="inline-no-right-margin">
                Max: <input
                  type="textbox"
                  name="riverHigh"
                  className={textfieldRiverHigh}
                  onBlur={this.setRangeValues}
                  onChange={this.updateFieldValue}
                  value={this.state.riverHigh}
                />
              </div>
            </div>
            }
          </Col>
        </Grid>
        }


        <div>
          <Grid>
            <Row>
              <Col sm={4} md={2}></Col>
              <Col sm={4} md={9}>
                <input
                  type="checkbox"
                  onChange={this.toggleRiverWidthAttr}
                  className="leftAlignedText"
                /> Derive Width from River Depth (m) (optional)
              </Col>
            </Row>
            <Row>
              {this.state.calculatedDepthUsingWidth &&
                <div>
                  <input
                    type="textbox"
                    name="riverWidth"
                    className="black-txt"
                    value={this.state.riverWidth}
                    //onBlur={this.setRangeValues}
                    onBlur={this.setRiverWidth}
                    onChange={this.updateFieldValue}
                  />
                </div>
              }
            </Row>
          </Grid>
        </div>
      </div>
    )
  }

  renderTBDPrecision = () =>{
    var title = classNames({
      "leftAlignedText-Title": true,
      "title-error": this.state.submitClicked && this.state.selectedPrecision === ""
    })

    return(
      <div className="enclosing-border purple-background">
        <Grid className="padding-grid">
          <Col sm={4} md={2} className={title}>
              Precision:
          </Col>
          <Col sm={4} md={9} className="leftAlignedText">

            <RadioGroup
              onChange={ this.setPrecisionSelectedOption } horizontal
            >
              <RadioButton value="10%"
                rootColor = {this.state.selectedPrecision ==="" ? "white" : "grey"}
                pointColor={pointColor}
                iconInnerSize="0px"
              >
                10%
              </RadioButton>
              <RadioButton value="20%"
                rootColor = {this.state.selectedPrecision ==="" ? "white" : "grey"}
                pointColor={pointColor}
                iconInnerSize="0px"
              >
                20%
              </RadioButton>
            </RadioGroup>
          </Col>
        </Grid>
      </div>
    )
  }

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

  //onChange function for River Size Radio Button Group
  setRiverSizeSelectedOption = (value) => {
    this.setState({
      selectedRiverSize: value,
    });

    if(value === "RiverDepth"){
      this.setState({
        riverHigh: 48, //river max depth
        isCrossSection: false,
      });
    }else{
      this.setState({
        riverHigh: 9780, //river max cross-sectional area
        isCrossSection: true,
      });
    }
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

  //toggle the state to display Form OR Result
  toggleDisplayedResult = () => {
    this.setState( (prevState) => ({displayedResult: !prevState.displayedResult}) );
  }

  //toggle the state to display Form OR Result
  toggleSubmitted = () => {
    this.setState( (prevState) => ({submitted: !prevState.submitted}) );
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


  renderTitle = () => {
    if(this.props.componentTitle === 'TBD Approach'){
      return(
        <div>
          <div
            style={{
              'margin-right': '15px',
              display: 'inline-block'
            }}
          >
              Stream Specific Bankfull Duration (
          </div>
          <BaseSupSub style={{ display: 'inline-block' }} base="t" sub="bd" />
          <div
            style={{
              'margin-left': '15px',
              display: 'inline-block'
            }}
          >
              )
          </div>
        </div>
      )
    }else{
      return(
        <div>{this.props.componentTitle}</div>
      )
    }
  }

  render(){
    return(
      <div>
        {!this.state.submitted &&
          <form onSubmit={this.handleSubmit} className="form">
            <div className="header">
              <div className='back-button-div-tbd'>
                 <Link to="/" className=" back-button-link back-button-effect">Back</Link>
              </div>

              <h1 className='inline-page-title'>
                {this.renderTitle()}
              </h1>

            </div>

            {this.renderClimateOrders()}

            {this.renderDrainageArea()}

            {this.renderRiverSize()}

            {this.props.displayedPresicion &&
              this.renderTBDPrecision()
            }

            {!this.state.inputs_validated &&
              <div>
                Please enter correct values for inputs...
              </div>
            }

            <button
              type="submit" onClick={this.handleSubmit} className="back-btn-result">
              Submit
            </button>

          </form>
        }

        {this.state.submitted &&
          <div>
            <div className="header">
              <div className='back-button-div-tbd'>
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

            <RiverChannelsTable
              data={this.state.tableData}
              tbdWithin10={this.state.tbdWithin10}
              tbdWithin20={this.state.tbdWithin20}
              origin={this.props.origin}
            />

          </div>
        }
      </div>
    )
  }
}

export default TBDAnalogFrame;
