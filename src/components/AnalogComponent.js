import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/scss/include.scss';

const FieldTitles = [
  "Climate 1st Order",
  "Climate 2nd Order",
  "Climate 3rd Order",
  "Drainage Area",
  "River  Size",
]

class AnalogComponent extends Component{

  renderAnalogUnit = (title) => (
      <Grid className="padding-grid" key={title}>
          <Col sm={4} md={6} className="rightAlignedText">
              {title}
          </Col>
          <Col sm={4} md={6} className="leftAlignedText">
            {this.renderClimateOrders()}
            {this.renderDrainageArea()}
            {this.renderRiverSize()}
         </Col>
      </Grid>
  )

  renderClimateOrders = () => (
    <div>
      <select name="analogOptions">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="fiat">Fiat</option>
        <option value="audi">Audi</option>
      </select>
    </div>
  )

  renderDrainageArea = () => (
    <div>

    </div>
  )

  renderRiverSize = () => (
    <div>

    </div>
  )

  render(){
    return(
      <div>
        <h1>
          Analog Channels
        </h1>

        <div className="">
           <Link to="/">Back</Link>
        </div>

        {FieldTitles.map( title => this.renderAnalogUnit(title) )}
      </div>
    )
  }
}


export default AnalogComponent;
