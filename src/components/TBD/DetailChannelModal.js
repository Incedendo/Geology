import React, { Component } from 'react';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import { cardTitle, CardFrequencies, topMenuOverlay, errorModal } from '../CardData';


import MapContainer from '../GoogleAPIScripts/MapContainer';
import { Link } from 'react-router-dom';

import '../../assets/scss/DetailedChannelModal.css';
import '../../assets/scss/_helpfulLink.scss';
import '../../assets/scss/include.scss';

const ModalStyle = {
  overlay : {
    position          : 'fixed',
    top               : "0%",
    left              : "0%",
    right             : "0%",
    bottom            : "0%",
    backgroundColor   : 'rgba(255, 255, 255, 0.75)',
    zIndex            : 200,
  },
  content : {
    position                   : 'absolute',
    top                        : '0px',
    left                       : '0px',
    right                      : '0px',
    bottom                     : '0px',
    border                     : '1px solid #ccc',
    background                 : 'gray',
    color                      : 'white',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '0px',
  }
}

class DetailChannelModal extends Component {
  state = {
    initial_map_zoom_level: 8,
  }

  // renderSeparateTitle = (dataType) => (
  //    dataType.map((title) => {
  //     const isNotLast = dataType.indexOf(title) !== dataType.length-1;
  //     if(isNotLast){
  //       return <span>{title} - </span>
  //     }
  //     return <span>{title}</span>
  //   })
  // )
  //
  renderHeader = () => (
    <div className="modal-header">
      Detailed Information for Channel ID: {this.props.id}
    </div>
  )

  renderChannelView = () => (
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
            <td>{this.props.id}</td>
            <td>{this.props.siteName}</td>
            <td>{this.props.lat}</td>
            <td>{this.props.long}</td>
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
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
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
              <td>Jill</td>
              <td>Smith</td>
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
              <td>Jill</td>
              <td>Smith</td>
            </tr>
          </table>
        </div>
      </div>

      <div
        style={{
          "margin-top": "20px",
        }}
      >
        <MapContainer
          lat=""
          long=""
        />
      </div>

    </div>
  )

  //
  // renderList = (arr, dataType) => (
  //   <div className="list-page-wrapper no-padding full-screen ">
  //     <div className='listCard'>
  //       <DetailedListDisplay listHome={arr} dataType={dataType}/>
  //     </div>
  //   </div>
  // )
  //
  // getModalProps(){
  //   return ({
  //     isOpen: this.state.modalIsOpen,
  //     closeModal: this.toggleModal,
  //     enabledModal: this.state.modalIsOpen
  //   })
  // }
  //
  //
  // renderError = () => (
  //   <div>
  //     <Modal
  //       {...this.getModalProps()}
  //       style={errorModal}
  //     >
  //       <div className="taskbar">
  //         <h1>
  //           PAGE NOT FOUND
  //         </h1>
  //         <NavLink to="/" className="navlink" onClick={this.toggleModal}>Close</NavLink>
  //       </div>
  //     </Modal>
  //   </div>
  // )
  //
  // renderIndivContent = (card, dataType, arr) => {
  //   if(!card.listCard && dataType[0] === "Visits by Device Type")
  //     return this.renderList(arr, dataType);
  //   if(!card.listCard && dataType !== "Visits by Device Type")
  //     return this.renderNotList(card, arr, dataType);
  //   if(card.listCard)
  //     return this.renderList(arr, dataType);
  // }

  renderMainDetail = () => (
    <div>
      <Modal
        isOpen={this.props.isOpen}
        closeModal={this.props.closeModal}
        enabledModal={this.props.enabledModal}
        // style={topMenuOverlay}
      >
        {this.renderHeader()}

        {this.renderChannelView()}
        {/* {this.renderIndivContent(card, dataType, arr)}  */}

        <button
          onClick={this.props.closeModal}
        >
          Close
        </button>

      </Modal>
    </div>
  )

  render(){
    return(
      this.renderMainDetail()
    );
  }
}

export default DetailChannelModal;

// why do we use mounted here?
