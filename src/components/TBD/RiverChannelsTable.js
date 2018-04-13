import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Link } from 'react-router-dom';
import MyLink from '../Link/MyLink';
// import {makeData} from './Utils.js';
import DetailedChannelView from './DetailedChannelView';
import DetailChannelModal from './DetailChannelModal';
import MapContainer from '../GoogleAPIScripts/MapContainer';
import BaseSupSub from 'react-basesupsub';
//  for FileDownload
import fileDownload from 'js-file-download';

const fakeData = [
  {
    altitude:null,
    avG_WITHIN_10:0.075,
    avG_WITHIN_20:0.15,
    channeL_DEPTH_FT:null,
    channeL_DEPTH_M:10,
    channeL_WIDTH_FT:null,
    channeL_WIDTH_M:5,
    climatE_CODE:null,
    climatE_DESC:null,
    climatE_ID:18,
    countY_ID:"33011",
    countY_NAME:null,
    countrY_ID:1,
    countrY_NAME:"USA",
    desC_SOURCE:"USGS",
    drainagE_AREA_KM:9.323964,
    drainagE_AREA_MI:3.6,
    laT_LONG_DATUM:"NAD83",
    latitude:"41.210171",
    longitude:"-73.898506",
    reF_SOURCE:null,
    reF_SOURCE_ID:0,
    sitE_ID:"01093800",
    sitE_NAME:"STONY BROOK TRIBUTARY NEAR TEMPLE NH",
    statE_ABV:null,
    statE_ID:33,
    statE_NAME:null,
  },
  {
    altitude:null,
    avG_WITHIN_10:0.075,
    avG_WITHIN_20:0.15,
    channeL_DEPTH_FT:null,
    channeL_DEPTH_M:45,
    channeL_WIDTH_FT:null,
    channeL_WIDTH_M:17,
    climatE_CODE:null,
    climatE_DESC:null,
    climatE_ID:18,
    countY_ID:"33011",
    countY_NAME:null,
    countrY_ID:1,
    countrY_NAME:"USA",
    desC_SOURCE:"USGS",
    drainagE_AREA_KM:9.323964,
    drainagE_AREA_MI:3.6,
    laT_LONG_DATUM:"NAD83",
    latitude:"36.1910972",
    longitude:"-111.8037701",
    reF_SOURCE:null,
    reF_SOURCE_ID:0,
    sitE_ID:"1567055",
    sitE_NAME:"AUSTIN RIVER",
    statE_ABV:null,
    statE_ID:33,
    statE_NAME:null,
  },
]

class RiverChannelsTable extends Component{

  state = {
    modalIsOpen: false,
  }

  toggleModal = () => {
    this.setState( (prevState) => ({modalIsOpen: !prevState.modalIsOpen}) );
  }

  downloadCSV = (id) => {
    console.log("stream id: ",id);

    const getCsvURL = 'https://aae79tnck1.execute-api.us-east-1.amazonaws.com/Prod/api/main/GetDischarge?siteID='+id;

    const getRequestData = {
      method: 'GET',
      Origin:'http://rafter-ui-bucket.s3-website-us-east-1.amazonaws.com/FulcrumApproach',
      mode: "cors",
      headers: {
        // 'Content-Type': 'text/plain',
        // Accept: 'text/plain',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // 'X-Content-Type-Options': 'nosniff',
      }
    }

    fetch(getCsvURL, getRequestData)
    // .then( results => results.json() )
    .then( response =>
      {
        if (response.status === 200 || response.status === 201) {
          console.log(response);
          return response.blob();
        } else {
          console.log('Get CSV Failure!', response.status);
        }
      }
    ).then( blob => {
      console.log("expecting returned data");
      console.log(blob);
      fileDownload(blob, 'tbd_data.csv');
    });
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
        <div className="tbd-value-table">
          <table>
            <tr>
              <th>
                <BaseSupSub style={{ display: 'inline-block' }} base="t" sub="bd" />
                <div
                  style={{
                    'margin-left': '5px',
                    display: 'inline-block'
                  }}
                >
                    value
                </div>
              </th>
            </tr>
            <tr>
              <td>{ebd}</td>
            </tr>
          </table>
        </div>

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
                    Cell: cellInfo => (
                      <div>
                        <Link
                          target="_blank"
                          to={{
                            pathname: "/TestView/"+
                            cellInfo.row.siteID +"/"+
                            cellInfo.row.siteNAME +"/"+ cellInfo.row.latitude +"/"+ cellInfo.row.longitude,
                          }}
                        >
                          {cellInfo.row.siteID}
                        </Link>

                        {/* <button onClick={this.toggleModal}>
                          Detail
                        </button> */}


                        <DetailChannelModal
                          isOpen={this.state.modalIsOpen}
                          closeModal={this.toggleModal}
                          enabledModal={this.state.modalIsOpen}
                          data={this.props.data}
                          index={cellInfo.index}
                          id={cellInfo.row.sitE_ID}
                          siteName={cellInfo.row.sitE_NAME}
                          lat={cellInfo.row.latitude}
                          long={cellInfo.row.longitude}
                        />

                        {/* <Link
                          to={{
                            pathname: "/DetailedChannelView/"+
                            cellInfo.row.sitE_ID +"/"+ cellInfo.row.latitude + "/"+ cellInfo.row.longitude,
                            state: {
                              origin: this.props.origin,
                              siteID: cellInfo.row.sitE_ID,
                              latitude: cellInfo.row.latitude,
                              longitude: cellInfo.row.longitude,
                              drainageArea: cellInfo.row.drainageArea,
                              channelWidth: cellInfo.row.channelWidth,
                              channelDepth: cellInfo.row.channelDepth,
                              country: cellInfo.row.country,
                              // climateID:
                              // climateDescription:
                              // estimatedBnkfullDischarge:
                              // reference:
                            }
                          }}
                        >
                          {cellInfo.row.sitE_ID}
                        </Link> */}
                      </div>
                    )
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
                            <td>{rowInfo.estDischargeCubicMPerSec}</td>
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

                    <div className="csv-btn">
                      <button
                        className="back-btn-result"
                        onClick={() => this.downloadCSV(rowInfo.siteID)}>
                        Download CSV File
                      </button>
                      <div
                        style={{
                          'text-align': 'center'
                        }}
                      >
                        (It might take up to 15 seconds to prepare the file for download...)
                      </div>
                    </div>

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
