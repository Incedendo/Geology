import React, { Component } from 'react';
import '../assets/scss/include.scss';
import HomeForm from './HomeForm';
import HomeLinkComponent from './HomeLinkComponent';

class Home extends Component {
  renderHeader = () => (
    <div>
      <h1 className="center greenText">
          Welcome to Our Senior Design Project Prototype
      </h1>
    </div>
  )

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
