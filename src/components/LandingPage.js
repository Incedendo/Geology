import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeLinkComponent from './HomeLinkComponent';
import '../assets/scss/LandingPage.css';
import FlipCard from 'react-flipcard';
import { Grid, Row, Col } from 'react-bootstrap';
import BaseSupSub from 'react-basesupsub';
import classNames from 'classnames';

import logo from '../assets/image/final_rafter_logo.png';
import GeoDeptlogo from '../assets/image/SGEEwordmark.png';

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

  renderFulcrumContent = () => (
    <div className="background-img">
      <div className="yellow-text"
        style={{
          'font-size': '25px',
          'text-align': 'center'
        }}
        >Fulcrum Theory Approach Sediment Flux Estimates</div>
      <ul>
        <li>
          Leverage the Fulcrum approach to estimate source-to-sink sediment flux calculations using readily available data in the rock record of channel fill thickness and grainsize.
        </li>
        <li>
          Derive sediment flux estimates using a default value for the variable of average annual days of bankfull duration
          <span> </span>
          <span>
             <BaseSupSub style={{ display: 'inline-block' }} base="t" sub="bd" />
          </span> or query adatabase of over 500 streams to input a more stream specific
          <span> </span>
          <span>
             <BaseSupSub style={{ display: 'inline-block' }} base="t" sub="bd" />
          </span> value based on selected parameters of climate, drainage area and/or channel size.
        </li>
      </ul>

      {this.renderGoBtn('/FulcrumApproach')}
    </div>
  )

  renderTBDContent = () => (
    <div className="background-img">
      <div className="yellow-text"
        style={{
          'font-size': '25px',
          // 'font-weight': 'bold',
          'text-align': 'center'
        }}
        >
        <div
          style={{
            'margin-left': '5px',
            display: 'inline-block'
          }}
        >
          Stream Specific Bankfull Duration (
        </div>
        <BaseSupSub style={{ display: 'inline-block' }} base="t" sub="bd" />
        <div
          style={{
            'margin-left': '5px',
            display: 'inline-block'
          }}
        >
          )
        </div>
      </div>

      <ul>
        <li>
          Query a database of over 500 streams, selecting stream specific attributes of climate, drainage area and/or channel size to calculate an average annual days at bankfull duration
          <span> </span>
          <span>
            <BaseSupSub style={{ display: 'inline-block' }} base="t" sub="bd" />
          </span> value.
        </li>
      </ul>

      {this.renderGoBtn('/TBDApproach')}
    </div>
  )

  renderAnalogContent = () => (
    <div className="background-img">
      <div className="yellow-text"
        style={{
          'font-size': '25px',
          // 'font-weight': 'bold',
          'text-align': 'center'
        }}
      >River Analogues</div>
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
          className="blue-text"
          pathname={path}
          linkTitle= 'Go'
        />
      </button>
    </div>
  )

  renderFooter = () => (
    <div className="home-footer purple-background">

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

  render(){
    return(
      <div className="main-div-top-margin grey">
        <Grid className="">
          <Col lg={9}
             className="leftAlignedText">
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

          <Col lg={3} >
            <div className="div-helpful rounded-border purple-background">
              <h3 className="center-text yellow-text">
                Helpful Links
              </h3>

              <div className="div-helpful-link">
                <a className="white-text"
                  href="https://s3.amazonaws.com/rafter-ui-bucket/Holbrook+and+Wanas%2C+2014.pdf">1. Holbrook and Wanas, 2014 (pdf)</a>
              </div>

              <div className="div-helpful-link">
                <a className="white-text"
                  href="https://s3.amazonaws.com/rafter-ui-bucket/Fulcrum+Test+Claculations+Spread+Sheet.xlsx">2. Original Fulcrum Theory Approach (xlsx)</a>
              </div>

              <div className="div-helpful-link">
                <a className="white-text"href="https://sgee.tcu.edu/staff/john-holbrook-ph-d/">3. Dr Holbrook's Home Page</a>
              </div>

              <div className="div-helpful-link">
                <a className="white-text"
                  href="https://frg.leeds.ac.uk">4. Fluvial Research Group Main Page</a>
              </div>

              <div className="div-helpful-link">
                <a className="white-text"
                  href="">5. References (pdf)</a>
              </div>

            </div>
          </Col>

        </Grid>

        {/* {this.renderFooter()} */}

      </div>
    )
  }
}

export default LandingPage;

// renderFulcrumOnClick = () => (
//   <div className="enclosing-border-landing-page">
//     {/* <h3 className="approach">
//       <a onClick={this.toggleDisplayFulcrum}>
//         Fulcrum Approach
//       </a>
//     </h3>
//
//     {this.state.displayedFulcrum && this.renderFulcrumContent()}  */}
//
//     {this.renderFulcrumContent()}
//   </div>
// )
//
// renderTBDExpandOnClick = () => (
//   <div className="enclosing-border-landing-page">
//     <h3 className="approach">
//       <a onClick={this.toggleDisplayTBD}>
//         Bankfull Duration (tbd)
//       </a>
//     </h3>
//
//     {this.state.displayedTBD && this.renderTBDContent()}
//   </div>
// )
//
// renderAnalogExplanOnClick = () => (
//   <div className="enclosing-border-landing-page">
//     <h3 className="approach">
//       <a
//         onClick={this.toggledisplayAnalog}
//       >
//         River Analogue Search
//       </a>
//     </h3>
//
//     {this.state.displayedAnalog && this.renderAnalogContent()}
//
//   </div>
// )
//
// renderFulcrumFlipCard = () => {
//
//   var hoverClass = classNames({
//     "hover": this.state.isHoveredFulcrum,
//   })
//
//   return(
//     <div className="Fulcrum">
//       <div
//         onClick={this.toggleIsFlippedFulcrum}
//         onMouseEnter={this.set("isHoveredFulcrum")}
//         onMouseLeave={this.unset("isHoveredFulcrum")}
//         className={hoverClass}
//       >
//         <FlipCard
//           disabled={true}
//           flipped={this.state.isFlippedFulcrum}
//           style={{
//             "width": "100%",
//           }}
//         >
//           <div className="flipcard-div">
//             <h3 className="approach green-text">
//               Fulcrum Approach
//             </h3>
//           </div>
//
//           {this.renderFulcrumContent()}
//
//         </FlipCard>
//       </div>
//     </div>
//   )
// }
//
// renderTBDFLipCard = () => {
//   var hoverClass = classNames({
//     "hover": this.state.isHoveredTBD
//   })
//
//   return(
//     <div className="TBD">
//       <div
//         onClick={this.toggleIsFlippedTBD}
//         onMouseEnter={this.set("isHoveredTBD")}
//         onMouseLeave={this.unset("isHoveredTBD")}
//         className={hoverClass}
//       >
//         <FlipCard
//           disabled={true}
//           flipped={this.state.isFlippedTBD}
//           style={{
//             "width": "100%",
//           }}
//         >
//           <div className="flipcard-div">
//             <h3 className="approach green-text">
//               TBD Approach
//             </h3>
//           </div>
//
//           {this.renderTBDContent()}
//
//         </FlipCard>
//       </div>
//     </div>
//   )
// }
//
// renderAnalogFlipCard = () => {
//   var hoverClass = classNames({
//     "hover": this.state.isHoveredAnalog,
//   })
//
//   return(
//     <div className="Analog">
//       <div
//         onClick={this.toggleIsFlippedAnalog}
//         onMouseEnter={this.set("isHoveredAnalog")}
//         onMouseLeave={this.unset("isHoveredAnalog")}
//         className={hoverClass}
//       >
//         <FlipCard
//           disabled={true}
//           flipped={this.state.isFlippedAnalog}
//           style={{
//             "width": "100%",
//           }}
//         >
//           <div className="flipcard-div">
//             <h3 className="approach green-text">
//               Analog Approach
//             </h3>
//           </div>
//
//           {this.renderAnalogContent()}
//
//         </FlipCard>
//       </div>
//     </div>
//   )
// }

// set = (id) => (e) => this.setState({[id]: true});
//
// unset = (id) => (e) => this.setState({[id]: false});
//
// toggleDisplayFulcrum = (event) => {
//   event.preventDefault();
//   this.setState( (prevState) => ({displayedFulcrum: !prevState.displayedFulcrum}) );
// }
//
// toggleIsFlippedFulcrum = () => {
//   this.setState( (prevState) => ({isFlippedFulcrum: !prevState.isFlippedFulcrum}) );
// }
//
// toggleDisplayTBD = (event) => {
//   event.preventDefault();
//   this.setState( (prevState) => ({displayedTBD: !prevState.displayedTBD}) );
// }
//
// toggleIsFlippedTBD = () => {
//   this.setState( (prevState) => ({isFlippedTBD: !prevState.isFlippedTBD}) );
// }
//
// toggledisplayAnalog = (event) => {
//   event.preventDefault();
//   this.setState( (prevState) => ({displayedAnalog: !prevState.displayedAnalog}) );
// }
//
// toggleIsFlippedAnalog = () => {
//   this.setState( (prevState) => ({isFlippedAnalog: !prevState.isFlippedAnalog}) );
// }
