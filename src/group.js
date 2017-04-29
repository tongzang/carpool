import React, { Component } from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import user from './images/user.jpg' // relative path to image 
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Image } from 'material-ui-image';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from 'firebase'


class Group extends Component {
  constructor (props, context) {
    super(props, context);
    console.log(props);
  }



  render() {
    const style = {

      'text-aligh': 'center',
      'background-color' : '#009DFF',
      'color': '#FFFFFF'
    }

    return (

          <div className = "container">
            {/*<div className="head">
                
                
            </div> */}
            <div className="box">

            <img src={user} alt={"user"} className="imgUser"/>

              <div className="bor">
                <center><div className="txtH">Sawaros Nakonpat</div></center>
              </div>
              <div className="inbox">
                <i className="material-icons">room</i>
                <span className="txt">JJ Green</span>
              </div>
              <div className="inbox">
                <i className="material-icons">timelapse</i>
                <span className="txt">31 m</span>
              </div>
              <div className="inbox">
                <i className="material-icons">face</i>
                <span className="txt">+3 personal</span>
              </div>

              
              
                
              <RaisedButton label="Join" className="btn3" primary={true} style={style} /> 
                
              
            </div>
          </div>


    );
  }
}

export default Group;
