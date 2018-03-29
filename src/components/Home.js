import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import '../assets/scss/LandingPage.css';
import '../assets/scss/include.scss';
import LandingPage from './LandingPage';
import HomeLinkComponent from './HomeLinkComponent';


class Home extends Component {
  renderHeader = () => (
    <div>
      <h1 className="center greenText">
          R.A.F.T.E.R
      </h1>

      <h3 style={{"text-align": "center"}}>
        River Analogue Fulcrum Theory Estimate Repository
      </h3>
    </div>
  )

  render() {
    return(
      <div >
        {this.renderHeader()}

        <Grid>
          <Col md={8}>
            <LandingPage />
          </Col>

          <Col md={4}>
            <div className="enclosing-border-landing-page">
              <HomeLinkComponent
                pathname='/helpfullinks'
                linkTitle= 'Research Documents/ White papers'
              />
            </div>
          </Col>
        </Grid>

        {/* <HomeForm /> */}
      </div>
    )
  }
}

export default Home;
