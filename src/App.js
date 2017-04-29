import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import logo from './images/logo.png' // relative path to image 
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from 'firebase'

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

      }
    });
  }


  login() {
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
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
      <div className="grad1 ">
        <div className="wapper ">
          <img src={logo} alt={"logo"} className="logo" />
          <center>
            <h2>Welcome to Car Pool</h2>
            <p className="f">
              You share and my share
            </p>
            <p >
              taxi in Thailand.
            </p>

            <RaisedButton labelColor="#FFFFFF" onClick={this.login}
              backgroundColor="#0D47A1" className="btn4" label="Facebook Login"
              style={style} />

          </center>

        </div>
      </div>
    );
  }
}

export default App;
