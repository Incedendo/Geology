import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import '../assets/scss/include.scss';

const FulcrumResultComponent = ( {title, returnedData} ) => (
  <Grid>
    <Row className="padding-grid">
      <Col sm={4} md={6} className="rightAlignedText">
        {title}: 
      </Col>
      <Col sm={4} md={6} className="leftAlignedText">
        {returnedData}
     </Col>
    </Row>
  </Grid>
)

export default FulcrumResultComponent;
