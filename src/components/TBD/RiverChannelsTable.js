import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Link } from 'react-router-dom';
import MyLink from '../Link/MyLink';
// import {makeData} from './Utils.js';
import DetailedChannelView from './DetailedChannelView';
import DetailChannelModal from './DetailChannelModal';

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

    console.log(this.props);

    return(
      <div>
        <div className="enclosing-border inline" style={{
          width: "40%",
          "margin-left": "20px",
          "margin-right": "20px",
          "margin-bottom": "30px"
        }}>
          <table className="table-margin">
            <tr>
              <th>TBD Value</th>
            </tr>
            <tr>
              <td>100</td>
            </tr>
          </table>
        </div>

        <ReactTable
          // data={this.props.data}
          data={fakeData}
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

                          // state: {
                          //   origin: this.props.origin,
                          //  }
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
          defaultPageSize={2}
          className="-striped -highlight"
          SubComponent={row => {
            return (
              <div style={{ padding: "20px" }}>
                <em>
                  You can put any component you want here, even another React
                  Table! :
                  {row.sitE_ID}
                </em>
                <br />
                <br />


              </div>
            );
          }}
        />
      </div>
    )
   }
 }

export default RiverChannelsTable;
