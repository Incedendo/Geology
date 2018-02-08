import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const HomeLinkComponent = ( {pathname, linkTitle} ) => (
  <Link to={{
    pathname: pathname
  }}
    className=""
  >
    {linkTitle}
  </Link>
)

export default HomeLinkComponent;
