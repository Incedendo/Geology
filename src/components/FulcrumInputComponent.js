import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import '../assets/scss/include.scss';

class FulcrumInputComponent extends Component{
  render() {
    return(
      <Grid>
        <Row className="padding-grid">
          <Col sm={4} md={6} className="rightAlignedText">
            {this.props.fulcrumTitle}
          </Col>
          <Col sm={4} md={6} className="leftAlignedText">
            <input type="text" size="55"
              name={this.props.name}
              value={this.props.inputState}
              onChange={this.props.onChange}
            />
         </Col>
        </Row>
      </Grid>
    )
  }
}

export default FulcrumInputComponent;
