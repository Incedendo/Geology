import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import '../assets/scss/include.scss';

const FieldTitles = [
  "Climate 1st Order",
  "Climate 2nd Order",
  "Climate 3rd Order",
  "Drainage Area",
  "River  Size",
]

class AnalogComponent extends Component{

  state = {
    isAnalog: false,
  }

  toggleCheckbox = () => {
    this.setState( (prevState) => ({isAnalog: !prevState.isAnalog}) )
  }

  renderUnit = (title) => (
      <Grid className="padding-grid" key={title}>
          <Col sm={4} md={6} className="rightAlignedText">
              {title}
          </Col>
          <Col sm={4} md={6} className="leftAlignedText">
            <select name="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="fiat">Fiat</option>
              <option value="audi">Audi</option>
            </select>
         </Col>
      </Grid>
  )

  handleSubmit = (e) => {
      console.log("handle submit in TBD")
      e.preventDefault();
  }

  render(){
    return(
      <form>

        <input type="checkbox" onClick={this.toggleCheckbox}/> Analog Channels
        {this.state.isAnalog &&
          <div>
            <h1>
              Analog Channels
            </h1>

            {FieldTitles.map( title => this.renderUnit(title) )}

            <button type="submit" onClick={this.handleSubmit} className="padding-grid margin-10">
              Submit
            </button>

          </div>
        }

      </form>
    )
  }
}


export default AnalogComponent;
