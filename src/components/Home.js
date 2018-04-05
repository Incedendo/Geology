import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import '../assets/scss/LandingPage.css';
import '../assets/scss/include.scss';
import LandingPage from './LandingPage';
import HomeLinkComponent from './HomeLinkComponent';
import logo from '../assets/image/final_rafter_logo.png';

class Home extends Component {
  renderHeader = () => (
    <div className="home-header">
      <h1 className="no-margin">
          R.A.F.T.E.R
      </h1>

      <h3>
        River Analogue Fulcrum Theory Estimate Repository
      </h3>
    </div>
  )

  renderFooter = () => (
    <div className="home-footer">

      <Grid className="">
        <Col md={2} className="left-div-img">
          <img
            className="img-left"
            src={logo}
            alt="etc"
          />
        </Col>

        <Col md={8} className="contact-div">
          <a className="white-text" href="">Contact</a>
        </Col>

        <Col md={2} className="right-div-img">
          <img
            className="img-right"
            src={logo}
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
