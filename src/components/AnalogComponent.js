import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/scss/include.scss';

class AnalogComponent extends Component{

  state = {
    selectedClimate: "FirstOrder",
    selectedRiverSize: "RiverDepth",
    selectedPrecision: "10%"
  }

  postTBD = () =>{
    const JimPostTBDUrl = 'https://geologymiddlewarerafter.azurewebsites.net/api/main/TBD';

    const postRequestData = {
      method: 'POST',
      Origin:'https://powerful-cliffs-45352.herokuapp.com',
      mode: "cors",
      headers: {
        // 'Content-Type': 'text/plain',
        // Accept: 'text/plain',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // 'X-Content-Type-Options': 'nosniff',
      },
      body:
        JSON.stringify({
          "isFulcrum": true,
          "isMetric": false,
          "isRiverAnalogue" : true,
          "isTBD": false,
          "TBD": {
          "isCrossSection": true,
            "isWithin10": true,
            "isWithin20": true,
            "climate": "B",
            "drainage_low": null,
            "drainage_high": null,
            "riverSize_low": null,
            "riverSize_high": null,
          },
          "Fulcrum": {
            "avgBankfullDepth": 9,
            "bankfullWidth": 8,
            "hydraulicRadius": 7,
            "grainSize_d16": 6,
            "grainSize_d50": 5,
            "grainSize_d84": 4,
            "grainSize_d90": 3,
            "sedimentDensity": 2,
            "dimensionlessMultiplier": 1,
          },
        })
    }

    fetch(JimPostTBDUrl, postRequestData)
    // .then( results => results.json() )
    .then( response =>
      {
        if (response.status === 200 || response.status === 201) {
            return response.json();
        } else {
          console.log('TBD Failure!', response.status);
        }
      }
    ).then(function (json) {

      var responseBody = json;

      console.log("POST CORS works");

      console.log(typeof responseBody, responseBody);
    });
  }

  handleSubmit = (e) => {
      console.log("handle submit in TBD")
      e.preventDefault();
  }

  renderClimateOrders = () => (
    <div>
      <Grid className="padding-grid">

        <Col sm={4} md={4} className="rightAlignedText">
          <div>
            Climate
          </div>
        </Col>

        <Col sm={4} md={8} className="leftAlignedText">
          <input
              type="radio"
              name="climate"
              value="FirstOrder" onChange={this.setSelectedClimate}
              className=""
            /> First Order
           <input
             type="radio"
             name="climate"
             value="KoppenClassification"  onChange={this.setSelectedClimate}
             className=""
           /> Koppen Classification
        </Col>
      </Grid>

      <Grid className="padding-grid">

          <Col sm={4} md={6} className="rightAlignedText">
            <select name="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="fiat">Fiat</option>
              <option value="audi">Audi</option>
            </select>
         </Col>

         <Col sm={4} md={6} className="leftAlignedText">
           <select name="cars">
             <option value="volvo">Volvo</option>
             <option value="saab">Saab</option>
             <option value="fiat">Fiat</option>
             <option value="audi">Audi</option>
           </select>
        </Col>
      </Grid>
    </div>
  )

  renderDrainageArea = () => (
    <div>
      <Grid className="padding-grid">
          <Col sm={4} md={4} className="rightAlignedText">
              Drainage Area
          </Col>
          <Col sm={4} md={8} className="leftAlignedText">
            <div>
              slider will be used here
            </div>
         </Col>
      </Grid>
    </div>
  )

  renderRiverSize = () => (
    <div>
      <Grid className="padding-grid">
        <Col sm={4} md={4} className="rightAlignedText">
            River  Size
        </Col>
        <Col sm={4} md={8} className="leftAlignedText">
          <input
              type="radio"
              name="channelSizeOptions"
              value="RiverDepth"
              onChange={this.setSelectedRiverSize}
              className=""
            /> River Depth
           <input
             type="radio"
             name="channelSizeOptions"
             value="CrossSectionalArea" onChange={this.setSelectedRiverSize}
             className=""
           /> Cross Sectional Area
         </Col>
      </Grid>

      <Grid className="padding-grid">
        <Col sm={4} md={4} className="rightAlignedText">

        </Col>
        <Col sm={4} md={8} className="leftAlignedText">
          Slider rendered here
         </Col>
      </Grid>
    </div>
  )

  setSelectedClimate = (e) => {
    if(e.target.value === "KoppenClassification"){
      this.setState({
        selectedClimate: "KoppenClassification",
      });
      console.log(this.state.selectedClimate);
    }else{
      this.setState({
        selectedClimate: "FirstOrder",
      });
      console.log(this.state.selectedClimate);
    }
  }

  setSelectedRiverSize = (e) => {
    if(e.target.value === "CrossSectionalArea"){
      this.setState({
        selectedRiverSize: "CrossSectionalArea",
      });
      console.log(this.state.selectedRiverSize);
    }else{
      this.setState({
        selectedRiverSize: "RiverDepth",
      });
      console.log(this.state.selectedRiverSize);
    }
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <h1>
          Analog Channels
        </h1>

        <div className="">
           <Link to="/home">Back</Link>
        </div>

        {this.renderClimateOrders()}

        {this.renderDrainageArea()}

        {this.renderRiverSize()}

        <button type="submit" onClick={this.handleSubmit} className="padding-grid margin-10">
          Submit
        </button>
      </form>
    )
  }
}

export default AnalogComponent;
