import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

class RiverChannelsTable extends Component{
  render(){
    return(
      <ReactTable
        data={makeData()}
        columns={[
          {
            Header: "Site ID",
            accessor: "siteID",
            Cell: cellInfo => (
              <div>
                <Link
                  to={{
                    pathname: `/DetailedChannelView/`,
                    state: {
                      siteID: cellInfo.row.siteID,
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
                  {cellInfo.row.siteID}
                </Link>
              </div>
            )
          },
          {
            Header: "Site Name",
            accessor: "siteName",
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
            Header: "Drainage Area",
            accessor: "drainageArea",
          },
          {
            Header: "Channel Width",
            accessor: "channelWidth",
          },
          {
            Header: "Channel Depth",
            accessor: "channelDepth",
          },
          {
            Header: "Country",
            accessor: "country",
          },

        ]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    )
   }
 }

export default RiverChannelsTable;
