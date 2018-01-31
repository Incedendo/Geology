import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const FieldTitlesFulcrum = [
  "Average Bankfull  Channel  Depth,  Hbf (m)[dm=0.5(channel  story  thickness)]",
  "Bankful Channel Width, Bbf (m)",
  "Hydraulic  Radius (m),  R",
  "D16 (mm)",
  "D50 (mm)",
  "D84 (mm)",
  "D90 (mm)",
  "Sediment Density (g/cm^3)",
  "Dimensionless Multiplier,  b. [b=1/(bankfull  annual  proportion)]"
]

const FieldTitlesTBD = [
  "Climate 1st Order",
  "Climate 2nd Order",
  "Climate 3rd Order",
  "Drainage Area",
  "River  Size"
]

const renderUnitFulcrum = (title) => (
  <Grid className="padding-grid">
      <Col sm={4} md={6} className="rightAlignedText">
        {title}
      </Col>
      <Col sm={4} md={6} className="leftAlignedText">
        <input type="text" size="55"/>
     </Col>
  </Grid>
)

const renderUnitTBD = (title) => (
  <Grid className="padding-grid">
      <Col sm={4} md={6} className="rightAlignedText">
        {title}
      </Col>
      <Col sm={4} md={6} className="leftAlignedText">
        <select name="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>
     </Col>
  </Grid>

)


class BothApproach extends Component {

  handleSubmit = (e) => {
      console.log("handle submit in BOTH")
      e.preventDefault();
  }

  render() {
    console.log("...preparing to display...Fulcrum");
    return (
      <form>
        <h1>
          Fulcrum and TBD Approach Combined
        </h1>
        {FieldTitlesFulcrum.map(
          title => renderUnitFulcrum(title)
        )}
        {FieldTitlesTBD.map(
          title => renderUnitTBD(title)
        )}

        <button type="submit" onClick={this.handleSubmit} className="padding-grid margin-10">
          Submit
        </button>
      </form>
    )
  }
}

export default BothApproach;
