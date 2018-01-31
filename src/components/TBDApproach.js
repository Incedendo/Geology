import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import '../assets/scss/include.scss';

const FieldTitles = [
  "Climate 1st Order",
  "Climate 2nd Order",
  "Climate 3rd Order",
  "Drainage Area",
  "River  Size"
]

const renderUnit = (title) => (
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

const handleSubmit = (e) => {
    console.log("handle submit in TBD")
    e.preventDefault();
}

const TBDApproach = () => (
  <form>
    <h1>
      TBD Approach
    </h1>
    {FieldTitles.map(
      title => renderUnit(title)
    )}

    <button type="submit" onClick={handleSubmit} className="padding-grid margin-10">
      Submit
    </button>
  </form>
)


export default TBDApproach;
