import React from 'react';
import { Link } from 'react-router-dom';

const HomeLinkComponent = ( {className, pathname, linkTitle, onClick} ) => (
  <Link to={{
    pathname: pathname
  }}
    className={className}
    onClick={onClick}
  >
    {linkTitle}
  </Link>
)

export default HomeLinkComponent;
