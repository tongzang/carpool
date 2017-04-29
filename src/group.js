import React, { Component } from 'react';
import './App.css';
import { Image } from 'material-ui-image';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from 'firebase'
import { withRouter } from 'react-router'
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';

class Group extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { user: {}, status: false }
    this.join = this.join.bind(this);

  }
  componentWillMount() {
    var res = this.props.location.pathname.substring(6);
    self = this;
    firebase.database().ref('/items/' + res).once('value').then(function (snapshot) {
      snapshot.val().tel = "tel:" + snapshot.val().tel;
      self.setState({ user: snapshot.val() })
      self.setState({ status: true })
      self.state.user.tel = "tel:" + self.state.user.tel;
      self.setState({ user: self.state.user })
    });

  }

  join() {
    var res = this.props.location.pathname.substring(6);
    var postData = this.state.user;
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
      <div>
        {
          this.state.status ?
            < div className="box" >
              <img src={this.state.user.photo} alt={"user"} className="imgUser" />
              <div className="bor">
                <center><div className="txtH">{this.state.user.name}</div></center>
              </div>
              <Divider />
              <div style={{ 'padding-top': '16px' }}>
                <div className="inbox">
                  <i className="material-icons">room</i>
                  <span className="txt">{this.state.user.address}</span>
                </div>
                <div className="inbox">
                  <i className="material-icons">timelapse</i>
                  <span className="txt">{this.state.user.time}</span>
                </div>
                <div className="inbox">
                  <i className="material-icons">face</i>
                  <span className="txt">{this.state.user.max}</span>
                </div>
              </div>
              <RaisedButton label="Join" className="btn3" primary={true} style={style} href={this.state.user.tel} />
            </div> :
            <div className="loader">
              <CircularProgress size={80} thickness={5} />
            </div>
        }
      </div>

    );
  }
}

export default withRouter(Group);
