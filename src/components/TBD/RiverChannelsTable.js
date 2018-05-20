import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import DownloadButton from './DownloadButton';
import MapContainer from '../GoogleAPIScripts/MapContainer';
import BaseSupSub from 'react-basesupsub';
//  for FileDownload

import '../../assets/scss/include.scss';
import '../../assets/scss/ResultTable.css';

class RiverChannelsTable extends Component{

  state = {
    modalIsOpen: false,
    downloaded: false,
  }

  toggleModal = () => {
    this.setState( (prevState) => ({modalIsOpen: !prevState.modalIsOpen}) );
  }

  render(){
    console.log(this.props.data);
    let ebd; //estimated bankfull discharge
    let streams = [];

    if(this.props.data !== null){
      streams = this.props.data;
    }

    if(this.props.tbdWithin10 !== -1){
      ebd = this.props.tbdWithin10;
    }else{
      ebd = this.props.tbdWithin20;
    }

    return(
      <div className="grey-app">
          {this.props.title !== "River Analogues" &&
          <div className="tbd-value-table"
            style={{
              'border-radius': '5px'
            }}
            >
            <table>
              <tr>
                <th>
                  <div
                    style={{
                      'margin-right': '5px',
                      display: 'inline-block',
                    }}
                  >
                      Year Averaged Bankfull Flow Duration,
                  </div>
                  <BaseSupSub style={{ display: 'inline-block' }} base="t" sub="bd" />
                  <div
                    style={{
                      'margin-left': '5px',
                      display: 'inline-block'
                    }}
                  >
                      (days)
                  </div>
                </th>
              </tr>
              <tr>
                <td>{ebd}</td>
              </tr>
            </table>
          </div>
          }

            <ReactTable
              data={this.props.data}
              //data={streams}
              columns={[
                {
                  Header: "Site Info",
                  columns: [
                    {
                      Header: "Site ID",
                      accessor: "siteID",
                    },
                    {
                      Header: "Site Name",
                      accessor: "siteName",
                      minWidth: 400,
                    },
                  ]
                },
                {
                  Header: "Coordinates",
                  columns: [
                    {
                      Header: "Latitude",
                      accessor: "latitude"
                    },
                    {
                      Header: "Longitude",
                      accessor: "longitude"
                    }
                  ]
                },
                {
                  Header: "Channel Info",
                  columns: [
                    {
                      Header: "Drainage Area (km)",
                      accessor: "drainageAreaKm",
                    },
                    {
                      Header: "Channel Width (m)",
                      accessor: "channelWidthM",
                    },
                    {
                      Header: "Channel Depth (m)",
                      accessor: "channelDepthM",
                    },
                    {
                      Header: "Country",
                      accessor: "countryName",
                    },
                  ]
                },
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
              SubComponent={row => {
                const data = this.props.data;
                const index = row.index;
                const rowInfo = data[index];

                let ebd_stream;

                if(this.props.tbdWithin10 !== -1){
                  ebd_stream = rowInfo.avgWithin10;
                }else{
                  ebd_stream = rowInfo.avgWithin20;
                }

                return (
                  <div
                    style={{
                      "background-color": "#DBDBD9",
                      padding: "20px"
                    }}>

                    <div className="">
                      <div className="table-margin">
                        <table>
                          <tr>
                            <th>Site ID</th>
                            <th>Site Name</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                          </tr>
                          <tr>
                            <td>{rowInfo.siteID}</td>
                            <td>{rowInfo.siteName}</td>
                            <td>{rowInfo.latitude}</td>
                            <td>{rowInfo.longitude}</td>
                          </tr>
                        </table>
                      </div>

                      <div className="table-margin">
                        <table>
                          <tr>
                            <th>
                              <div>
                                <div
                                  style={{
                                    'margin-right': '2px',
                                    display: 'inline-block'
                                  }}
                                >
                                  Drainage Area (
                                </div>
                                <BaseSupSub style={{ display: 'inline-block' }} base="km" sup="2" />
                                <div
                                  style={{
                                    'margin-left': '2px',
                                    display: 'inline-block'
                                  }}
                                >
                                   )
                                </div>
                              </div>
                            </th>
                            <th>Channel Width (m)</th>
                            <th>Channel Depth (m)</th>
                            <th>Source</th>
                          </tr>
                          <tr>
                            <td>{rowInfo.drainageAreaKm}</td>
                            <td>{rowInfo.channelWidthM}</td>
                            <td>{rowInfo.channelDepthM}</td>
                            <td>{rowInfo.descSource}</td>
                          </tr>
                        </table>
                      </div>

                      <div>
                        <div className="table-margin">
                          <table>
                            <tr>
                              <th>
                                <div>
                                  <div
                                    style={{
                                      'margin-right': '5px',
                                      display: 'inline-block'
                                    }}
                                  >
                                    Average
                                  </div>
                                  <BaseSupSub style={{ display: 'inline-block' }} base="t" sub="bd" />
                                  <div
                                    style={{
                                      'margin-left': '5px',
                                      display: 'inline-block'
                                    }}
                                  >
                                    (days)
                                  </div>
                                </div>
                              </th>
                              <th>Climate ID</th>
                              <th>Climate Description</th>
                            </tr>
                            <tr>
                              <td>{ebd_stream}</td>
                              <td>{rowInfo.climateCode}</td>
                              <td>{rowInfo.climateDesc}</td>
                            </tr>
                          </table>
                        </div>

                        <div className="table-margin">
                          <table>
                            <tr>
                              <th>

                                <div>
                                  <div
                                    style={{
                                      'margin-right': '2px',
                                      display: 'inline-block'
                                    }}
                                  >
                                    Estimated Bankfull Discharge (
                                  </div>
                                  <BaseSupSub style={{ display: 'inline-block' }} base="m" sup="3" />
                                  <div
                                    style={{
                                      'margin-left': '2px',
                                      display: 'inline-block'
                                    }}
                                  >
                                    /s)
                                  </div>
                                </div>

                              </th>
                              <th>Reference</th>
                            </tr>
                            <tr>
                              <td>{rowInfo.estDischargeCubMPerSec}</td>
                              <td>{rowInfo.refSource}</td>
                            </tr>
                          </table>
                        </div>
                      </div>

                      <div className="div-google-map grey">
                        <MapContainer
                          lat={rowInfo.latitude}
                          long={rowInfo.longitude}
                        />
                      </div>

                      <DownloadButton
                        siteID={rowInfo.siteID}
                      />

                      <hr />

                    </div>

                  </div>
                );
              }}
            />
        </div>

    )
   }
 }

export default RiverChannelsTable;
