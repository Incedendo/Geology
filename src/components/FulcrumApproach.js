import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import fetch from 'isomorphic-fetch';
import FulcrumInputComponent from './FulcrumInputComponent';
import FulcrumResultComponent from './FulcrumResultComponent';
import AnalogComponent from './AnalogComponent';
import '../assets/scss/include.scss';

const FulcrumField = ( {...props} ) =>
(
    <FulcrumInputComponent
      { ...props }
    />
);

const FulcrumResults = ({...props}) => (
    <FulcrumResultComponent
      {...props}
    />
)

class FulcrumApproach extends Component {

  state = {
    post: [],
    AvgBkflDpt: 0,
    BkflChanWdt: 0,
    HydrolicRad: 0,
    Dee16: 0,
    Dee50: 0,
    Dee84: 0,
    Dee90: 0,
    SedimentDensity: 0,
    DMLMult: 0,
    submitted: false,
  };

  componentDidMount() {

    const JsonServerUrl = 'http://localhost:3004/posts';

    const JimGetUrl = 'http://geologymiddlewarerafter.azurewebsites.net/api/main/TestReturn';

    const JimPostUrl = 'http://geologymiddlewarerafter.azurewebsites.net/api/main/fulcrum';


    const fulcrumData = {
      "isFulcrum": true,
      "isTBD": false,
      "isMetric": false,
      "TBD": {
        "first_order": 1,
        "second_order": 2,
        "third_order": 3,
        "drainage": 123,
        "riverSize": 503
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
        "dimensionlessMultiplier": 1
      }
    }

    const getRequestData = {
      method: 'GET',
      Origin:'https://powerful-cliffs-45352.herokuapp.com',
    }

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
            "isTBD": false,
            "isMetric": false,
            "TBD": {
              "first_order": 1,
              "second_order": 2,
              "third_order": 3,
              "drainage": 123,
              "riverSize": 503
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
              "dimensionlessMultiplier": 1
            },
        })
    }

    // fetch(JimGetUrl, getRequestData)
    // .then(results => {
    //   return results.json();
    // }).then(data => {
    //     console.log(data);
    //     console.log("Get success!!!");
    //   }
    // );

    fetch(JimPostUrl, postRequestData)
    // .then( results => results.json() )
    .then( response =>
      {
        if (response.status == 200 || response.status == 201) {
            return response.json();
        } else {
          console.log('Failure!', response.status);
        }
      }
    ).then(function (json) {

      var responseBody = json;

      console.log(typeof responseBody, responseBody);
    });
  }

  postFulcrum = () => {

    // console.log("doing Fetch for postFulcrum")
    // var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    // targetUrl = 'http://localhost:5000/api/values/fulcrum'

    // fetch(api_url + '/api/values/fulcrum', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     method: 'Fulcrum',
    //   })
    // })

    // console.log("---Making Post Request with Axios---")

    //https://github.com/axios/axios/issues/191

    // axios.post('http://geologymiddlewarerafter.azurewebsites.net/api/main/fulcrum', {
    //   "isFulcrum": true,
    //   "isTBD": false,
    //   "isMetric": false,
    //   "TBD": {
    //     "first_order": 1,
    //     "second_order": 2,
    //     "third_order": 3,
    //     "drainage": 123,
    //     "riverSize": 503
    //   },
    //   "Fulcrum": {
    //     "avgBankfullDepth": 9,
    //     "bankfullWidth": 8,
    //     "hydraulicRadius": 7,
    //     "grainSize_d16": 6,
    //     "grainSize_d50": 5,
    //     "grainSize_d84": 4,
    //     "grainSize_d90": 3,
    //     "sedimentDensity": 2,
    //     "dimensionlessMultiplier": 1
    //   }
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }


  // renderResults = (title, data) => (
  // renderResults = (title, data) => (
  //     <FulcrumResultComponent
  //       key={title}
  //       fulcrumTitle={title}
  //       returnedData={data}
  //     />
  // )

  updateFieldValue = (e) => {

    const {name, value} = e.target;

    console.log("this gets called: new value of " + name + " is: "+value);

    this.setState(() => ({
      [name]: value
    }))
  }

  handleSubmit = (e) => {
      e.preventDefault();

      const {
        state_AvgBkflDpt,
        state_BkflChanWdt,
        state_HydrolicRad,
        state_Dee16,
        state_Dee50,
        state_Dee84,
        state_Dee90,
        state_SedimentDensity,
        state_DMLMult,
      } = this.state;

      this.setState({
        submitted: true,
      })

      this.postFulcrum();
  }

  render() {
    const {
      AvgBkflDpt,
      BkflChanWdt,
      HydrolicRad,
      Dee16,
      Dee50,
      Dee84,
      Dee90,
      SedimentDensity,
      DMLMult,
      status,
    } = this.state;

    const fieldInputs = [
      {
        title: "Average Bankfull  Channel  Depth,  Hbf (m)[dm=0.5(channel  story  thickness)]",
        state: AvgBkflDpt,
        name: "AvgBkflDpt",
      },
      {
        title: "Bankful Channel Width, Bbf (m)",
        state: BkflChanWdt,
        name: "BkflChanWdt",
      },
      {
        title: "Hydraulic  Radius (m),  R",
        state: HydrolicRad,
        name: "HydrolicRad",
      },
      {
        title: "D16 (mm)",
        state: Dee16,
        name: "Dee16",
      },
      {
        title: "D50 (mm)",
        state: Dee50,
        name: "Dee50",
      },
      {
        title: "D84 (mm)",
        state: Dee84,
        name: "Dee84",
      },
      {
        title: "D90 (mm)",
        state: Dee90,
        name: "Dee90",
      },
      {
        title: "Sediment Density (g/cm^3)",
        state: SedimentDensity,
        name: "SedimentDensity",
      },
      {
        title: "Dimensionless Multiplier,  b. [b=1/(bankfull  annual  proportion)]",
        state: DMLMult,
        name: "DMLMult",
      },
    ]

    const fakeResults = [
      {
        title: "Average Bankfull  Channel",
        returnedData: AvgBkflDpt,
      },
      {
        title: "Bankful Channel Width, Bbf (m)",
        returnedData: 777,
      },
      {
        title: "Hydraulic  Radius (m),  R",
        returnedData: 777,
      },
      {
        title: "D16 (mm)",
        returnedData: 777,
      },
      {
        title: "D50 (mm)",
        returnedData: 777,
      },
      {
        title: "D84 (mm)",
        returnedData: 777,
      },
      {
        title: "D90 (mm)",
        returnedData: 777,
      },
      {
        title: "Sediment Density (g/cm^3)",
        returnedData: 777,
      },
      {
        title: "Dimensionless Multiplier,  b. [b=1/(bankfull  annual  proportion)]",
        returnedData: 777,
      },
    ]

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>
          Fulcrum Approach
        </h1>
        {!this.state.submitted &&
          <div>
            {fieldInputs.map(
              (fieldObject,index) => (<FulcrumField
                title = {fieldObject.title}
                name = {fieldObject.name} state = {fieldObject.state}
                update = {this.updateFieldValue}
              />)
            )}

            <button type="submit" onClick={this.handleSubmit} className="padding-grid margin-10">
              Submit
            </button>
          </div>
        }

        <AnalogComponent/>

        {this.state.submitted &&
          <div>
            {fakeResults.map(
              (fieldObject,index) => <FulcrumResultComponent
                title = {fieldObject.title} returnedData = {fieldObject.returnedData}
              />
            )}
          </div>
        }

        {status && <div>{status}</div>}

      </form>
    )
  }
}

export default FulcrumApproach;
