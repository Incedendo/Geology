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
// import RiverChannelsTable  from "./TBD/RiverChannelsTable";

import '../../assets/scss/include.scss';

export const ClimateOrders = (props) => {

  var title = classNames({
    "leftAlignedText-Title": true,
    "title-error": props.submitClicked && props.selectedClimate === ""
  })

  var selectColorError = classNames({
    "error-color-First-order": props.submitClicked && props.selectedFirstOrder === "",
    "error-color-Koppen": props.submitClicked &&  props.selectedKoppen === "",
  })

  return(
    <div className="">
      <Grid className="padding-grid">
        <Row>
          <Col sm={4} md={2} className={title}>
              Climate:
          </Col>

          <Col sm={4} md={9} className="leftAlignedText">
             <div >
               <RadioGroup
                 onChange={ props.setClimateSelectedOption } horizontal
               >
                 <RadioButton
                   value="FirstOrder"
                   pointColor="green"
                   selected={props.selectedClimate==="FirstOrder"}>
                   First Order
                 </RadioButton>
                 <RadioButton
                   value="KoppenClassification"
                   pointColor="green"
                   selected={props.selectedClimate==="KoppenClassification"}>
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
              {props.enabledFirstOrderDropdown &&
                <Select
                  name="first-order"
                  value={props.climateFromDropdown && props.climateFromDropdown.value}
                  // className={selectColorError}
                  onChange={props.handleClimateSelectionChangeDropDown}
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

             {props.enabledKoppenDropdown &&
               <Select
                 name="first-order"
                 value={props.climateFromDropdown && props.climateFromDropdown.value}
                 onChange={props.handleClimateSelectionChangeDropDown}
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

export const DrainageArea = (props) => {

  var textfieldMin = classNames({
    'text-field-error': props.submitClicked && (props.drainage_low <= 0 || props.drainage_low === "(positive number only)"),
  });

  var textfieldMax = classNames({
    'text-field-error': props.submitClicked && (props.drainage_high <= 0 || props.drainage_low === "(positive number only)"),
  });

  var title = classNames({
    "leftAlignedText-Title": true,
    "title-error":props.submitClicked &&
    (
      props.drainage_low <= 0 || props.drainage_high <= 0 ||
      props.drainage_low === "(positive number only)" ||
      props.drainage_high === "(positive number only)"
    )
  })

  return(
    <div className="">
      <Grid className="padding-grid">
          <Col sm={4} md={2} className={title}>
              Drainage Area (meter squared):
          </Col>
          <Col sm={4} md={10} className="leftAlignedText">
            <div className="inline-with-right-margin">
              Min: <input type="textbox"
                name="drainage_low"
                className={textfieldMin}
                onBlur={props.setRangeValues}
                value={props.drainage_low}
                onChange={props.updateFieldValue}
              />
            </div>
            <div className="inline-no-right-margin">
              Max: <input type="textbox"
                name="drainage_high"
                className={textfieldMax}
                onBlur={props.setRangeValues}
                value={props.drainage_high}
                onChange={props.updateFieldValue}
              />
            </div>
         </Col>
      </Grid>
    </div>
  )
}

export const RiverSize = (props) => {
  var textfieldDepthMin = classNames({
    'text-field-error': props.submitClicked && props.riverDepth_Min <= 0,
  });

  var textfieldDepthMax = classNames({
    'text-field-error': props.submitClicked && props.riverDepth_Max <= 0,
  });

  var textfieldAreaMin = classNames({
    'text-field-error': props.submitClicked && props.crossSectionalArea_Min <= 0,
  });

  var textfieldAreaMax = classNames({
    'text-field-error': props.submitClicked && props.crossSectionalArea_Max <= 0,
  });

  var title = classNames({
    "leftAlignedText-Title": true,
    "title-error": props.submitClicked &&
    (
      props.selectedRiverSize === "" ||
      props.riverDepth_Min <= 0 || props.riverDepth_Max <= 0 ||
      props.riverDepth_Min === "(positive number only)" ||
      props.riverDepth_Max === "(positive number only)" ||
      props.crossSectionalArea_Min <= 0 || props.crossSectionalArea_Max <= 0 ||
      props.crossSectionalArea_Min === "(positive number only)" ||
      props.crossSectionalArea_Max === "(positive number only)"
    )
  })

  return(
    <div className="">
      <Grid className="padding-grid">
        <Col sm={4} md={2} className={title}>
            River Size:
        </Col>
        <Col sm={4} md={9} className="leftAlignedText">

           <RadioGroup
             onChange={ props.setRiverSizeSelectedOption } horizontal
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
          {props.selectedRiverSize === "RiverDepth" &&
          <div>
            <div className="inline-with-right-margin">
              Min: <input type="textbox"
                name="riverLow"
                className={textfieldDepthMin}
                onBlur={props.setRangeValues}
                onChange={props.updateFieldValue}
                value={props.riverDepth_Min}
              />
            </div>
            <div className="inline-no-right-margin">
              Max: <input type="textbox"
                name="riverHigh"
                className={textfieldDepthMax}
                onBlur={props.setRangeValues}
                onChange={props.updateFieldValue}
                value={props.riverDepth_Max}
              />
            </div>
          </div>
          }

          {props.selectedRiverSize === "CrossSectionalArea" &&
          <div>
            <div className="inline-with-right-margin">
              Min: <input type="textbox"
                name="riverLow"
                className={textfieldAreaMin}
                onBlur={props.setRangeValues}
                onChange={props.updateFieldValue}
                value={props.crossSectionalArea_Min}
              />
            </div>
            <div className="inline-no-right-margin">
              Max: <input type="textbox"
                name="riverHigh"
                className={textfieldAreaMax}
                onBlur={props.setRangeValues}
                onChange={props.updateFieldValue}
                value={props.crossSectionalArea_Max}
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
              onChange={props.toggleRiverWidthAttr}
              className="leftAlignedText"
            /> Derive Width from River Depth (optional)
          </Col>
        </Grid>
      </div>
    </div>
  )
}

export const TBDPrecision = (props) =>{
  var title = classNames({
    "leftAlignedText-Title": true,
    "title-error": props.submitClicked && props.selectedPrecision === ""
  })

  return(
    <div className="">
      <Grid className="padding-grid">
        <Col sm={4} md={2} className={title}>
            Precision:
        </Col>
        <Col sm={4} md={9} className="leftAlignedText">

          <RadioGroup
            onChange={ props.setPrecisionSelectedOption } horizontal
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
