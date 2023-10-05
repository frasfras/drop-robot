import React, { Component } from 'react';
import axios  from 'axios';
import './index.css';
import './App.css'

class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      outputValue: '',
    };
  }
  refreshConnect=(e)=>  {
    // Implement logic to fetch a new token from the backend
    // let data = JSON.stringify({
    //   "username": "",
    //   "password": "Magazine1!"
    // });
    
    // let config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: 'https://developer.expert.ai/oauth2/token',
    //   headers: { 
    //     '': '', 
    //     'Content-Type': 'application/json'
    //   },
    //   data : data
    // };
    //       axios.request(config)
    //       .then((res) => {
    //       console.log(JSON.stringify(res.data));
    //      // localStorage.setItem('token',res.data.user.token);
    //       return res.data.token;
    //       })
    //       .catch((error) => {
    //       console.log(error);
    //       });
  //   return axios.post('/refresh-token-endpoint').then((res) => {
  //     console.log(res);
     
  //   });
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Perform some action with the input value (e.g., process it)
    let data = JSON.stringify({
      "username": "consistengolf1@gmail.com",
      "password": "Magazine1!"
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://developer.expert.ai/oauth2/token',
      headers: { 
        'name': 'hi', 
        'Content-Type': 'application/json'
      },
      data : data
    };
          axios.request(config)
          .then((res) => {
       //   console.log(JSON.stringify(res.data));
          this.setState({outputValue: res.data});
         
         localStorage.setItem('token',res.data);
          // return res.data.token;
          })
          .catch((error) => {
          console.log(error);
          });


    
    const processedValue = this.state.outputValue;
    // Update the output value in the state
    this.setState({ outputValue: processedValue });
  }

  render() {
    return (
      <div className="my-form">
        <h2>Login </h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Input:
            <input
              type="text"
              value={this.state.inputValue}
              onChange={this.handleInputChange}
              placeholder="type skills "
            />
          </label>
          <button type="submit" className="btn  btn-secondary">Submit</button>
        </form>
        <div>
          <h3></h3>
          <p>{this.state.outputValue}</p>
        </div>
      </div>
    );
  }
}

export default MyForm;
