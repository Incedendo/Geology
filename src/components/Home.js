import React, { Component } from 'react';
import HomeForm from './HomeForm';
import '../assets/scss/include.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import fetch from 'isomorphic-fetch';


const baseURL = 'http://localhost:3000'

class Home extends Component {
  state = {
      methods: [],
      valueSent: false,
  };

  displayState = () => {
    console.log("Fulcrum Approach chosen: " + this.state.fulcrumApproach)
  }


  renderHeader = () => (
    <div>
      <h1 className="center greenText">
          Welcome to Our Senior Design Project Prototype
      </h1>
    </div>
  )

  postFulcrum = () => {
    console.log("doing Fetch for postFulcrum")
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'http://localhost:5000/api/values/fulcrum'


    // fetch(api_url + '/api/values/fulcrum', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     method: 'Fulcrum',
    //   })
    // })

    // axios.post('http://localhost:5000/user/fulcrum', {
    //   firstName: 'Fulcrum',
    //   lastName: 'Approach'
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }

  postTBD = () => {
    // fetch('http://localhost:5000/api/values/tbd', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     method: 'TBD',
    //   })
    // })

    axios.post('http://localhost:5000/api/values', {
      firstName: 'TBD',
      lastName: 'Approach'
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
  }

  createBlogPost = (data) => {
    let herokuURL = 'https://cors-anywhere.herokuapp.com/';
    let apiURL =  'http://localhost:5000/api/values';
    let finalURL = herokuURL+apiURL;

    console.log(data);

    fetch(finalURL, {
          method: 'POST',
          mode: 'CORS',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      }).then(res => {
        console.log("POST status: "+ res.status);

        return res;
      }).catch(error =>
          console.log(error)
        );
  }

  handleSubmit = (data) => {
    this.createBlogPost(data)
  }

  render() {
    return(
      <div>
        {this.renderHeader()}

        <h1>Users</h1>

        {/* {this.state.users.map(user =>
          <div key={user}>{user}</div>
        )} */}

        {/* {this.state.methods} */}



        {/* <button onClick={this.displayState}>Display State</button> */}

        {/* <HomeForm onSubmit={this.processOptions} /> */}
        <HomeForm />

        {/* wtf is this  */}
        {/* <div>
          {(this.state.fulcrumApproach || this.state.tbd) && <a class="btn-5" href="#" onClick={this.processOptions}>Next (Slide Effect)</a>}
        </div> */}


        <Link to={{
          pathname: '/helpfullinks',
        }}
          className=""
        >
          Research Documents/ White papers
        </Link>


      </div>
    )
  }
}

export default Home;

// componentDidMount() {
//   fetch('/api/values')
//     .then(res => res.json())
//     .then(data => {
//       console.log(data[0])
//       let methods = data.map( item => {
//         return (
//           <div key={item}>
//             <h3>User Choose: {item}</h3>
//           </div>
//         )
//       })
//       this.setState({ methods: methods })
//     });
// }
