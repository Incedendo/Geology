import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/scss/include.scss';

const FieldTitles = [
  "Climate 1st Order",
  "Climate 2nd Order",
  "Climate 3rd Order",
  "Drainage Area",
  "River  Size"
]

class TBDApproach extends Component{

  state = {
    defaultTBD: false,
    customizedTBD: false,
    tenPercentTBD: false,
    twentyPercentTBD: false,
  }

  // componentDidMount() {
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

  renderUnit = (title) => {
    return(
      <div key={title}>
        {
          (title === "Climate 1st Order" || title === "Climate 2nd Order" || title === "Climate 3rd Order") &&
            <Grid className="padding-grid">
                <Col sm={4} md={6} className="rightAlignedText">
                    {title}
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
        }
        {
          (title === "Drainage Area" || title === "River  Size") &&
            <Grid className="padding-grid">
                <Col sm={4} md={6} className="rightAlignedText">
                    {title}
                </Col>
                <Col sm={4} md={6} className="leftAlignedText">
                  <div>
                    slider will be used here
                  </div>
               </Col>
            </Grid>
        }
      </div>
    )
  }

  toggleDefaultTBDCheckbox = () => {
    this.setState( (prevState) => ({defaultTBD: !prevState.defaultTBD}) )
  }

  toggleCustomizedTBDCheckbox = () => {
    this.setState( (prevState) => ({customizedTBD: !prevState.customizedTBD}) )
  }

  toggleTenPercentTBD = () => {
    this.setState( (prevState) => ({tenPercentTBD: !prevState.tenPercentTBD}) )
    console.log("set 10%");
  }

  toggleTwentyPercentTBD = () => {
    this.setState( (prevState) => ({twentyPercentTBD: !prevState.twentyPercentTBD}) )
    console.log("set 20%");
  }

  resetOptions = () => {
    this.setState({
      defaultTBD: false,
      customizedTBD: false,
      tenPercentTBD: false,
      twentyPercentTBD: false,
    })
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <h1>
          TBD Approach
        </h1>
        <div className="">
           <Link to="/">Back</Link>
        </div>
        {
          !this.state.defaultTBD && !this.state.customizedTBD &&

          <div>
            <div>
              <input type="checkbox" onClick={this.toggleDefaultTBDCheckbox}/> Default TBD [default value]
            </div>

            <div>
              <input type="checkbox" onClick={this.toggleCustomizedTBDCheckbox}/> Customized TDB
            </div>

          </div>
        }

        {this.state.defaultTBD &&
          <div>
            TBD will be calculated using Default value of [...]
          </div>
        }

        {this.state.customizedTBD &&
          <div>
            <input
              type="radio"
              name="TBDCustomizedOptions" onClick={this.toggleTenPercentTBD}/> 10% TBD

            <input
              type="radio"
              name="TBDCustomizedOptions" onClick={this.toggleTwentyPercentTBD}/> 20% TBD

            {FieldTitles.map( title => this.renderUnit(title))}

          </div>
        }

        {
          (this.state.defaultTBD ||
          this.state.customizedTBD) &&
          <button onClick={this.resetOptions}>
            Cancel Options
          </button>
        }

        <button type="submit" onClick={this.handleSubmit} className="padding-grid margin-10">
          Submit
        </button>
      </form>
    )
  }
}

export default TBDApproach;
