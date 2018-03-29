import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FulcrumResultComponent from './FulcrumResultComponent';
import RiverChannelsTable  from "../TBD/RiverChannelsTable";


import '../../assets/scss/include.scss';
//import other components

class FulcrumSubmissionForm extends Component {

  renderBackBtn = () => (
    <div className="back-button-div-fulcrum">
       <Link to="/"
       className="back-button-link">
           Back
        </Link>
    </div>
  )

  render(){
    return(
      <div>
        {this.renderBackBtn()}

        {FetchedResults.map(
          (fieldObject,index) =>
          <FulcrumResultComponent
            key={fieldObject.title}
            title = {fieldObject.title}
            returnedData = {fieldObject.returnedData}
          />
        )}

        {this.renderRiverChannelTable()}

      </div>

    )
  }

}

export default FulcrumSubmissionForm;
