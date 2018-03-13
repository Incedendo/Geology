import React from "react";
import namor from "namor";
import { Link, Route } from 'react-router-dom';
import DetailedChannelView from './DetailedChannelView';
// import "./index.css";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const googleAPIKey = "AIzaSyAcAGysbpE7x7klvwHFeSDeIvphABOKsP0";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33 ? "complicated" : "single"
  };
};

const newChannel = () => {
  return {
    siteID: namor.generate({ words: 1, numbers: 0 }),
    siteName: namor.generate({ words: 2, numbers: 0 }),
    latitude: Math.floor(Math.random() * 30),
    longitude: Math.floor(Math.random() * 30),
    drainageArea: Math.floor(Math.random() * 300),
    channelWidth: Math.floor(Math.random() * 10),
    channelDepth: Math.floor(Math.random() * 30),
    country: namor.generate({ words: 1, numbers: 0 }),
  };
};

function makeData(len = 5553) {
  return range(len).map(d => {
    return {
      ...newChannel(),
      children: range(10).map(newChannel)
    };
  });
}

export const RiverChannelsTable = () => (
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

export const ChannelLocation = () => (
  <ReactTable
    data={makeData()}
    columns={[
      {
        Header: "Site ID",
        accessor: "siteID",
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
    ]}
    defaultPageSize={1}
    className="-striped -highlight"
  />
)

export const ChannelAttributes = () => (
  <ReactTable
    data={makeData()}
    columns={[
      {
        Header: "Drainage Area",
        accessor: "siteID",
      },
      {
        Header: "Channel Width",
        accessor: "siteName",
      },
      {
        Header: "Channel Height",
        accessor: "latitude",
      },
      {
        Header: "Source",
        accessor: "latitude",
      }
    ]}
    defaultPageSize={1}
    className="-striped -highlight"
  />
)

export const ClimateInformation = () => (
  <ReactTable
    data={makeData()}
    columns={[
      {
        Header: "Climate ID",
        accessor: "siteID",
      },
      {
        Header: "Climate Description",
        accessor: "siteName",
      }
    ]}
    defaultPageSize={1}
    className="-striped -highlight"
  />
)

export const ChannelReference = () => (
  <ReactTable
    data={makeData()}
    columns={[
      {
        Header: "Estimated Bankful Discharge",
        accessor: "siteID",
      },
      {
        Header: "Reference",
        accessor: "siteName",
      }
    ]}
    defaultPageSize={1}
    className="-striped -highlight"
  />
)

export const Logo = () =>
  <div style={{ margin: '1rem auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
    For more examples, visit {''}
  <br />
    <a href="https://github.com/react-tools/react-table" target="_blank">
      <img
        src="https://github.com/react-tools/media/raw/master/logo-react-table.png"
        style={{ width: `150px`, margin: ".5em auto .3em" }}
      />
    </a>
  </div>;

export const Tips = () =>
  <div style={{ textAlign: "center" }}>
    <em>Tip: Hold shift when sorting to multi-sort!</em>
  </div>;
