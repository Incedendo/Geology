import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import '../assets/scss/include.scss';

class FulcrumResultComponent extends Component{
  render() {
    return(
      <Grid>
        <Row className="padding-grid">
          <Col sm={4} md={6} className="rightAlignedText">
            {this.props.fulcrumTitle}
          </Col>
          <Col sm={4} md={6} className="leftAlignedText">
            {this.props.returnedData}
         </Col>
        </Row>
      </Grid>
    )
  }
}

export default FulcrumResultComponent;
