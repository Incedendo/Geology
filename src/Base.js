import React from 'react';
import { renderRoutes } from 'react-router-config';
import { func, shape, arrayOf, string, bool } from 'prop-types';

const Base = ({ route }) => (
  <div>
    {renderRoutes(route.routes)}
  </div>
);

Base.propTypes = {
  route: shape({
    routes: arrayOf(
      shape({
        path: string,
        component: func,
        exact: bool,
        name: string
      }),
    ),
  }).isRequired,
};

export default Base;
