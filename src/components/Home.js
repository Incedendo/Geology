import React, { Component } from 'react';
import '../assets/scss/include.scss';
import HomeForm from './HomeForm';
import HomeLinkComponent from './HomeLinkComponent';
import axios from 'axios';
import fetch from 'isomorphic-fetch';
import { Grid, Row, Col } from 'react-bootstrap';

const baseURL = 'http://localhost:3000';

class Home extends Component {
  renderHeader = () => (
    <div>
      <h1 className="center greenText">
          Welcome to Our Senior Design Project Prototype
      </h1>
    </div>
  )

  postFulcrum = () => {
    console.log("doing Fetch for postFulcrum")
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'http://localhost:5000/api/values/fulcrum'


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

    // axios.post('http://localhost:5000/user/fulcrum', {
    //   firstName: 'Fulcrum',
    //   lastName: 'Approach'
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }

  render() {
    return(
      <div>
        {this.renderHeader()}

        <HomeForm />

        <HomeLinkComponent
          pathname='/helpfullinks'
          linkTitle= 'Research Documents/ White papers'
        />

      </div>
    )
  }
}

export default Home;
