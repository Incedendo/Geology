import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import '../../assets/scss/include.scss';
import '../../assets/scss/_fulcrumApproach.scss';

const FulcrumInputComponent = ( { title, name, state, isValid, submitted, update, validate } ) => {

  return(
    <Grid key={title}>
      <Row
        className="padding-grid"
        style={{
          'margin-left': '60px !important',
        }}
      >
        <Col xs={12} sm={12} md={6} className="fulcrum-input-title">
          {title}:
        </Col>
        <Col xs={12} sm={12} md={6} className="leftAlignedText">
          <input
            type="text" size="55"

            className={submitted && !isValid ? "black-txt imput-error" : "black-txt" }

            placeholder="enter a positive number"
            name={name}
            value={state}
            onChange={update}
            onBlur={validate}
          />
          { submitted && !isValid &&
          <div style={{color: "red"}}>
            Invalid input
          </div>}
       </Col>
      </Row>
    </Grid>
  )
}

export default FulcrumInputComponent;
