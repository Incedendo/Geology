// import React, { Component } from 'react';
// import { Grid, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// //import RadioButton package
// import { RadioGroup, RadioButton } from 'react-radio-buttons';
// //import Select package
// import Select from 'react-select';
// import 'react-select/dist/react-select.css';
// import classNames from 'classnames';
//
// //import other components
// import { RiverChannelsTable } from "./Utils";
// import TBDResult from './TBD/TBDResult';
//
// import '../assets/scss/include.scss';
//
// class TBDApproach extends Component{
//
//   state = {
//     selectedClimate: "", // set when Climate radio buttons are clicked
//     // selectedFirstOrder: "", // send selectedFirstOrder.value
//     // selectedKoppen: "", // send selectedKoppen.value
//     climateFromDropdown: "",
//
//     selectedRiverSize: "", // set when river size radio buttons are clicked
//     selectedPrecision: "", // set when Precision Radio Buttons are clicked
//
//     //boolean state:
//     enabledFirstOrderDropdown: false,
//     enabledKoppenDropdown: false,
//     calculatedDepthUsingWidth: false,
//     inputs_validated: true,
//     submitClicked: false,
//     submitted: false,
//
//     // 6 inputs for the text fields:
//     drainage_low: 0,
//     drainage_high: 0,
//     riverDepth_Min: 0,
//     riverDepth_Max: 0,
//     crossSectionalArea_Min: 0,
//     crossSectionalArea_Max: 0,
//
//     normal_Border: '',
//     error_Border: 'red',
//
//     data: [],
//   }
//
//   componentDidMount(){
//     this.setState({
//       submitted: false,
//     })
//   }
//
//   // componentDidMount() {
//   postTBD = () =>{
//     const JimPostTBDUrl = 'https://g2dn2m2b1g.execute-api.us-east-1.amazonaws.com/Prod/api/main/TBD';
//
//     const postRequestData = {
//       method: 'POST',
//       Origin:'https://powerful-cliffs-45352.herokuapp.com',
//       mode: "cors",
//       headers: {
//         // 'Content-Type': 'text/plain',
//         // Accept: 'text/plain',
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         // 'X-Content-Type-Options': 'nosniff',
//       },
//       body:
//         JSON.stringify({
//           "isFulcrum": true,
//           "isMetric": false,
//           "isRiverAnalogue" : false,
//           "isTBD": true,
//           "TBD": {
//           "isCrossSection": true,
//             "isWithin10": true,
//             "isWithin20": true,
//             "climate": this.state.climateFromDropdown,
//             "drainage_low": this.state.drainage_low,
//             "drainage_high": this.state.drainage_high,
//             "selectedRiverSize": this.state.selectedRiverSize
//             "riverSize_low": this.state.,
//             "riverSize_high": this.state.,
//           },
//           "Fulcrum": {
//             "avgBankfullDepth": 9,
//             "bankfullWidth": 8,
//             "hydraulicRadius": 7,
//             "grainSize_d16": 6,
//             "grainSize_d50": 5,
//             "grainSize_d84": 4,
//             "grainSize_d90": 3,
//             "sedimentDensity": 2,
//             "dimensionlessMultiplier": 1,
//           },
//         })
//     }
//
//     fetch(JimPostTBDUrl, postRequestData)
//     // .then( results => results.json() )
//     .then( response =>
//       {
//         if (response.status === 200 || response.status === 201) {
//             return response.json();
//         } else {
//           console.log('TBD Failure!', response.status);
//         }
//       }
//     ).then(function (json) {
//       var responseBody = json;
//       console.log("POST CORS works");
//       console.log(typeof responseBody, responseBody);
//     });
//   }
//
//   navigate() {
//       const { router } = this.context
//       router.transitionTo('/some/new/location')
//   }
//
//   handleClimateSelectionChangeDropDown = (value) => {
//     this.setState({
//       climateFromDropdown: value,
//     })
//     console.log(this.state.climateFromDropdown.value);
//   }
//
//   // handleKoppenSelectionChange = (value) => {
//   //   this.setState({
//   //     climateFromDropdown: value,
//   //   })
//   //   console.log(value.value);
//   // }
//
//   handleSubmit = (e) => {
//     e.preventDefault();
//     if(this.validateInputs()){
//       this.setState({
//         inputs_validated: true,
//         submitClicked: true,
//         submitted: true,
//       });
//       this.postTBD();
//     }else{
//       this.setState({
//         submitClicked: true,
//         inputs_validated: false,
//       });
//       console.log("unable to post bc inputs are invalid...");
//     }
//   }
//
//   // validate if the user enter positive numbers for min and max Cross Sectional Area
//   validateClimateInputs(){
//     if(this.state.selectedClimate !== ""){
//         if(this.state.selectedFirstOrder !== "" || this.state.selectedKoppen !== ""){
//             console.log("validated selectedClimate: ");
//             return true;
//         }else{
//             console.log("did not choose an item in the dropdown: ");
//             return false;
//         }
//     }else{
//             console.log("fail to validate selectedClimate: radio box NOT selected");
//             return false;
//     }
//   }
//
//   // validate if the user enter positive numbers for min and max drainage area
//   validateDrainageInputs(){
//     if(this.state.drainage_low > 0 &&  this.state.drainage_high > 0){
//             console.log("successfully Validate drainage Inputs");
//             return true;
//     }else{
//             console.log("fail to validate drainage inputs");
//             return false;
//     }
//   }
//
//
//   validateRiverInputs(){
//     if(this.state.selectedRiverSize !== ""){
//         if(this.state.selectedRiverSize == "RiverDepth"){
//             // validate if the user enter positive numbers for min and max River Depth
//             if(this.state.riverDepth_Max > 0 && this.state.riverDepth_Min > 0){
//                     console.log("validated River Size");
//                     return true;
//             }else{
//                     console.log("fail to validate River Size: 1 of the Depth text field is empty");
//                     return false;
//             }
//         }else if(this.state.selectedRiverSize == "CrossSectionalArea"){
//             // validate if the user enter positive numbers for min and max Cross Sectional Area
//             if(this.state.crossSectionalArea_Max > 0 && this.state.crossSectionalArea_Min > 0){
//                   console.log("validated Cross Sectional Area");
//                   return true;
//             }else{
//                   console.log("fail to validate Cross Sectional Area: 1 of the Area text field is empty");
//                   return false;
//             }
//         }
//     }else{
//       console.log("failed to validate River Inputs: radio box NOT selected");
//       return false;
//     }
//   }
//
//   // validate if the user enter positive numbers for min and max Cross Sectional Area
//   validatePrecisionInputs(){
//     if(this.state.selectedPrecision !== ""){
//             console.log("validated Precision");
//             return true;
//     }else{
//             console.log("fail to validate Precision: radio box NOT selected");
//             return false;
//     }
//   }
//
//   //Encapsulating Validate inputs that check for all fields
//   validateInputs(){
//     // check if users choose ALL 3 big Radio Buttons
//     if(this.validateClimateInputs() &&
//       this.validateDrainageInputs() &&
//       this.validateRiverInputs() &&
//       this.validatePrecisionInputs()
//     ){
//           return true;
//     }else{
//           console.log("validateInputs() failed");
//           return false;
//     }
//   }
//
//   renderClimateOrders = () => {
//
//     var title = classNames({
//       "leftAlignedText-Title": true,
//       "title-error": this.state.submitClicked && this.state.selectedClimate === ""
//     })
//
//     var selectColorError = classNames({
//       "error-color-First-order": this.state.submitClicked && this.state.selectedFirstOrder === "",
//       "error-color-Koppen": this.state.submitClicked &&  this.state.selectedKoppen === "",
//     })
//
//     return(
//       <div className="enclosing-border">
//         <Grid className="padding-grid">
//           <Row>
//             <Col sm={4} md={2} className={title}>
//                 Climate:
//             </Col>
//
//             <Col sm={4} md={9} className="leftAlignedText">
//               {/* <input
//                   type="radio"
//                   name="selectedClimate"
//                   value="FirstOrder"
//                   checked={this.state.selectedClimate === 'FirstOrder'}
//                   onChange={this.setSelectedOption}
//                   className=""
//                 /> First Order
//                <input
//                  type="radio"
//                  name="selectedClimate"
//                  value="KoppenClassification"
//                  checked={this.state.selectedClimate === 'KoppenClassification'}  onChange={this.setSelectedOption}
//                  className=""
//                /> Koppen Classification */}
//                <div >
//                  <RadioGroup
//                    onChange={ this.setClimateSelectedOption } horizontal
//                  >
//                    <RadioButton
//                      value="FirstOrder"
//                      pointColor="green"
//                      selected={this.state.selectedClimate==="FirstOrder"}>
//                      First Order
//                    </RadioButton>
//                    <RadioButton
//                      value="KoppenClassification"
//                      pointColor="green"
//                      selected={this.state.selectedClimate==="KoppenClassification"}>
//                      Koppen Classification
//                    </RadioButton>
//                  </RadioGroup>
//                </div>
//
//             </Col>
//           </Row>
//
//           <Row>
//             <Col sm={4} md={2} >
//
//             </Col>
//             <Col sm={4} md={9} >
//               <div className="select-padding">
//                 {this.state.enabledFirstOrderDropdown &&
//                   <Select
//                     name="first-order"
//                     value={this.state.climateFromDropdown && this.state.climateFromDropdown.value}
//                     // className={selectColorError}
//                     onChange={this.handleClimateSelectionChangeDropDown}
//                     autoFocus
//                     autoBlur
//                     searchable
//                     options={[
//                       { value: 'A', label: 'Tropical - A' },
//                       { value: 'B', label: 'Arid - B' },
//                       { value: 'C', label: 'Temperate - C' },
//                       { value: 'D', label: 'Cold - D' },
//                       { value: 'E', label: 'Polar - E' },
//                     ]}
//                   />
//                 }
//
//                {this.state.enabledKoppenDropdown &&
//                  <Select
//                    name="first-order"
//                    value={this.state.climateFromDropdown && this.state.climateFromDropdown.value}
//                    onChange={this.handleClimateSelectionChangeDropDown}
//                   //  className={selectColorError}
//                    autoFocus
//                    autoBlur
//                    searchable
//                    options={[
//                      { value: 'Af', label: 'Tropical Rainforest - Af' },
//                      { value: 'Am', label: 'Tropical Monsoon - Am' },
//                      { value: 'Aw', label: 'Tropical Savannah - Aw' },
//                      { value: 'BSh', label: 'Arid,Steppe,Hot - BSh' },
//                      { value: 'BSk', label: 'Arid,Steppe,Cold - BSk' },
//
//                      { value: 'BWh', label: 'Arid,Desert,Hot - BWh' },
//                      { value: 'BWk', label: 'Arid,Desert,Cold - BWk' },
//                      { value: 'Cfa', label: 'Temperate,Without dry season,Hot Summer - Cfa' },
//                      { value: 'Cfb', label: 'Temperate,Without dry season,Warm Summer - Cfb' },
//                      { value: 'Cfc', label: 'Temperate,Without dry season,Cool Summer - Cfc' },
//
//                      { value: 'Csa', label: 'Temperate,Dry Summer,Hot Summer - Csa' },
//                      { value: 'Csb', label: 'Temperate,Dry Summer,Warm Summer - Csb' },
//                      { value: 'Csc', label: 'Temperate,Dry Summer,Cool Summer - Csc' },
//                      { value: 'Cwa', label: 'Temperate,Dry Winter,Hot Summer - Cwa' },
//                      { value: 'Cwb', label: 'Temperate,Dry Winter,Warm Summer - Cwb' },
//
//                      { value: 'Cwc', label: 'Temperate,Dry Winter,Cool Summer - Cwc' },
//                      { value: 'Dfa', label: 'Cold,Without dry season,Hot Summer - Dfa' },
//                      { value: 'Dfb', label: 'Cold,Without dry season,Warm Summer - Dfb' },
//                      { value: 'Dfc', label: 'Cold,Without dry season,Cool Summer - Dfc' },
//                      { value: 'Dfd', label: 'Cold,Without dry season,Very Cold Winter - Dfd' },
//
//                      { value: 'Dsa', label: 'Cold,Dry Summer,Hot Summer - Dsa' },
//                      { value: 'Dsb', label: 'Cold,Dry Summer,Warm Summer - Dsb' },
//                      { value: 'Dsc', label: 'Cold,Dry Summer,Cool Summer - Dsc' },
//                      { value: 'Dsd', label: 'Cold,Dry Summer,Very Cold Winter - Dsd' },
//                      { value: 'Dwa', label: 'Cold,Dry Winter,Hot Summer - Dwa' },
//
//                      { value: 'Dwb', label: 'Cold,Dry Winter,Warm Summer - Dwb' },
//                      { value: 'Dwc', label: 'Cold,Dry Winter,Cool Summer - Dwc' },
//                      { value: 'Dwd', label: 'Cold,Dry Winter,Very Cold Winter - Dwd' },
//                      { value: 'EF', label: 'Polar,,Frost - EF' },
//                      { value: 'ET', label: 'Polar,,Tundra - ET' },
//
//                    ]}
//                  />
//                }
//               </div>
//             </Col>
//           </Row>
//         </Grid>
//
//       </div>
//     )
//   }
//
//   renderDrainageArea = () => {
//     var textfieldMin = classNames({
//       'text-field-error': this.state.submitClicked && (this.state.drainage_low <= 0 || this.state.drainage_low === "(positive number only)"),
//     });
//
//     var textfieldMax = classNames({
//       'text-field-error': this.state.submitClicked && (this.state.drainage_high <= 0 || this.state.drainage_low === "(positive number only)"),
//     });
//
//     var title = classNames({
//       "leftAlignedText-Title": true,
//       "title-error": this.state.submitClicked &&
//       (
//         this.state.drainage_low <= 0 || this.state.drainage_high <= 0 ||
//         this.state.drainage_low === "(positive number only)" ||
//         this.state.drainage_high === "(positive number only)"
//       )
//     })
//
//     return(
//       <div className="enclosing-border">
//         <Grid className="padding-grid">
//             <Col sm={4} md={2} className={title}>
//                 Drainage Area:
//             </Col>
//             <Col sm={4} md={10} className="leftAlignedText">
//               <div className="inline-with-right-margin">
//                 Min: <input type="textbox"
//                   name="drainage_low"
//                   className={textfieldMin}
//                   onBlur={this.setRangeValues}
//                   value={this.state.drainage_low}
//                   onChange={this.updateFieldValue}
//                 />
//               </div>
//               <div className="inline-no-right-margin">
//                 Max: <input type="textbox"
//                   name="drainage_high"
//                   className={textfieldMax}
//                   onBlur={this.setRangeValues}
//                   value={this.state.drainage_high}
//                   onChange={this.updateFieldValue}
//                 />
//               </div>
//            </Col>
//         </Grid>
//       </div>
//     )
//   }
//
//   updateFieldValue = (e) => {
//
//     const {name, value} = e.target;
//
//     this.setState(() => ({
//       [name]: value
//     }));
//   }
//
//   renderRiverSize = () => {
//     var textfieldDepthMin = classNames({
//       'text-field-error': this.state.submitClicked && this.state.riverDepth_Min <= 0,
//     });
//
//     var textfieldDepthMax = classNames({
//       'text-field-error': this.state.submitClicked && this.state.riverDepth_Max <= 0,
//     });
//
//     var textfieldAreaMin = classNames({
//       'text-field-error': this.state.submitClicked && this.state.crossSectionalArea_Min <= 0,
//     });
//
//     var textfieldAreaMax = classNames({
//       'text-field-error': this.state.submitClicked && this.state.crossSectionalArea_Max <= 0,
//     });
//
//     var title = classNames({
//       "leftAlignedText-Title": true,
//       "title-error": this.state.submitClicked &&
//       (
//         this.state.selectedRiverSize === "" ||
//         this.state.riverDepth_Min <= 0 || this.state.riverDepth_Max <= 0 ||
//         this.state.riverDepth_Min === "(positive number only)" ||
//         this.state.riverDepth_Max === "(positive number only)" ||
//         this.state.crossSectionalArea_Min <= 0 || this.state.crossSectionalArea_Max <= 0 ||
//         this.state.crossSectionalArea_Min === "(positive number only)" ||
//         this.state.crossSectionalArea_Max === "(positive number only)"
//       )
//     })
//
//     return(
//       <div className="enclosing-border">
//         <Grid className="padding-grid">
//           <Col sm={4} md={2} className={title}>
//               River Size:
//           </Col>
//           <Col sm={4} md={9} className="leftAlignedText">
//             {/* <input
//                 type="radio"
//                 name="selectedRiverSize"
//                 value="RiverDepth"
//                 checked={this.state.selectedRiverSize==='RiverDepth'}
//                 onChange={this.setSelectedOption}
//                 className=""
//               /> River Depth
//              <input
//                type="radio"
//                name="selectedRiverSize"
//                value="CrossSectionalArea"
//                checked={this.state.selectedRiverSize==='CrossSectionalArea'} onChange={this.setSelectedOption}
//                className=""
//              /> Cross Sectional Area */}
//
//              <RadioGroup
//                onChange={ this.setRiverSizeSelectedOption } horizontal
//              >
//                <RadioButton value="RiverDepth"
//                  pointColor="green">
//                  River Depth
//                </RadioButton>
//                <RadioButton value="CrossSectionalArea"
//                  pointColor="green">
//                  Cross Sectional Area
//                </RadioButton>
//              </RadioGroup>
//            </Col>
//         </Grid>
//
//         <Grid className="padding-grid">
//           <Col sm={4} md={2} className="rightAlignedText">
//
//           </Col>
//
//           <Col sm={4} md={9} className="leftAlignedText">
//             {this.state.selectedRiverSize === "RiverDepth" &&
//             <div>
//               <div className="inline-with-right-margin">
//                 Min: <input type="textbox"
//                   name="riverDepth_Min"
//                   className={textfieldDepthMin}
//                   onBlur={this.setRangeValues}
//                   onChange={this.updateFieldValue}
//                   value={this.state.riverDepth_Min}
//                 />
//               </div>
//               <div className="inline-no-right-margin">
//                 Max: <input type="textbox"
//                   name="riverDepth_Max"
//                   className={textfieldDepthMax}
//                   onBlur={this.setRangeValues}
//                   onChange={this.updateFieldValue}
//                   value={this.state.riverDepth_Max}
//                 />
//               </div>
//             </div>
//             }
//
//             {this.state.selectedRiverSize === "CrossSectionalArea" &&
//             <div>
//               <div className="inline-with-right-margin">
//                 Min: <input type="textbox"
//                   name="crossSectionalArea_Min"
//                   className={textfieldAreaMin}
//                   onBlur={this.setRangeValues}
//                   onChange={this.updateFieldValue}
//                   value={this.state.crossSectionalArea_Min}
//                 />
//               </div>
//               <div className="inline-no-right-margin">
//                 Max: <input type="textbox"
//                   name="crossSectionalArea_Max"
//                   className={textfieldAreaMax}
//                   onBlur={this.setRangeValues}
//                   onChange={this.updateFieldValue}
//                   value={this.state.crossSectionalArea_Max}
//                 />
//               </div>
//             </div>
//             }
//           </Col>
//         </Grid>
//
//         <div>
//           <Grid>
//             <Col sm={4} md={2}></Col>
//             <Col sm={4} md={9}>
//               <input
//                 type="checkbox"
//                 onChange={this.toggleRiverWidthAttr}
//                 className="leftAlignedText"
//               /> Derive Width from River Depth (optional)
//             </Col>
//           </Grid>
//         </div>
//       </div>
//     )
//   }
//
//   renderTBDPrecision = () =>{
//     var title = classNames({
//       "leftAlignedText-Title": true,
//       "title-error": this.state.submitClicked && this.state.selectedPrecision === ""
//     })
//
//     return(
//       <div className="enclosing-border">
//         <Grid className="padding-grid">
//           <Col sm={4} md={2} className={title}>
//               Precision:
//           </Col>
//           <Col sm={4} md={9} className="leftAlignedText">
//
//             <RadioGroup
//               onChange={ this.setPrecisionSelectedOption } horizontal
//             >
//               <RadioButton value="10%"
//                 pointColor="green">
//                 10%
//               </RadioButton>
//               <RadioButton value="20%"
//                 pointColor="green">
//                 20%
//               </RadioButton>
//             </RadioGroup>
//
//             {/* <input
//                 type="radio"
//                 name="selectedPrecision"
//                 value="10%"
//                 checked={this.state.selectedPrecision==='10%'}
//                 onChange={this.setSelectedOption}
//                 className=""
//               /> Within 10%
//              <input
//                type="radio"
//                name="selectedPrecision"
//                value="20%"
//                checked={this.state.selectedPrecision==='20%'} onChange={this.setSelectedOption}
//                className=""
//              /> Within 20% */}
//           </Col>
//         </Grid>
//       </div>
//     )
//   }
//
//   setSelectedOption = (e) => {
//     const {name, value} = e.target;
//     this.setState(() => ({
//       [name]: value,
//     }));
//     console.log("set " + name + " to " + value);
//   }
//
//   //onChange function for Climate Radio Button Group
//   setClimateSelectedOption = (value) => {
//     this.setState({
//       selectedClimate: value,
//     })
//
//     if(value === "FirstOrder"){
//       //when user chooses First Order option
//       this.setState({
//         enabledFirstOrderDropdown: true, //disable the radio for first order
//         selectedKoppen: '', //set the state to nil for error checking
//         enabledKoppenDropdown: false,
//       })
//     }else{
//       //when user chooses Koppen options
//       this.setState({
//         enabledKoppenDropdown: true,
//         selectedFirstOrder: '', //set the state to nil to for error checking
//         enabledFirstOrderDropdown: false,
//       })
//     }
//   }
//
//   //onChange function for River Size Radio Button Group
//   setRiverSizeSelectedOption = (value) => {
//     this.setState({
//       selectedRiverSize: value,
//     })
//   }
//
//   //calculate River Depth based on the provided River Width using Scientific Formula
//   deriveRiverDepthFromWidth(){
//     return 0;
//   }
//
//   toggleRiverWidthAttr = () => {
//     this.setState( (prevState) => ({calculatedDepthUsingWidth: !prevState.calculatedDepthUsingWidth}) );
//
//     console.log("calculated depth using width:",this.state.calculatedDepthUsingWidth);
//   }
//
//   //toggle the state to display Form OR Result
//   toggleDisplayedResult = () => {
//     this.setState( (prevState) => ({displayedResult: !prevState.displayedResult}) );
//   }
//
//   //toggle the state to display Form OR Result
//   toggleSubmitted = () => {
//     this.setState( (prevState) => ({submitted: !prevState.submitted}) );
//   }
//
//   //onChange function for Precision Radio Button Group
//   setPrecisionSelectedOption = (value) => {
//     this.setState({
//       selectedPrecision: value,
//     })
//   }
//
//   //A function that set the max/min values for either the drainage_low/ drainage_high, crossSectionalArea_Min/ crossSectionalArea_Max, riverDepth_Min/ riverDepth_Max
//   setRangeValues = (e) => {
//     const {name, value}  = e.target;
//     if(value.length !== 0){
//       if(!isNaN(value)){
//         if(value <= 0){
//           this.setState(() => ({
//             [name]: "(positive number only)",
//           }));
//         }else{
//           this.setState(() => ({
//             [name]: value,
//           }));
//           console.log("set "+ name + " to " + value);
//         }
//       }else{
//         console.log(name + "is not a valid number");
//         this.setState(() => ({
//           [name]: "(positive number only)",
//         }));
//       }
//     }else{
//       console.log(name + "is empty");
//       this.setState({
//         [name]: "(positive number only)",
//       })
//     }
//   }
//
//   render(){
//     return(
//       <div>
//         {!this.state.submitted &&
//           <form onSubmit={this.handleSubmit} className="form">
//
//             <div className='back-button-div-tbd'>
//                <Link to="/" className=" back-button-link back-button-effect">Back</Link>
//             </div>
//
//             <h1 className='inline-page-title'>
//               TBD Approach
//             </h1>
//
//             {this.renderClimateOrders()}
//
//             {this.renderDrainageArea()}
//
//             {this.renderRiverSize()}
//
//             {this.renderTBDPrecision()}
//
//             {!this.state.inputs_validated &&
//             <div>
//               Please enter correct values for inputs...
//             </div>}
//
//             <button type="submit" onClick={this.handleSubmit} className="padding-grid margin-10">
//               Submit
//             </button>
//
//           </form>
//         }
//
//         {this.state.submitted &&
//           <div>
//             <button onClick={this.toggleSubmitted}>
//               Back
//             </button>
//
//             <RiverChannelsTable />
//           </div>
//         }
//       </div>
//
//     )
//   }
// }
//
// export default TBDApproach;

import React, { Component } from 'react';
//import other components

import { RiverChannelsTable } from "./Utils";
import TBDResult from './TBD/TBDResult';
import TBDAnalogFrame from './TBDAnalogFrame';
import '../assets/scss/include.scss';

class TBDApproach extends Component{
  render(){
    return(
      <div>
        <TBDAnalogFrame
          componentTitle="TBD Approach"
          displayedPresicion={true}
        />
      </div>
    )
  }
}

export default TBDApproach;
