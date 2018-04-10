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

  render(){

    console.log(this.props.data);
    let ebd; //estimated bankfull discharge
    let streams = [];

    if(this.props.data){
      streams = this.props.data;
    }

    if(this.props.tbdWithin10 !== -1){
      ebd = this.props.tbdWithin10;
    }else{
      ebd = this.props.tbdWithin20;
    }

    return(
      <div>
        <div className="tbd-value-table">
          <table>
            <tr>
              <th>TBD Value</th>
            </tr>
            <tr>
              <td>{ebd}</td>
            </tr>
          </table>
        </div>

        <ReactTable
          // data={this.props.data}
          data={streams}
          columns={[
            {
              Header: "Site Info",
              columns: [
                {
                  Header: "Site ID",
                  accessor: "sitE_ID",
                  Cell: cellInfo => (
                    <div>
                      <Link
                        target="_blank"
                        to={{
                          pathname: "/TestView/"+
                          cellInfo.row.sitE_ID +"/"+
                          cellInfo.row.sitE_NAME +"/"+ cellInfo.row.latitude +"/"+ cellInfo.row.longitude,
                        }}
                      >
                        {cellInfo.row.sitE_ID}
                      </Link>

                      <button onClick={this.toggleModal}>
                        Detail
                      </button>

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
                  accessor: "sitE_NAME",
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
                  accessor: "drainagE_AREA_KM",
                },
                {
                  Header: "Channel Width (m)",
                  accessor: "channeL_WIDTH_M",
                },
                {
                  Header: "Channel Depth (m)",
                  accessor: "channeL_DEPTH_M",
                },
                {
                  Header: "Country",
                  accessor: "countrY_NAME",
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
              ebd_stream = rowInfo.avG_WITHIN_10;
            }else{
              ebd_stream = rowInfo.avG_WITHIN_20;
            }

            return (
              <div
                style={{
                  "background-color": "#DBDBD9",
                  padding: "20px"
                }}>

                id: {rowInfo.sitE_ID}

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
                        <td>{rowInfo.sitE_ID}</td>
                        <td>{rowInfo.sitE_NAME}</td>
                        <td>{rowInfo.latitude}</td>
                        <td>{rowInfo.longitude}</td>
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
                        <td>{rowInfo.drainagE_AREA_KM}</td>
                        <td>{rowInfo.channeL_WIDTH_M}</td>
                        <td>{rowInfo.channeL_DEPTH_M}</td>
                        <td>{rowInfo.desC_SOURCE}</td>
                      </tr>
                    </table>
                  </div>

                  <div>
                    <div className="table-margin">
                      <table>
                        <tr>
                          <th>Climate ID</th>
                          <th>Climate Description</th>
                        </tr>
                        <tr>
                          <td>{rowInfo.climatE_CODE}</td>
                          <td>{rowInfo.climatE_DESC}</td>
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
                          <td>{ebd_stream}</td>
                          <td>{rowInfo.reF_SOURCE}</td>
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
