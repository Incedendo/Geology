import React, { Component } from 'react';
import '../assets/scss/include.scss';
import LandingPage from './LandingPage';
import HomeLinkComponent from './HomeLinkComponent';


class Home extends Component {
  renderHeader = () => (
    <div>
      <h1 className="center greenText">
          R.A.F.T.E.R
      </h1>
    </div>
  )

  render() {
    return(
      <div >
        {this.renderHeader()}

        {/* <HomeForm /> */}
        <LandingPage />

        <HomeLinkComponent
          pathname='/helpfullinks'
          linkTitle= 'Research Documents/ White papers'
        />

      </div>
    )
  }
}

export default Home;
