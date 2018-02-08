import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import '../assets/scss/include.scss';

const FieldTitles = [
  "Climate 1st Order",
  "Climate 2nd Order",
  "Climate 3rd Order",
  "Drainage Area",
  "River  Size"
]

class TBDApproach extends Component{

  state = {
    defaultTBD: false,
    customizedTBD: false,
  }

  handleSubmit = (e) => {
      console.log("handle submit in TBD")
      e.preventDefault();
  }

  renderUnit = (title) => (
      <Grid className="padding-grid">
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

  toggleDefaultTBDCheckbox = () => {
    this.setState( (prevState) => ({defaultTBD: !prevState.defaultTBD}) )
  }

  toggleCustomizedTBDCheckbox = () => {
    this.setState( (prevState) => ({customizedTBD: !prevState.customizedTBD}) )
  }

  resetOptions = () => {
    this.setState({
      defaultTBD: false,
      customizedTBD: false,
    })
  }

  render(){
    return(
      <form>
        <h1>
          TBD Approach
        </h1>

        {
          !this.state.defaultTBD && !this.state.customizedTBD &&

          <div>
            <div>
              <input type="checkbox" onClick={this.toggleDefaultTBDCheckbox}/> Default TBD [default value]
            </div>

            <div>
              <input type="checkbox" onClick={this.toggleCustomizedTBDCheckbox}/> Customized TDB
            </div>

          </div>
        }

        {this.state.defaultTBD &&
          <div>
            TBD will be calculated using Default value of [...]
          </div>
        }

        {this.state.customizedTBD && FieldTitles.map(
          title => this.renderUnit(title)
        )}

        {
          (this.state.defaultTBD ||
          this.state.customizedTBD) &&
          <button onClick={this.resetOptions}>
            Cancel Options
          </button>
        }

        <button type="submit" onClick={this.handleSubmit} className="padding-grid margin-10">
          Submit
        </button>
      </form>
    )
  }
}

export default TBDApproach;
