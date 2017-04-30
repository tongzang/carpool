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
  
  componentWillMount() {

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {

      }
    });
  }


  login() {
    firebase.auth().signInWithRedirect(provider).then(function (result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.

      // ...
    }).catch(function (error) {
      // Handle Errors here.

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
          <img src={logo} alt={"logo"} className="logo" style={{ 'margin-top': '0px' }} />
          <center>
            <h2>Welcome to Car Poor</h2>
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
