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
        <h1 className="greenText">
            Welcome to Our Senior Design Project Prototype
        </h1>

        <button onClick={this.displayState}>Display State</button>

        <div className="row">
          <div className="col-md-6 greenText">
            <h1>hello</h1>
          </div>
          <div className="col-md-6 greenText">
            <h1>world</h1>
          </div>
        </div>


        <Grid>
          <Col md={6}>
            <h4>Falcrum Approach</h4>
            <input className="tgl tgl-flat" id="cb1" type="checkbox" onClick={this.toggleFalcrum}/>
            <label className="tgl-btn" htmlFor="cb1"></label>
          </Col>
          <Col md={6}>
            <h4>TDB</h4>
            <input className="tgl tgl-flat" id="cb2" type="checkbox" onClick={this.toggleTBD}/>
            <label className="tgl-btn" htmlFor="cb2"></label>
          </Col>
        </Grid>

        {(this.state.falcrumApproach || this.state.tbd) &&
        <button onClick={this.displayState}>Next</button>}

        <a class="btn-5" href="#">Slice</a>
      </div>
    )
  }
}

export default Home;
