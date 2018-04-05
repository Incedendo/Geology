import React, { Component } from 'react';
import '../../assets/scss/include.scss';
import MapContainer from '../GoogleAPIScripts/MapContainer';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import '../../assets/scss/include.scss';
import '../../assets/scss/DetailedChannelModal.css';
import '../../assets/scss/ResultTable.css';

class TestView extends Component{
  state = {
    initial_map_zoom_level: 8,
  };

  render(){
    console.log(this.props);
    return(
      <div className="testView-enclosing-border-margin">
        <div className="modal-header">
          Detailed Information for Channel ID: {this.props.match.params.id}
        </div>

        <Grid>
          <Row>
            <div>
              <div className="table-margin">
                <table>
                  <tr>
                    <th>Site ID</th>
                    <th>Site Name</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                  </tr>
                  <tr>
                    <td>{this.props.match.params.id}</td>
                    <td>{this.props.match.params.siteName}</td>
                    <td>{this.props.match.params.lat}</td>
                    <td>{this.props.match.params.long}</td>
                  </tr>
                </table>
              </div>

              <div className="table-margin">
                <table>
                  <tr>
                    <th>Drainage Area</th>
                    <th>Channel Width</th>
                    <th>Channel Depth</th>
                    <th>Source</th>
                  </tr>
                  <tr>
                    <td>700</td>
                    <td>15</td>
                    <td>50</td>
                    <td>Austin River</td>
                  </tr>
                </table>
              </div>

              <div className="table-margin">
                <table>
                  <tr>
                    <th>Climate ID</th>
                    <th>Climate Description</th>
                  </tr>
                  <tr>
                    <td>11078</td>
                    <td>Temparate</td>
                  </tr>
                </table>
              </div>

              <div className="table-margin">
                <table>
                  <tr>
                    <th>Estimated Bankfull Discharge</th>
                    <th>Reference</th>
                  </tr>
                  <tr>
                    <td>145500</td>
                    <td>A</td>
                  </tr>
                </table>
              </div>
            </div>
          </Row>

          <Row md={5}>
            <div className="testView-map-margin">
              <MapContainer
                lat={this.props.match.params.lat}
                long={this.props.match.params.long}
              />
            </div>
          </Row>
        </Grid>





      </div>
    )
  }
}

export default TestView;
