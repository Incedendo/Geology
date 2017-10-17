import React, { Component } from 'react';
import '../assets/scss/include.scss';
import { Grid, Row, Col } from 'react-bootstrap';

class Home extends Component {
  state = {
      falcrumApproach: false,
      tbd: false
  };

  displayState = () => {
    console.log("Falcrum Approach chosen: " + this.state.falcrumApproach)
  }

  toggleFalcrum = () => {
    this.setState((prevState) => ({falcrumApproach: !prevState.falcrumApproach}))

    console.log("the state is: " + this.state.falcrumApproach)
  }

  toggleTBD = () => {
    this.setState((prevState) => ({tbd: !prevState.tbd}))
    console.log("the state is: " + this.state.tbd)
  }

  render() {
    return(
      <div>
        <h1 className="center greenText">
            Welcome to Our Senior Design Project Prototype
        </h1>

        {/* <button onClick={this.displayState}>Display State</button> */}
        <p>
          <h1>Fulcrum</h1>
            [Explanation for Fulcrum approach]
          <h1>TBD</h1>
          [Explanation for TBD approach]
        </p>


        <Grid>
         <Col sm={4} md={6}>
           <h4>Fulcrum Approach</h4>
           <input className="tgl tgl-flat" id="cb3" type="checkbox" onClick={this.toggleFulcrum}/>
           <label className="tgl-btn centeredPosition" htmlFor="cb3"></label>
         </Col>
         <Col sm={4} md={6}>
           <h4>TDB</h4>
           <input className="tgl tgl-flat" id="cb4" type="checkbox" onClick={this.toggleTBD}/>
           <label className="tgl-btn centeredPosition" htmlFor="cb4"></label>
         </Col>
       </Grid>

        {(this.state.falcrumApproach || this.state.tbd) && <a class="btn-5" href="#" onClick={this.displayState}>Next (Slide Effect)</a>}
      </div>
    )
  }
}

export default Home;
