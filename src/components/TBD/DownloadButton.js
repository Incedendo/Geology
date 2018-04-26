import React, { Component } from 'react';
import '../../assets/scss/include.scss';
import '../../assets/scss/ResultTable.scss';
import fileDownload from 'js-file-download';
import classNames from 'classnames';

class DownloadButton extends Component{
  state = {
    downloaded: false,
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
      const fileName = 'tbd_data_' + id + '.csv';
      fileDownload(blob, fileName);
    });

    this.setState({
      downloaded: true
    })
  }

  render(){
    const downloadButtonState = classNames({
      "back-btn-result": !this.state.downloaded,
      "": this.state.downloaded
    })

    return(
      <div className="csv-btn">
        <button
          className={downloadButtonState}
          disabled={this.state.downloaded}
          onClick={() => this.downloadCSV(this.props.siteID)}>
          Download CSV File
        </button>

        {!this.state.downloaded
          ?
          <div
            style={{
              'text-align': 'center',
            }}
          >
            (It might take up to 15 seconds to prepare the file for download...)
          </div>
          : <div></div>
        }
      </div>
    )
  }
}

export default DownloadButton;
