import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import '../assets/scss/LandingPage.css';
import '../assets/scss/include.scss';
import LandingPage from './LandingPage';
import logo from '../assets/image/final_rafter_logo.png';
import GeoDeptlogo from '../assets/image/SGEEwordmark.png';
import BrowserDetection from 'react-browser-detection';

const warning = () => (
  <div>
    For best user experience, please use Google Chrome Browser and update your browsers to the latest version.
  </div>
)

const browserHandler = {
  chrome: () => warning(),
  firefox: () => warning(),
  default: (browser) => warning(),
};

class Home extends Component {
  renderHeader = () => (
    <div>
      <div className="home-header purple-background">
        <h1 className="no-margin">
            R.A.F.T.E.R.
        </h1>
        <h3>
          River Analogues and Fulcrum Transport Estimates Repository
        </h3>
      </div>

    </div>
  )

  renderFooter = () => (
    <div className="home-footer purple-background">
      {/* <div className="warning">
        <BrowserDetection>
          {browserHandler}
        </BrowserDetection>
      </div> */}
      <div className="bottom-warning">
        For best user experience, please use Google Chrome Browser and update your browsers to the latest version.
      </div>

      <Grid className="">
        <Col md={2} className="left-div-img">
          <img
            className="img-left"
            src={logo}
            alt="etc"
          />
        </Col>

        <Col md={8}
          className="contact-div"
          style={{
            'margin-top': 'auto',
            'margin-bottom': 'auto'
          }}
        >
          <a className="white-text" href="https://sgee.tcu.edu/staff/john-holbrook-ph-d/">Contact</a>
        </Col>

        <Col md={2} className="right-div-img">
          <img
            className="img-right"
            src={GeoDeptlogo}
            alt="etc"
          />
        </Col>

      </Grid>


    </div>
  )

  render() {
    return(
      <div className="">

        {this.renderHeader()}

        <div className="div-landingpage">
            <LandingPage />
        </div>


        {this.renderFooter()}
      </div>
    )
  }
}

export default Home;
