import React, { Component } from 'react';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import { cardTitle, CardFrequencies, topMenuOverlay, errorModal } from './CardData';
import '../assets/scss/_helpfulLink.scss';

class HelpfulLinkModal extends Component {
  state = {
    modalIsOpen: true
  }

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
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
  renderTaskbar = (dataType) => (
    <div className="">
      <div className="">

        <NavLink to="/" className="" onClick={this.toggleModal}>
          Close Button
        </NavLink>

        <div className="centerText">
            <a className="helpLink">Helpful Link 1</a>
        </div>
        <div className="centerText">
            <a className="helpLink">Helpful Link 2</a>
        </div>
        <div className="centerText">
            <a className="helpLink">Helpful Link 3</a>
        </div>
        <div className="centerText">
            <a className="helpLink">Helpful Link 4</a>
        </div>
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
        isOpen={this.state.modalIsOpen}
        closeModal={this.toggleModal}
        enabledModal={this.state.modalIsOpen}
        style={topMenuOverlay}
      >
        {this.renderTaskbar()}
        {/* {this.renderIndivContent(card, dataType, arr)}  */}

      </Modal>
    </div>
  )

  render(){
    return(
      this.renderMainDetail()
    );
  }
}

export default HelpfulLinkModal;

// why do we use mounted here?
