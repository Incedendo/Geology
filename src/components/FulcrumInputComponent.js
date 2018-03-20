import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import '../assets/scss/include.scss';

const FulcrumInputComponent = ( { title, name, state, isValid, submitted, update, validate } ) => (
  <Grid key={title}>
    <Row className="padding-grid">
      <Col sm={4} md={6} className="rightAlignedText">
        {title}
      </Col>
      <Col sm={4} md={6} className="leftAlignedText">
        <input type="text" size="55"
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
);

export default FulcrumInputComponent;
