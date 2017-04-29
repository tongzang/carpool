import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import logo from './images/logo.png' // relative path to image 
import './App.css';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Image } from 'material-ui-image';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from 'firebase'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

injectTapEventPlugin();


var provider = new firebase.auth.FacebookAuthProvider()

class App extends Component {

  state = {
    redirectToReferrer: false
  }

  constructor(props, context) {
    super(props, context);

  }
  componentWillMount() {

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user);
      }
    });
  }


  login() {
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }


  render() {
    const style = {

      'text-aligh': 'center',
      'background-color': '#009DFF',
      'color': '#FFFFFF'
    }


    return (
        <div className="bg">
          <div className="wapper">
            <img src={logo} alt={"logo"} />
            <center>
              <div className="btn">
                <RaisedButton labelColor="#FFFFFF" onClick={this.login} backgroundColor="#009DFF" className="btn2" label="Facebook Login" style={style} />
              </div>
              <button onClick={this.login}>Login</button>
            </center>

          </div>
        </div>
    );
  }
}

export default App;
