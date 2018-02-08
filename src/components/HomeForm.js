import React, { Component } from 'react';
import '../assets/scss/include.scss';
import HomeLinkComponent from './HomeLinkComponent';
import { Grid, Row, Col } from 'react-bootstrap';

class HomeForm extends Component {
  state = {
      fulcrumApproach: false,
      tbd: false,
  };

  toggleFulcrum = () => {
    // console.log("posting Fulcrum")
    this.setState((prevState) => ({fulcrumApproach: !prevState.fulcrumApproach}))

    console.log("Fulcrum state: " + this.state.fulcrumApproach)
  }

  toggleTBD = () => {
    // console.log("posting TBD")
    this.setState((prevState) => ({tbd: !prevState.tbd}))

    console.log("TBD state: " + this.state.tbd)
  }

  render() {
    return (
      <Grid>
        <Col md={4}>
          <HomeLinkComponent
            pathname='/FulcrumApproach'
            linkTitle= 'Fulcrum'
          />
          <div>
            this is the explaination of Fulcrum Apprach
          </div>
        </Col>

        <Col md={4}>
          <HomeLinkComponent
            pathname='/TBDApproach'
            linkTitle= 'TBD'
          />
          <div>
            this is the explaination of TBD Apprach
          </div>
        </Col>

        <Col md={4}>
          <HomeLinkComponent
            pathname='/AnalogChannels'
            linkTitle= 'Analog Channel'
          />
          <div>
            Allow users to search for Analog Streams
          </div>
        </Col>

      </Grid>
    )
  }
}

export default HomeForm;
