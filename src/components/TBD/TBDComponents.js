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

import '../../assets/scss/include.scss';

const rootColor = "#23CE2B";
const pointColor = "#FFFFFF";

/*
  The climate div component in TBD/Analogues Appraoch
*/

export const ClimateOrders = (props) => {

  console.log(props);

  var title = classNames({
    "leftAlignedText-Title": true,
    "title-error": props.submitClicked &&
    (props.selectedClimate === "" ||
      (props.selectedFirstOrder === "" && props.selectedKoppen === "")
    )
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
                   rootColor = "grey"
                   pointColor={pointColor}
                   iconInnerSize="0px"
                   selected={props.selectedClimate==="FirstOrder"}>
                   Major Climate
                 </RadioButton>
                 <RadioButton
                   value="KoppenClassification"
                   rootColor = "grey"
                   pointColor={pointColor}
                   iconInnerSize="0px"
                   selected={props.selectedClimate==="KoppenClassification"}>
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
              {props.enabledFirstOrderDropdown &&
                <Select
                  name="first-order"
                  value={props.climateFromDropdown && props.climateFromDropdown.value}
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

/*
  The Drainage Area div component in TBD/Analogues Appraoch
*/
export const DrainageArea = (props) => {

  //customized className for component's title for quick input validation

  var textfieldMin = classNames({
    'black-txt': true,
    'text-field-error': props.submitClicked && (props.drainage_low < 0 || props.drainage_low === "(positive number only)"),
  });

  var textfieldMax = classNames({
    'black-txt': true,
    'text-field-error': props.submitClicked && (props.drainage_high < 0 || props.drainage_low === "(positive number only)"),
  });

  var title = classNames({
    "leftAlignedText-Title": true,
    "title-error":props.submitClicked &&
    (
      props.drainage_low < 0 || props.drainage_high < 0 ||
      props.drainage_low === "(positive number only)" ||
      props.drainage_high === "(positive number only)"
    )
  })

  return(
    <div className="">
      <Grid className="padding-grid">
          <Col md={3} className={title}>
            <div className="">
              <div
                style={{
                  'margin-left': '5px',
                  display: 'inline-block'
                }}
              >
                Drainage Area (
              </div>
              <BaseSupSub style={{ display: 'inline-block' }} base="km" sup="2" />
              <div
                style={{
                  'margin-left': '5px',
                  display: 'inline-block'
                }}
              >
              ):
              </div>
            </div>
          </Col>
          <Col md={9} className="leftAlignedText">
            <Grid>
              <Col sm={12} md={4}>
                Min: <input
                  type="textbox"
                  name="drainage_low"
                  className={textfieldMin}
                  onBlur={props.setRangeValues}
                  value={props.drainage_low}
                  onChange={props.updateFieldValue}
                />
              </Col>
              <Col sm={12} md={4}>
                Max: <input
                  type="textbox"
                  name="drainage_high"
                  className={textfieldMax}
                  onBlur={props.setRangeValues}
                  value={props.drainage_high}
                  onChange={props.updateFieldValue}
                />
              </Col>
            </Grid>
         </Col>
      </Grid>
    </div>
  )
}

/*
  The River div component in TBD/Analogues Appraoch
*/
export const RiverSize = (props) => {

  //customized className for component's title for quick input validation
  var textfieldMin = classNames({
    'black-txt': true,
    'text-field-error': props.submitClicked && props.riverMin < 0,
  });

  var textfieldMax = classNames({
    'black-txt': true,
    'text-field-error': props.submitClicked && props.riverMax < 0,
  });

  var title = classNames({
    "leftAlignedText-Title": true,
    "title-error": props.submitClicked &&
    (
      props.riverMin < 0 || props.riverMax < 0 ||
      props.riverMin === "(positive number only)" ||
      props.riverMax === "(positive number only)"
    )
  })

  return(
    <div className="">
      <Grid className="padding-grid">
        <Col md={2} className={title}>
            River Size:
        </Col>
        <Col md={9} className="leftAlignedText">

           <RadioGroup
             onChange={ props.setRiverSizeSelectedOption } horizontal
           >
             <RadioButton
               value="RiverDepth"
               rootColor = "grey"
               pointColor={pointColor}
               iconInnerSize="0px"
             >
               River Depth (m)
             </RadioButton>
             <RadioButton
               value="CrossSectionalArea"
               rootColor = "grey"
               pointColor={pointColor}
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
                 <BaseSupSub style={{ display: 'inline-block' }} base="m" sup="2" />
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

      {this.selectedRiverSize !== '' &&
      <Grid className="padding-grid">
        <Col sm={12} md={3} className="rightAlignedText">

        </Col>

        <Col sm={12} md={9} className="leftAlignedText">
          <Grid>
            <Col sm={12} md={4}>
              Min: <input
                type="textbox"
                name="riverLow"
                className={textfieldMin}
                onBlur={props.setRangeValues}
                onChange={props.updateFieldValue}
                value={props.riverMin}
              />
            </Col>
            <Col sm={12} md={4}>
              Max: <input
                type="textbox"
                name="riverHigh"
                className={textfieldMax}
                onBlur={props.setRangeValues}
                onChange={props.updateFieldValue}
                value={props.riverMax}
              />
            </Col>
          </Grid>
        </Col>
      </Grid>
      }


      <div>
        <Grid>
          <Row>
            <Col sm={12} md={2}></Col>
            <Col sm={12} md={9}>
              <input
                type="checkbox"
                onChange={props.toggleRiverWidthAttr}
                className="leftAlignedText"
              /> Derive Width from River Depth (optional)
            </Col>
          </Row>
          <Row>
            {props.calculatedDepthUsingWidth &&
              <div>
                <input
                  type="textbox"
                  name="riverWidth"
                  className="black-txt"
                  value={props.riverWidth}
                  onBlur={props.setRiverWidth}
                  onChange={props.updateFieldValue}
                />
              </div>
            }
          </Row>
        </Grid>
      </div>
    </div>
  )
}

/*
  The Precision div component in TBD/Analogues Appraoch
*/

export const TBDPrecision = (props) =>{

  //customized className for component's title for quick input validation

  var title = classNames({
    "leftAlignedText-Title": true,
    "title-error": props.submitClicked && props.selectedPrecision === ""
  })

  return(
    <div className="">
      <Grid className="padding-grid">
        <Col sm={12} md={2} className={title}>
            Precision:
        </Col>
        <Col sm={12} md={9} className="leftAlignedText">

          <RadioGroup
            onChange={ props.setPrecisionSelectedOption } horizontal
          >
            <RadioButton
              value="10%"
              rootColor = "grey"
              pointColor={pointColor}
              iconInnerSize="0px"
            >
              10%
            </RadioButton>
            <RadioButton
              value="20%"
              rootColor = "grey"
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
