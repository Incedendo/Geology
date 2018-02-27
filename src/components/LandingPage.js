import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div className="leftAlignedText">
    <h3>
      R.A.F.T.E.R
    </h3>

    <h3>
      River AnalogueFulcrum Theory Estimate Repository
    </h3>

    <h3>
      Fulcrum Approach
    </h3>

    <div>
      <ul>
        <li>
          Leverage the Fulcrum approach to estimate source-to-sink sediment flux calculations using readily available data in the rock record of channel fill thickness and grainsize.
        </li>
        <li>
          Derive sediment flux estimates using a default value for the variable of average annual days of bankfull duration (tbd) or query adatabase of over 500 streams to input a more stream specific tbdvalue based on selected parameters of climate, drainage areaand/or channel size.
        </li>
      </ul>
    </div>

    <h3>
      Bankfull Duration (tbd)
    </h3>

    <div>
      <ul>
        <li>
          Query a database of over 500 streams, selecting stream specific attributes of climate, drainage area and/or channel size to calculate an average annual days at bankfull duration (tbd) value.
        </li>
      </ul>
    </div>

    <h3>
      River AnalogueSearch
    </h3>

    <div>
      <ul>
        <li>
          Select parameters of climate, drainage area and/or channel size to query a database of over 600 streams and return all analogous rivers based on the designated attributes.
        </li>
      </ul>
    </div>

    <Link to={{
      pathname: "/home"
    }}
      className=""
    >
      Next
    </Link>
  </div>
)

export default LandingPage;