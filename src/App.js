import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import './App.css';
import './assets/scss/include.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          {renderRoutes(routes)}
        </Router>
      </div>
    );
  }
}

export default App;
