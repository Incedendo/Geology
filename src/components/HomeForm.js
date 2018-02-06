import React, { Component } from 'react';
import '../assets/scss/include.scss';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

class HomeForm extends Component {
  state = {
      fulcrumApproach: false,
      tbd: false,
  };

  toggleFulcrum = () => {
    // console.log("posting Fulcrum")
    this.setState((prevState) => ({fulcrumApproach: !prevState.fulcrumApproach}))

    console.log("Fulcrum state: " + this.state.fulcrumApproach)
  }

  toggleTBD = () => {
    // console.log("posting TBD")
    this.setState((prevState) => ({tbd: !prevState.tbd}))

    console.log("TBD state: " + this.state.tbd)
  }


    // handleBodyChange(e) {
    //     this.setState({
    //         body: e.target.value
    //     });
    // },
    //
    // handleTitleChange(e) {
    //     this.setState({
    //         title: e.target.value
    //     });
    // },

    processOptions = () => {

      if (this.state.fulcrumApproach && this.state.tbd){
        this.displayBoth()
        console.log("display both")
      }else if (this.state.fulcrumApproach){
        this.displayFulcrum()
        console.log("displayFulcrum")
      }else if (this.state.tbd){
        this.displayTBD()
        console.log("display TBD")
      }else{
        console.log("no method chosen, display error")
      }
    }

    displayFulcrum = () => (
      console.log('link to fulcrum') &&
      <Link
        to={{
          pathname: '/FulcrumApproach',
        }}
        className=""
      />
    )

    displayTBD = () => (
      <Link to={{
        pathname: '/TBDApproach',
      }}
        className=""
      ></Link>
    )

    handleSubmit = (e) => {
        e.preventDefault();
        this.processOptions();
        //this.props.onSubmit(this.state);
    }

    render() {
        return (
          <Grid>
            <Col md={3}>
              <Link
                to={{
                  pathname: '/FulcrumApproach',
                }}
                className=""
              >
                Fulcrum
              </Link>
              <div>
                this is the explaination of Fulcrum Apprach
              </div>
            </Col>

            <Col md={3}>
              <Link to={{
                pathname: '/TBDApproach',
              }}
                className=""
              >
                TBD
              </Link>
              <div>
                this is the explaination of TBD Apprach
              </div>
            </Col>

            <Col md={3}>
              <Link to={{
                pathname: '/AnalogChannels',
              }}
                className=""
              >
                Analog Channel
              </Link>
              <div>
                Allow users to search for Analog Streams
              </div>
            </Col>

            <Col md={3}>
              <Link to={{
                pathname: '/bothApproach',
              }}
                className=""
              >
                Both
              </Link>
              <div>
                this is the explaination of Both Appraches
              </div>
            </Col>

          </Grid>

        )
    }
}

export default HomeForm;

{/* <form  onSubmit={this.handleSubmit}>
  <Grid>
    <Row>
      <Col sm={4} md={8}>
        <h1>Fulcrum</h1>
          [Explanation for Fulcrum approach]
     </Col>
      <Col sm={4} md={4}>
        <input className="tgl tgl-flat" id="cb3" type="checkbox" onClick={this.toggleFulcrum}/>
        <label className="tgl-btn centeredPosition" htmlFor="cb3"></label>
     </Col>
    </Row>

    <Row>
      <Col sm={4} md={8}>
        <h1>TBD</h1>
        [Explanation for TBD approach]
      </Col>
      <Col sm={4} md={4}>
        <input className="tgl tgl-flat" id="cb4" type="checkbox" onClick={this.toggleTBD}/>
        <label className="tgl-btn centeredPosition" htmlFor="cb4"></label>
      </Col>
    </Row>
 </Grid>

 <div>
   {(this.state.fulcrumApproach || this.state.tbd) && <button type="submit">
     Submit
   </button>}
 </div>

</form> */}
