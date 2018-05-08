import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import '../../assets/scss/include.scss';

const FulcrumResultComponent = ( {title, returnedData} ) => (
  <Grid>
    <Row className="padding-grid">
      <Col sm={4} md={6} className="rightAlignedText">
        {title}:
      </Col>
      <Col sm={4} md={6} className="leftAlignedText">
        {
          isNaN(returnedData) ? "No result." : returnedData.toFixed(7)
        }
     </Col>
    </Row>
  </Grid>
)

export default FulcrumResultComponent;
