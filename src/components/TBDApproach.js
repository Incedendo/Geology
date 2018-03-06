import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiverChannelsTable } from "./Utils";

//import Select package
import Select from 'react-select';
import 'react-select/dist/react-select.css';

//import RadioButton package
import { RadioGroup, RadioButton } from 'react-radio-buttons';

import '../assets/scss/include.scss';

class TBDApproach extends Component{
  state = {
    selectedClimate: "", // set when Climate radio buttons are clicked
    selectedRiverSize: "", // set when river size radio buttons are clicked
    selectedPrecision: "", // set when Precision Radio Buttons are clicked

    selectedFirstOrder: '',
    disabledFirstOrderDropdown: true,
    selectedKoppen: '',
    disabledKoppenDropdown: true,

    // 6 inputs for the text fields
    drainage_low: 0,
    drainage_high: 0,
    riverDepth_Min: 0,
    riverDepth_Max: 0,
    crossSectionalArea_Min: 0,
    crossSectionalArea_Max: 0,

    inputs_validated: true,
  }

  // componentDidMount() {
  postTBD = () =>{
    const JimPostTBDUrl = 'https://geologymiddlewarerafter.azurewebsites.net/api/main/TBD';

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
    ).then(function (json) {
      var responseBody = json;
      console.log("POST CORS works");
      console.log(typeof responseBody, responseBody);
    });
  }

  handleFirstOrderSelectionChange = (value) => {
    this.setState({
      selectedFirstOrder: value,
    })
  }

  handleKoppenSelectionChange = (value) => {
    this.setState({
      selectedKoppen: value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.validateInputs()){
      this.setState({
        inputs_validated: true,
      });
      this.postTBD();
    }else{
      this.setState({
        inputs_validated: false,
      });
      console.log("unable to post bc inputs are invalid...");
    }
  }

  // validate if the user enter positive numbers for min and max drainage area
  validateDrainageInputs(){
    if(this.state.drainage_low > 0 &&  this.state.drainage_high > 0){
            console.log("successfully Validate Inputs");
            return true;
    }else{
            console.log("fail to validate inputs");
            return false;
    }
  }

  // validate if the user enter positive numbers for min and max River Depth
  validateRiverDepthInputs(){
    if(this.state.riverDepth_Max > 0 && this.state.riverDepth_Min > 0){
            console.log("validated River Size");
            return true;
    }else{
            console.log("fail to validate River Size");
            return false;
    }
  }

  // validate if the user enter positive numbers for min and max Cross Sectional Area
  validateCrossSectionalAreaInputs(){
    if(this.state.crossSectionalArea_Max > 0 && this.state.crossSectionalArea_Min > 0){
            console.log("validated Cross Sectional Area");
            return true;
    }else{
            console.log("fail to validate Cross Sectional Area");
            return false;
    }
  }

  //Encapsulating Validate inputs that check for all fields
  validateInputs(){
    // check if users choose ALL 3 big Radio Buttons
    if(this.state.selectedClimate !== "" &&
       this.state.selectedRiverSize !== "" &&
       this.state.selectedPrecision !== ""
    ){
          // check if Users select either of the SELECT dropdown menus
          if(this.state.selectedFirstOrder !== "" ||
             this.state.selectedKoppen !== ""
          ){
                  // validate the numerical inputs in 4 text fields
                  if(
                    this.validateDrainageInputs() &&
                    ( this.validateRiverDepthInputs() || this.validateCrossSectionalAreaInputs())
                  ){
                          console.log("successfully Validate Inputs");
                          return true;
                  }else{
                          console.log("invalid Text inputs");
                          return false;
                  }
          }else{
                  console.log("User did not choose SELECT");
                  return false;
          }
    }else{
          console.log("One of the radio checkbox is unchecked");
          return false;
    }
  }

  renderClimateOrders = () => (
    <div>
      <Grid className="padding-grid">

        <Col sm={4} md={4} className="rightAlignedText">
          <div>
            Climate
          </div>
        </Col>

        <Col sm={4} md={8} className="leftAlignedText">
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

           <RadioGroup
             onChange={ this.setClimateSelectedOption } horizontal
           >
             <RadioButton
               value="FirstOrder"
               pointColor="green">
               First Order
             </RadioButton>
             <RadioButton
               value="KoppenClassification"
               pointColor="green">
               Koppen Classification
             </RadioButton>
           </RadioGroup>
        </Col>
      </Grid>

      <Grid className="padding-grid">
          <Col sm={4} md={6} className="rightAlignedText">

            <Select
              name="first-order"
              value={this.state.selectedFirstOrder && this.state.selectedFirstOrder.value}
              onChange={this.handleFirstOrderSelectionChange}
              disabled={this.state.disabledFirstOrderDropdown}
              autoFocus
              autoBlur
              searchable
              options={[
                { value: 'monsoon', label: 'Monsoon' },
                { value: 'cold', label: 'Cold' },
              ]}
            />
         </Col>

         <Col sm={4} md={6} className="leftAlignedText">

           <Select
             name="first-order"
             value={this.state.selectedKoppen && this.state.selectedKoppen.value}
             onChange={this.handleKoppenSelectionChange}
             disabled={this.state.disabledKoppenDropdown}
             autoFocus
             autoBlur
             searchable
             options={[
               { value: 'monsoon', label: 'Monsoon' },
               { value: 'cold', label: 'Cold' },
             ]}
           />
        </Col>
      </Grid>
    </div>
  )

  renderDrainageArea = () => (
    <div>
      <Grid className="padding-grid">
          <Col sm={4} md={4} className="rightAlignedText">
              Drainage Area:
          </Col>
          <Col sm={4} md={8} className="leftAlignedText">
            <div>
              Min: <input type="textbox"
                name="drainage_low"
                onBlur={this.setRangeValues}
              />
              Max: <input type="textbox"
                name="drainage_high"
                onBlur={this.setRangeValues}
              />
            </div>
         </Col>
      </Grid>
    </div>
  )

  renderRiverSize = () => (
    <div>
      <Grid className="padding-grid">
        <Col sm={4} md={4} className="rightAlignedText">
            River Size:
        </Col>
        <Col sm={4} md={8} className="leftAlignedText">
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
             <RadioButton value="RiverDepth"
               pointColor="green">
               River Depth
             </RadioButton>
             <RadioButton value="CrossSectionalArea"
               pointColor="green">
               Cross Sectional Area
             </RadioButton>
           </RadioGroup>
         </Col>
      </Grid>

      <Grid className="padding-grid">
        <Col sm={4} md={4} className="rightAlignedText">

        </Col>
        <Col sm={4} md={8} className="leftAlignedText">
          {this.state.selectedRiverSize === "RiverDepth" &&
          <div>
            Min: <input type="textbox"
              name="riverDepth_Min"
              onBlur={this.setRangeValues}
            />
            Max: <input type="textbox"
              name="riverDepth_Max"
              onBlur={this.setRangeValues}
            />
          </div>
          }

          {this.state.selectedRiverSize === "CrossSectionalArea" &&
          <div>
            Min: <input type="textbox"
              name="crossSectionalArea_Min"
              onBlur={this.setRangeValues}
            />
            Max: <input type="textbox"
              name="crossSectionalArea_Max"
              onBlur={this.setRangeValues}
            />
          </div>
          }
        </Col>
      </Grid>

    </div>
  )

  renderTBDPrecision = () => (
    <div>
      <Grid className="padding-grid">
        <Col sm={4} md={4} className="rightAlignedText">
          <div>
            Precision:
          </div>
        </Col>
        <Col sm={4} md={8} className="leftAlignedText">

          <RadioGroup
            onChange={ this.setPrecisionSelectedOption } horizontal
          >
            <RadioButton value="10%"
              pointColor="green">
              10%
            </RadioButton>
            <RadioButton value="20%"
              pointColor="green">
              20%
            </RadioButton>
          </RadioGroup>

          {/* <input
              type="radio"
              name="selectedPrecision"
              value="10%"
              checked={this.state.selectedPrecision==='10%'}
              onChange={this.setSelectedOption}
              className=""
            /> Within 10%
           <input
             type="radio"
             name="selectedPrecision"
             value="20%"
             checked={this.state.selectedPrecision==='20%'} onChange={this.setSelectedOption}
             className=""
           /> Within 20% */}
        </Col>
      </Grid>
    </div>
  )

  setSelectedOption = (e) => {
    const {name, value} = e.target;
    this.setState(() => ({
      [name]: value,
    }));
    console.log("set " + name + " to " + value);
  }

  //onChange function for Climate Radio Button Group
  setClimateSelectedOption = (value) => {
    this.setState({
      selectedClimate: value,
    })

    if(value === "FirstOrder"){
      //when user chooses First Order option
      this.setState({
        disabledFirstOrderDropdown: false, //disable the radio for first order
        selectedKoppen: '', //set the state to nil for error checking
        disabledKoppenDropdown: true,
      })
    }else{
      //when user chooses Koppen options
      this.setState({
        disabledKoppenDropdown: false,
        selectedFirstOrder: '', //set the state to nil to for error checking
        disabledFirstOrderDropdown: true,
      })
    }
  }

  //onChange function for River Size Radio Button Group
  setRiverSizeSelectedOption = (value) => {
    this.setState({
      selectedRiverSize: value,
    })
  }

  //onChange function for Precision Radio Button Group
  setPrecisionSelectedOption = (value) => {
    this.setState({
      selectedPrecision: value,
    })
  }

  //A function that set the max/min values for either the drainage_low/ drainage_high, crossSectionalArea_Min/ crossSectionalArea_Max, riverDepth_Min/ riverDepth_Max
  setRangeValues = (e) => {
    const {name, value}  = e.target;

    if(value.length !== 0){
      if(!isNaN(value)){
        this.setState(() => ({
          [name]: value,
        }));
        console.log("set "+ name + " to " + value);
      }else{
        console.log(name + "is not a valid number");
        this.setState(() => ({
          [name]: -1,
        }));
      }
    }else{
      console.log(name + "is empty");
      this.setState({
        [name]: -1,
      })
    }
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <h1>
          TBD Approach
        </h1>

        <div className="">
           <Link to="/home">Back</Link>
        </div>

        {this.renderClimateOrders()}

        {this.renderDrainageArea()}

        {this.renderRiverSize()}

        {this.renderTBDPrecision()}

        {!this.state.inputs_validated &&
        <div>
          Please enter correct values for inputs...
        </div>}

        {!this.props.submitNotNeeded &&
          <button type="submit" onClick={this.handleSubmit} className="padding-grid margin-10">
            Submit
          </button>
         }

          <RiverChannelsTable />
      </form>
    )
  }
}

export default TBDApproach;
