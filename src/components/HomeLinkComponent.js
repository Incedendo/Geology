import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const HomeLinkComponent = ( {pathname, linkTitle, onClick} ) => (
  <Link to={{
    pathname: pathname
  }}
    className=""
    onClick={onClick}
  >
    {linkTitle}
  </Link>
)

export default HomeLinkComponent;
