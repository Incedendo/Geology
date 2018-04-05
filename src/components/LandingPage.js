import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeLinkComponent from './HomeLinkComponent';
import '../assets/scss/LandingPage.css';
import FlipCard from 'react-flipcard';
import { Grid, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';

class LandingPage extends Component{
  state = {
    displayedFulcrum: false,
    displayedTBD: false,
    displayedAnalog: false,

    isFlippedFulcrum: false,
    isFlippedTBD: false,
    isFlippedAnalog: false,

    isHoveredFulcrum: false,
    isHoveredTBD: false,
    isHoveredAnalog: false,
  }

  set = (id) => (e) => this.setState({[id]: true});

  unset = (id) => (e) => this.setState({[id]: false});

  toggleDisplayFulcrum = (event) => {
    event.preventDefault();
    this.setState( (prevState) => ({displayedFulcrum: !prevState.displayedFulcrum}) );
  }

  toggleIsFlippedFulcrum = () => {
    this.setState( (prevState) => ({isFlippedFulcrum: !prevState.isFlippedFulcrum}) );
  }

  toggleDisplayTBD = (event) => {
    event.preventDefault();
    this.setState( (prevState) => ({displayedTBD: !prevState.displayedTBD}) );
  }

  toggleIsFlippedTBD = () => {
    this.setState( (prevState) => ({isFlippedTBD: !prevState.isFlippedTBD}) );
  }

  toggledisplayAnalog = (event) => {
    event.preventDefault();
    this.setState( (prevState) => ({displayedAnalog: !prevState.displayedAnalog}) );
  }

  toggleIsFlippedAnalog = () => {
    this.setState( (prevState) => ({isFlippedAnalog: !prevState.isFlippedAnalog}) );
  }

  renderFulcrumContent = () => (
    <div className="background-img">
      Fulcrum Approach:
      <ul>
        <li>
          Leverage the Fulcrum approach to estimate source-to-sink sediment flux calculations using readily available data in the rock record of channel fill thickness and grainsize.
        </li>
        <li>
          Derive sediment flux estimates using a default value for the variable of average annual days of bankfull duration (tbd) or query adatabase of over 500 streams to input a more stream specific tbdvalue based on selected parameters of climate, drainage areaand/or channel size.
        </li>
      </ul>

      {this.renderGoBtn('/FulcrumApproach')}
    </div>
  )

  renderTBDContent = () => (
    <div className="background-img">
      TBD Approach:
      <ul>
        <li>
          Query a database of over 500 streams, selecting stream specific attributes of climate, drainage area and/or channel size to calculate an average annual days at bankfull duration (tbd) value.
        </li>
      </ul>

      {this.renderGoBtn('/TBDApproach')}
    </div>
  )

  renderAnalogContent = () => (
    <div className="background-img">
      Analog Approach:
      <ul>
        <li>
          Select parameters of climate, drainage area and/or channel size to query a database of over 600 streams and return all analogous rivers based on the designated attributes.
        </li>
      </ul>

      {this.renderGoBtn('/AnalogChannels')}
    </div>
  )

  renderGoBtn = (path) => (
    <div className="btn-go-div">
      <button className='btn-go'>
        <HomeLinkComponent
          pathname={path}
          linkTitle= 'Go'
        />
      </button>
    </div>
  )

  renderFulcrumOnClick = () => (
    <div className="enclosing-border-landing-page">
      {/* <h3 className="approach">
        <a onClick={this.toggleDisplayFulcrum}>
          Fulcrum Approach
        </a>
      </h3>

      {this.state.displayedFulcrum && this.renderFulcrumContent()}  */}

      {this.renderFulcrumContent()}
    </div>
  )

  renderTBDExpandOnClick = () => (
    <div className="enclosing-border-landing-page">
      <h3 className="approach">
        <a onClick={this.toggleDisplayTBD}>
          Bankfull Duration (tbd)
        </a>
      </h3>

      {this.state.displayedTBD && this.renderTBDContent()}
    </div>
  )

  renderAnalogExplanOnClick = () => (
    <div className="enclosing-border-landing-page">
      <h3 className="approach">
        <a
          onClick={this.toggledisplayAnalog}
        >
          River Analogue Search
        </a>
      </h3>

      {this.state.displayedAnalog && this.renderAnalogContent()}

    </div>
  )

  renderFulcrumFlipCard = () => {

    var hoverClass = classNames({
      "hover": this.state.isHoveredFulcrum,
    })

    return(
      <div className="Fulcrum">
        <div
          onClick={this.toggleIsFlippedFulcrum}
          onMouseEnter={this.set("isHoveredFulcrum")}
          onMouseLeave={this.unset("isHoveredFulcrum")}
          className={hoverClass}
        >
          <FlipCard
            disabled={true}
            flipped={this.state.isFlippedFulcrum}
            style={{
              "width": "100%",
            }}
          >
            <div className="flipcard-div">
              <h3 className="approach">
                Fulcrum Approach
              </h3>
            </div>

            {this.renderFulcrumContent()}

          </FlipCard>
        </div>
      </div>
    )
  }

  renderTBDFLipCard = () => {
    var hoverClass = classNames({
      "hover": this.state.isHoveredTBD
    })

    return(
      <div className="TBD">
        <div
          onClick={this.toggleIsFlippedTBD}
          onMouseEnter={this.set("isHoveredTBD")}
          onMouseLeave={this.unset("isHoveredTBD")}
          className={hoverClass}
        >
          <FlipCard
            disabled={true}
            flipped={this.state.isFlippedTBD}
            style={{
              "width": "100%",
            }}
          >
            <div className="flipcard-div">
              <h3 className="approach">
                TBD Approach
              </h3>
            </div>

            {this.renderTBDContent()}

          </FlipCard>
        </div>
      </div>
    )
  }

  renderAnalogFlipCard = () => {
    var hoverClass = classNames({
      "hover": this.state.isHoveredAnalog,
    })

    return(
      <div className="Analog">
        <div
          onClick={this.toggleIsFlippedAnalog}
          onMouseEnter={this.set("isHoveredAnalog")}
          onMouseLeave={this.unset("isHoveredAnalog")}
          className={hoverClass}
        >
          <FlipCard
            disabled={true}
            flipped={this.state.isFlippedAnalog}
            style={{
              "width": "100%",
            }}
          >
            <div className="flipcard-div">
              <h3 className="approach">
                Analog Approach
              </h3>
            </div>

            {this.renderAnalogContent()}

          </FlipCard>
        </div>
      </div>
    )
  }

  render(){
    return(
      <div className="main-div-top-margin">
        <Grid className="">
          <Col lg={9} md={8} sm={6} xs={12} className="leftAlignedText">
            <Row className="div-analog-approach">
              {this.renderAnalogContent()}
            </Row>

            <Row className="div-TBD-approach">
              {this.renderTBDContent()}
            </Row>

            <Row className="div-fulcrum-approach">
              {this.renderFulcrumContent()}
            </Row>
          </Col>

          <Col lg={3} md={4} sm={6}>
            <div className="div-helpful rounded-border purple-background">
              <h3 className="div-helpful-link">
                Helpful Links
              </h3>
              <div className="div-helpful-link">
                <HomeLinkComponent
                  pathname='/helpfullinks'
                  linkTitle= 'Research Documents/ White papers'
                />
              </div>
              <div className="div-helpful-link">
                <HomeLinkComponent
                  pathname='/helpfullinks'
                  linkTitle= 'Research Documents/ White papers'
                />
              </div>
              <div className="div-helpful-link">
                <HomeLinkComponent
                  pathname='/helpfullinks'
                  linkTitle= 'Research Documents/ White papers'
                />
              </div>

            </div>
          </Col>

        </Grid>

      </div>
    )
  }
}

export default LandingPage;
