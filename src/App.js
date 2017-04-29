import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import injectTapEventPlugin from 'react-tap-event-plugin';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import logo from './images/logo.png' // relative path to image 
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Image } from 'material-ui-image';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from 'firebase'
  injectTapEventPlugin();

 var config = {
  apiKey: "AIzaSyDdjZl55sXwnCN70yTJBLyOKT6qPN-ZjvM",
  authDomain: "carpool-6e2f5.firebaseapp.com",
  databaseURL: "https://carpool-6e2f5.firebaseio.com",
  projectId: "carpool-6e2f5",
  storageBucket: "carpool-6e2f5.appspot.com",
  messagingSenderId: "777247145634"
};

firebase.initializeApp(config);
  var provider = new firebase.auth.FacebookAuthProvider()

class App extends Component {
  constructor (props, context) {
    super(props, context);

  }


  login () {
    // this.submitData()
    var vm = this
    firebase.auth().signInWithPopup(provider).then(function(result) {
      console.log(result)
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      // ...
    })
  }
  render() {
    const style = {

      'text-aligh': 'center',
      'background-color' : '#009DFF',
      'color': '#FFFFFF'
    }

  const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#E4BE55',
    accent1Color: '#000000',
    textColor: '#E4BE55',
    alternateTextColor: '#FFFFFF'
  },
   
      appBar: {
        height: 50,
      },
    });
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
          <div className = "bg">
            <div className="wapper">
                <img src={logo} alt={"logo"}/> 
                <center>
                  <div className = "btn">
                    <RaisedButton labelColor="#FFFFFF" onClick={this.login}  backgroundColor="#009DFF" className = "btn2" label="Facebook Login" style={style} />
                  </div>
                  <button onClick={this.login}>Login</button>
                </center>
                
            </div>
          </div>


      </MuiThemeProvider>
    );
  }
}

export default App;
