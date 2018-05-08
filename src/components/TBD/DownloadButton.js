import React, { Component } from 'react';
import '../../assets/scss/include.scss';
import '../../assets/scss/ResultTable.scss';
import classNames from 'classnames';

class DownloadButton extends Component{
  state = {
    downloaded: false,
    downloadURL: ''
  }

  componentDidMount(){
    const getCsvURL = 'https://aae79tnck1.execute-api.us-east-1.amazonaws.com/Prod/api/main/GetDischarge?siteID='+this.props.siteID;
    const getRequestData = {
      method: 'GET',
      Origin:'http://rafter-ui-bucket.s3-website-us-east-1.amazonaws.com/FulcrumApproach',
      //mode: "cors",
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
    .then( response => {
        if (response.status === 200 || response.status === 201) {
          console.log("Checking status:");
          console.log(response.text);
          return response.text();
          //return response.url;
        } else {
          console.log('Get CSV Failure!', response.status);
        }
      }
    ).then( downloadURL => {
      console.log("printing downloadURL: " + downloadURL);
      this.setState({
        downloadURL: downloadURL
      })
    })
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.state.downloaded !== nextState.downloaded
  }

  downloadCSV = (id) => {

    // const downloadURL = 'https://s3.amazonaws.com/rafter-discharge-bucket/discharge/discharge-05CK004.csv';
    //
    // console.log("stream id: ",id);
    //
    // const getCsvURL = 'https://aae79tnck1.execute-api.us-east-1.amazonaws.com/Prod/api/main/GetDischarge?siteID='+id;
    //
    // const getRequestData = {
    //   method: 'GET',
    //   Origin:'http://rafter-ui-bucket.s3-website-us-east-1.amazonaws.com/FulcrumApproach',
    //   //mode: "cors",
    //   headers: {
    //     // 'Content-Type': 'text/plain',
    //     // Accept: 'text/plain',
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //     // 'X-Content-Type-Options': 'nosniff',
    //   }
    // }

    // fetch(downloadURL, getRequestData).then( blob => {
    //   console.log("expecting returned data");
    //   //console.log(blob);
    //   const fileName = 'tbd_data_' + id + '.csv';
    //   fileDownload(blob, fileName);
    //   this.setState({
    //     downloaded: true
    //   })
    // }).catch(function(error) {
    //   console.log('Requestfailed', error)
    // });np

    // fetch(getCsvURL, getRequestData)
    // // .then( results => results.json() )
    // .then( response => {
    //     if (response.status === 200 || response.status === 201) {
    //       console.log("Checking status:");
    //       console.log(response);
    //       return response.text();
    //     } else {
    //       console.log('Get CSV Failure!', response.status);
    //     }
    //   }
    // ).then( downloadURL => {
    //   console.log("printing downloadURL: " + downloadURL);
    //
    //   return fetch(downloadURL, getRequestData);
    // })
    // // .then(response => {
    // //   response.blob();
    // // })
    // .then( blob => {
    //   console.log("expecting returned data");
    //   console.log(blob);
    //   const fileName = 'tbd_data_' + id + '.csv';
    //   fileDownload(blob, fileName);
    // }).catch(function(error) {
    //   console.log('Requestfailed', error)
    // });
    //
    // this.setState({
    //   downloaded: true
    // })
  }

  setDownloaded = () => {
    this.setState({
      downloaded: true
    })
  }

  render(){
    // const downloadButtonState = classNames({
    //   "back-btn-result": !this.state.downloaded,
    //   "": this.state.downloaded
    // })

    const link = "https://s3.amazonaws.com/rafter-discharge-bucket/discharge/discharge-"+this.props.siteID+".csv";


    return(
      <div className="csv-btn">

        {!this.state.downloaded
          ?
          <div
            style={{
              'text-align': 'center',
            }}
          >
            <a href={link}
              onClick={this.setDownloaded}
            >
              Download Discharge Data into a CSV file
            </a>
          </div>
          :
          <div></div>
        }
      </div>
    )
  }
}

export default DownloadButton;
