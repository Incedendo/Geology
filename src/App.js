import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import './App.css';
import './assets/scss/include.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends Component {
  render() {
    return (
      <div className="App grey-app">

        <meta http-equiv="Content-Type" content="text/html; charset= ISO-8859-1"/>

        <Router>
          {renderRoutes(routes)}
        </Router>

      </div>
    );
  }
}

export default App;
