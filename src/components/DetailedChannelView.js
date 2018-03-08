import React, { Component } from 'react';
import '../assets/scss/include.scss';

const DetailedChannelView = (props) => {
  console.log(props);
  return(
    <div>
      SiteID: {props.location.state.siteID}
    </div>
  )
}

export default DetailedChannelView;
