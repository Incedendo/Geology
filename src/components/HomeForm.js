import React, { Component } from 'react';
import '../assets/scss/include.scss';
import HomeLinkComponent from './HomeLinkComponent';
import { Grid, Row, Col } from 'react-bootstrap';
import LandingPage from './LandingPage';

class HomeForm extends Component {
  // state = {
  //     fulcrumApproach: false,
  //     tbd: false,
  // };

  // toggleFulcrum = () => {
  //   // console.log("posting Fulcrum")
  //   this.setState((prevState) => ({fulcrumApproach: !prevState.fulcrumApproach}))
  //
  //   console.log("Fulcrum state: " + this.state.fulcrumApproach)
  // }
  //
  // toggleTBD = () => {
  //   // console.log("posting TBD")
  //   this.setState((prevState) => ({tbd: !prevState.tbd}))
  //
  //   console.log("TBD state: " + this.state.tbd)
  // }

  TBDSubscript(){
    const tbd = "BD";
    console.log(tbd.sub());
    return "T" + tbd.sub();
  }

  render() {
    return (
      <div>
        {/*-----------------------------------
           the intro tag to the page
           ----------------------------------*/}
        <div className="enclosing-border-intro">
            <LandingPage />
        </div>


        {/*-----------------------------------
           Second div containing the feature links
         ----------------------------------*/}
        <div >
          <Grid>
            <Col md={6}>
              {/*-----------------------------------
                 Fulcrum
               ----------------------------------*/}
              <div className="enclosing-border-separate-approach">
                <HomeLinkComponent
                  pathname='/FulcrumApproach'
                  linkTitle= 'Fulcrum'
                />
                <div>
                  this is the explaination of Fulcrum Apprach
                </div>
              </div>

              {/*-----------------------------------
                 TBD
               ----------------------------------*/}
              <div className="enclosing-border-separate-approach">
                <HomeLinkComponent
                  pathname='/TBDApproach'
                  linkTitle= 'TBD'
                />
                <div>
                  this is the explaination of {this.TBDSubscript()} Approach
                </div>
              </div>

              {/*-----------------------------------
                 Analog
               ----------------------------------*/}
              <div className="enclosing-border-separate-approach">
                <HomeLinkComponent
                  pathname='/AnalogChannels'
                  linkTitle= 'Analog Channel'
                />
                <div>
                  Allow users to search for Analog Streams
                </div>
              </div>
            </Col>

            <Col md={6}>
              <div className="
                enclosing-border-helpful-links
                inline
                ">

              </div>
            </Col>
          </Grid>
        </div>
      </div>
    )
  }
}

export default HomeForm;
