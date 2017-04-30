import React, { Component } from 'react';
import '../styles/style.css';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from 'firebase'
import { withRouter } from 'react-router'
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';

class Group extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { user: {}, status: false }
    this.setData = this.setData.bind(this);
  }
  componentWillMount() {
    var res = this.props.location.pathname.substring(6);
    var self = this
    firebase.database().ref('/items/' + res).once('value').then(function (snapshot) {
      self.setData(snapshot.val());
    });

  }

  setData(value) {
    value.tel = "tel:" + value.tel;
    this.setState({ user: value, status: true })
  }

  render() {
    const style = {
      'textAligh': 'center',
      'backgroundColor': '#009DFF',
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
              <div style={{ 'paddingTop': '16px' }} className="padding-screen">
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
