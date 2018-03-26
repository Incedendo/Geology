import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Link } from 'react-router-dom';
// import {makeData} from './Utils.js';

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
    latitude:"42.8600846900",
    longitude:"-71.8328543000",
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
    latitude:"132.1689705689",
    longitude:"14.8768900546",
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

  render(){

    return(
      <ReactTable
        //data={this.props.data}
        data={fakeData}
        columns={[
          {
            Header: "Site ID",
            accessor: "sitE_ID",
            Cell: cellInfo => (
              <div>
                <Link
                  to={{
                    pathname: `/DetailedChannelView/`,
                    state: {
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
                </Link>
              </div>
            )
          },
          {
            Header: "Site Name",
            accessor: "sitE_NAME",
          },
          {
            Header: "Latitude",
            accessor: "latitude",
          },
          {
            Header: "Longitude",
            accessor: "longitude",
          },
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
        ]}
        defaultPageSize={2}
        className="-striped -highlight"
      />
    )
   }
 }

export default RiverChannelsTable;
