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
import { withRouter } from 'react-router'


class Group extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { user: {} }
    this.join = this.join.bind(this);

  }
  componentWillMount() {
    var res = this.props.location.pathname.substring(6);
    self = this;
    firebase.database().ref('/items/' + res).once('value').then(function (snapshot) {
      self.setState({ user: snapshot.val() })

    });

  }

  join() {
    var res = this.props.location.pathname.substring(6);
    var postData = this.state.user;
    postData.amount += 1;
    // Get a key for a new Post.

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/items/' + res] = postData;

    firebase.database().ref().update(updates);
  }

  render() {
    const style = {
      'text-aligh': 'center',
      'background-color': '#009DFF',
      'color': '#FFFFFF'
    }

    return (
      < div className="container" >
        {/*<div className="head">
                
                
            </div> */}
        < div className="box" >

          <img src={this.state.user.photo} alt={"user"} className="imgUser" />

          <div className="bor">
            <center><div className="txtH">{this.state.user.name}</div></center>
          </div>
          <div className="inbox">
            <i className="material-icons">room</i>
            <span className="txt">{this.state.user.address}</span>
          </div>
          <div className="inbox">
            <i className="material-icons">timelapse</i>
            <span className="txt">31 m</span>
          </div>
          <div className="inbox">
            <i className="material-icons">face</i>
            <span className="txt">{this.state.user.amount} / {this.state.user.max}</span>
          </div>

          <RaisedButton label="Join" className="btn3" primary={true} style={style} onClick={this.join} />

        </div >
      </div >


    );
  }
}

export default withRouter(Group);
