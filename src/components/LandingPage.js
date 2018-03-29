import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeLinkComponent from './HomeLinkComponent';
import '../assets/scss/LandingPage.css';
import FlipCard from 'react-flipcard';
import { Grid, Row, Col } from 'react-bootstrap';


class LandingPage extends Component{
  state = {
    displayedFulcrum: false,
    displayedTBD: false,
    displayedAnalog: false,

    isFlippedFulcrum: false,
    isFlippedTBD: false,
    isFlippedAnalog: false,
  }

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
      Fulcrum Approach Explanation
      <ul>
        <li>
          Leverage the Fulcrum approach to estimate source-to-sink sediment flux calculations using readily available data in the rock record of channel fill thickness and grainsize.
        </li>
        <li>
          Derive sediment flux estimates using a default value for the variable of average annual days of bankfull duration (tbd) or query adatabase of over 500 streams to input a more stream specific tbdvalue based on selected parameters of climate, drainage areaand/or channel size.
        </li>
      </ul>

      <div className="">
        <button>
          <HomeLinkComponent
            pathname='/FulcrumApproach'
            linkTitle= 'Go'
          />
        </button>
      </div>
    </div>
  )

  renderTBDContent = () => (
    <div className="background-img">
      TBD Approach Explanation
      <ul>
        <li>
          Query a database of over 500 streams, selecting stream specific attributes of climate, drainage area and/or channel size to calculate an average annual days at bankfull duration (tbd) value.
        </li>
      </ul>

      <div className="">
        <button >
          <HomeLinkComponent
            pathname='/TBDApproach'
            linkTitle= 'Go'
          />
        </button>
      </div>
    </div>
  )

  renderAnalogContent = () => (
    <div className="background-img">
      Analog Approach Explanation
      <ul>
        <li>
          Select parameters of climate, drainage area and/or channel size to query a database of over 600 streams and return all analogous rivers based on the designated attributes.
        </li>
      </ul>

      <div className="">
        <button>
          <HomeLinkComponent
            pathname='/AnalogChannels'
            linkTitle= 'Go'
          />
        </button>
      </div>
    </div>
  )

  renderTBDExpandOnClick = () => (
    <div className="enclosing-border-landing-page">
      <h3 className="approach">
        <a onClick={this.toggleDisplayTBD}>
          Bankfull Duration (tbd)
        </a>
      </h3>

      {this.state.displayedTBD &&
        <div>
          <ul>
            <li>
              Query a database of over 500 streams, selecting stream specific attributes of climate, drainage area and/or channel size to calculate an average annual days at bankfull duration (tbd) value.
            </li>
          </ul>

          <div className="">
            <button >
              <HomeLinkComponent
                pathname='/TBDApproach'
                linkTitle= 'Go'
              />
            </button>
          </div>

        </div>
      }
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

      {this.state.displayedAnalog &&
        <div>
          <ul>
            <li>
              Select parameters of climate, drainage area and/or channel size to query a database of over 600 streams and return all analogous rivers based on the designated attributes.
            </li>
          </ul>

          <div className="">
            <button>
              <HomeLinkComponent
                pathname='/AnalogChannels'
                linkTitle= 'Go'
              />
            </button>
          </div>

        </div>
      }

    </div>
  )

  renderFulcrumFlipCard = () => (
    <div className="Fulcrum">
      <div onClick={this.toggleIsFlippedFulcrum}>
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

  renderTBDFLipCard = () => (
    <div className="TBD">
      <div onClick={this.toggleIsFlippedTBD}>
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

  renderAnalogFlipCard = () => (
    <div className="Analog">
      <div onClick={this.toggleIsFlippedAnalog}>
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

  render(){
    return(
      <div className="leftAlignedText" >
        <Grid>
          <Row className="div-fulcrum-approach">
            {this.renderFulcrumFlipCard()}
          </Row>

          <Row className="div-TBD-approach">
            {this.renderTBDFLipCard()}
          </Row>

          <Row>
            {this.renderAnalogFlipCard()}
          </Row>

        </Grid>







      </div>
    )
  }
}

export default LandingPage;
