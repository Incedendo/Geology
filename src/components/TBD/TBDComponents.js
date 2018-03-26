import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import RadioButton package
import { RadioGroup, RadioButton } from 'react-radio-buttons';
//import Select package
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import classNames from 'classnames';

//import other components
import RiverChannelsTable  from "./TBD/RiverChannelsTable";

import '../assets/scss/include.scss';

const TBDComponents = () => {
  // state = {
  //   selectedClimate: "", // set when Climate radio buttons are clicked
  //   climateFromDropdown: "",
  //
  //   // 6 inputs for the text fields:
  //   drainage_low: 0,
  //   drainage_high: 0,
  //
  //   selectedRiverSize: "", // set when river size radio buttons are clicked
  //   isCrossSection: null,
  //   riverLow: 0,
  //   riverHigh: 0,
  //
  //   selectedPrecision: "", // set when Precision Radio Buttons are clicked
  //   "isWithin10": null,
  //   "isWithin20": null,
  //
  //   //boolean state:
  //   enabledFirstOrderDropdown: false,
  //   enabledKoppenDropdown: false,
  //   calculatedDepthUsingWidth: false,
  //   inputs_validated: true,
  //   submitClicked: false,
  //   submitted: false,
  //
  //   normal_Border: '',
  //   error_Border: 'red',
  //
  //   tableData: [],
  // }

  // componentDidMount(){
  //   this.setState({
  //     submitted: false,
  //   })
  // }


  handleClimateSelectionChangeDropDown = (value) => {
    this.setState({
      climateFromDropdown: value,
    })
    console.log(this.state.climateFromDropdown.value);
  }

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
    if(this.state.drainage_low > 0 &&  this.state.drainage_high > 0){
            console.log("successfully Validate drainage Inputs: Low: "+ this.state.drainage_low + " , High:  "+ this.state.drainage_high);
            return true;
    }else{
            console.log("fail to validate drainage inputs");
            return false;
    }
  }

  validateRiverInputs(){
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
    // check if users choose ALL 3 big Radio Buttons
    if(this.props.displayedPresicion){
      if(this.validateClimateInputs() &&
        this.validateDrainageInputs() &&
        this.validateRiverInputs() &&
        this.validatePrecisionInputs()
      ){
            console.log("validate ALL inputs");
            return true;
      }else{
            console.log("validateInputs() failed");
            return false;
      }
    }else{
      if(this.validateClimateInputs() &&
        this.validateDrainageInputs() &&
        this.validateRiverInputs()
      ){
            console.log("validate ALL inputs");
            return true;
      }else{
            console.log("validateInputs() failed");
            return false;
      }
    }
  }

  renderClimateOrders = () => {

    var title = classNames({
      "leftAlignedText-Title": true,
      "title-error": this.state.submitClicked && this.state.selectedClimate === ""
    })

    var selectColorError = classNames({
      "error-color-First-order": this.state.submitClicked && this.state.selectedFirstOrder === "",
      "error-color-Koppen": this.state.submitClicked &&  this.state.selectedKoppen === "",
    })

    return(
      <div className="enclosing-border">
        <Grid className="padding-grid">
          <Row>
            <Col sm={4} md={2} className={title}>
                Climate:
            </Col>

            <Col sm={4} md={9} className="leftAlignedText">
               <div >
                 <RadioGroup
                   onChange={ this.setClimateSelectedOption } horizontal
                 >
                   <RadioButton
                     value="FirstOrder"
                     pointColor="green"
                     selected={this.state.selectedClimate==="FirstOrder"}>
                     First Order
                   </RadioButton>
                   <RadioButton
                     value="KoppenClassification"
                     pointColor="green"
                     selected={this.state.selectedClimate==="KoppenClassification"}>
                     Koppen Classification
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

  renderDrainageArea = () => {
    var textfieldMin = classNames({
      'text-field-error': this.state.submitClicked && (this.state.drainage_low <= 0 || this.state.drainage_low === "(positive number only)"),
    });

    var textfieldMax = classNames({
      'text-field-error': this.state.submitClicked && (this.state.drainage_high <= 0 || this.state.drainage_low === "(positive number only)"),
    });

    var title = classNames({
      "leftAlignedText-Title": true,
      "title-error": this.state.submitClicked &&
      (
        this.state.drainage_low <= 0 || this.state.drainage_high <= 0 ||
        this.state.drainage_low === "(positive number only)" ||
        this.state.drainage_high === "(positive number only)"
      )
    })

    return(
      <div className="enclosing-border">
        <Grid className="padding-grid">
            <Col sm={4} md={2} className={title}>
                Drainage Area (meter squared):
            </Col>
            <Col sm={4} md={10} className="leftAlignedText">
              <div className="inline-with-right-margin">
                Min: <input type="textbox"
                  name="drainage_low"
                  className={textfieldMin}
                  onBlur={this.setRangeValues}
                  value={this.state.drainage_low}
                  onChange={this.updateFieldValue}
                />
              </div>
              <div className="inline-no-right-margin">
                Max: <input type="textbox"
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
    var textfieldDepthMin = classNames({
      'text-field-error': this.state.submitClicked && this.state.riverDepth_Min <= 0,
    });

    var textfieldDepthMax = classNames({
      'text-field-error': this.state.submitClicked && this.state.riverDepth_Max <= 0,
    });

    var textfieldAreaMin = classNames({
      'text-field-error': this.state.submitClicked && this.state.crossSectionalArea_Min <= 0,
    });

    var textfieldAreaMax = classNames({
      'text-field-error': this.state.submitClicked && this.state.crossSectionalArea_Max <= 0,
    });

    var title = classNames({
      "leftAlignedText-Title": true,
      "title-error": this.state.submitClicked &&
      (
        this.state.selectedRiverSize === "" ||
        this.state.riverDepth_Min <= 0 || this.state.riverDepth_Max <= 0 ||
        this.state.riverDepth_Min === "(positive number only)" ||
        this.state.riverDepth_Max === "(positive number only)" ||
        this.state.crossSectionalArea_Min <= 0 || this.state.crossSectionalArea_Max <= 0 ||
        this.state.crossSectionalArea_Min === "(positive number only)" ||
        this.state.crossSectionalArea_Max === "(positive number only)"
      )
    })

    return(
      <div className="enclosing-border">
        <Grid className="padding-grid">
          <Col sm={4} md={2} className={title}>
              River Size:
          </Col>
          <Col sm={4} md={9} className="leftAlignedText">

             <RadioGroup
               onChange={ this.setRiverSizeSelectedOption } horizontal
             >
               <RadioButton
                 value="RiverDepth"
                 pointColor="green"
               >
                 River Depth (km)
               </RadioButton>
               <RadioButton
                 value="CrossSectionalArea"
                 pointColor="green"
               >
                 Cross Sectional Area (km squared)
               </RadioButton>
             </RadioGroup>
           </Col>
        </Grid>

        <Grid className="padding-grid">
          <Col sm={4} md={2} className="rightAlignedText">

          </Col>

          <Col sm={4} md={9} className="leftAlignedText">
            {this.state.selectedRiverSize === "RiverDepth" &&
            <div>
              <div className="inline-with-right-margin">
                Min: <input type="textbox"
                  name="riverLow"
                  className={textfieldDepthMin}
                  onBlur={this.setRangeValues}
                  onChange={this.updateFieldValue}
                  value={this.state.riverDepth_Min}
                />
              </div>
              <div className="inline-no-right-margin">
                Max: <input type="textbox"
                  name="riverHigh"
                  className={textfieldDepthMax}
                  onBlur={this.setRangeValues}
                  onChange={this.updateFieldValue}
                  value={this.state.riverDepth_Max}
                />
              </div>
            </div>
            }

            {this.state.selectedRiverSize === "CrossSectionalArea" &&
            <div>
              <div className="inline-with-right-margin">
                Min: <input type="textbox"
                  name="riverLow"
                  className={textfieldAreaMin}
                  onBlur={this.setRangeValues}
                  onChange={this.updateFieldValue}
                  value={this.state.crossSectionalArea_Min}
                />
              </div>
              <div className="inline-no-right-margin">
                Max: <input type="textbox"
                  name="riverHigh"
                  className={textfieldAreaMax}
                  onBlur={this.setRangeValues}
                  onChange={this.updateFieldValue}
                  value={this.state.crossSectionalArea_Max}
                />
              </div>
            </div>
            }
          </Col>
        </Grid>

        <div>
          <Grid>
            <Col sm={4} md={2}></Col>
            <Col sm={4} md={9}>
              <input
                type="checkbox"
                onChange={this.toggleRiverWidthAttr}
                className="leftAlignedText"
              /> Derive Width from River Depth (optional)
            </Col>
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
      <div className="enclosing-border">
        <Grid className="padding-grid">
          <Col sm={4} md={2} className={title}>
              Precision:
          </Col>
          <Col sm={4} md={9} className="leftAlignedText">

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
        isCrossSection: false,
      })
    }else{
      this.setState({
        isCrossSection: true,
      })
    }
  }

  //calculate River Depth based on the provided River Width using Scientific Formula
  deriveRiverDepthFromWidth(){
    return 0;
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
        if(value <= 0){
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
        [name]: "(positive number only)",
      })
    }
  }

  render(){
    return(
      <div>
        {!this.state.submitted &&
          <form onSubmit={this.handleSubmit} className="form">

            <div className='back-button-div-tbd'>
               <Link to="/" className=" back-button-link back-button-effect">Back</Link>
            </div>

            <h1 className='inline-page-title'>
              {this.props.componentTitle}
            </h1>

            {this.renderClimateOrders()}

            {this.renderDrainageArea()}

            {this.renderRiverSize()}

            {this.props.displayedPresicion &&
              this.renderTBDPrecision()
            }

          </form>
        }

        {this.state.submitted &&
          <div>
            <button onClick={this.toggleSubmitted}>
              Back
            </button>

            <RiverChannelsTable
              data={this.state.tableData}
            />

          </div>

        }
      </div>
    )
  }
}

export default TBDComponents;
