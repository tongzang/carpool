import React, { Component } from 'react';
import { BottomSheet } from 'material-ui-bottom-sheet'
import { Subheader, FlatButton, Dialog, TextField, FloatingActionButton } from 'material-ui'
import GoogleMapReact from 'google-map-react';
import firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin'
import ContentAdd from 'material-ui/svg-icons/maps/add-location';
import { withRouter } from 'react-router'
import { Card, CardHeader } from 'material-ui/Card';

var config = {
    apiKey: "AIzaSyDdjZl55sXwnCN70yTJBLyOKT6qPN-ZjvM",
    authDomain: "carpool-6e2f5.firebaseapp.com",
    databaseURL: "https://carpool-6e2f5.firebaseio.com",
    projectId: "carpool-6e2f5",
    storageBucket: "carpool-6e2f5.appspot.com",
    messagingSenderId: "777247145634"
};

firebase.initializeApp(config);
class Main extends Component {

    constructor(props, context) {
        super(props);

        this.postData = {};
        this.state = {
            click: false,
            center: { lat: 50, lng: 22 },
            zoom: 15,
            value: '',
            address: '',
            tel: '',
            checkPin: false
        };

        this.tempUser = {};

        this.markers = [
            {
                id: 1,
                lat: 14.160869,
                lng: 101.34879,
                text: '1'
            }, {
                id: 2,
                lat: 15.160869,
                lng: 101.34879,
                text: '2'
            }
        ]

        this.openBottomSheet = this.openBottomSheet.bind(this);
        this.closeBottomSheet = this.closeBottomSheet.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.clickPin = this.clickPin.bind(this);
        this.go = this.go.bind(this);
    }

    state = {
        open: false,
    };

    go(key) {
        this.props.history.push('/user/' + key['.key'])
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOK = () => {
        this.setState({ open: false });
        this.postData.max = this.state.value;
        this.postData.address = this.state.address;
        this.postData.tel = this.state.tel;

        var newPostKey = firebase.database().ref().child('posts').push().key;

        var updates = {};
        updates['/items/' + newPostKey] = this.postData;

        firebase.database().ref().update(updates);
    }
    getInitialState() {
        return { items: [] };
    }

    componentWillMount() {
        var self = this
        navigator.geolocation.getCurrentPosition((position) => {
            self.setState({
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            })
        }, function () {
            //handleLocationError(true, infoWindow, map.getCenter());
        });
        this.firebaseRef = firebase.database().ref("items");
        this.bindAsArray(this.firebaseRef, 'items');
    }

    openBottomSheet(key) {
        this.tempUser = this.state.items[key];
        this.setState({
            click: true
        })
        this.setState({
            checkPin: false
        })
    }

    closeBottomSheet() {
        this.setState({
            click: false
        })
    }

    handleChange(event) {
        this.setState({ value: event.target.value });

    }

    handleChange2(event) {
        this.setState({ address: event.target.value });
    }

    handleChange3(event) {
        this.setState({ tel: event.target.value });
    }

    _onClick = ({ x, y, lat, lng, event }) => {
        if (this.state.checkPin) {
            var d = new Date();
            var n = d.getTime();
            this.handleOpen();
            var self = this
            navigator.geolocation.getCurrentPosition((position) => {
                self.postData = {
                    name: this.props.user.providerData[0].displayName,
                    newLat: lat,
                    newLng: lng,
                    photo: this.props.user.photoURL,
                    uid: this.props.user.providerData[0].uid,
                    // oldLat: position.coords.latitude,
                    // oldLng: position.coords.longitude,
                    time: n,
                    oldLat: lat,
                    oldLng: lng,
                };
            }, function () {
                //handleLocationError(true, infoWindow, map.getCenter());
            });
        }

    }
    clickPin() {
        this.setState({
            checkPin: true
        })
    }

    render() {
        const AnyReactComponent = ({ test }) => (
            <div onClick={this.openBottomSheet.bind(null, test)}
                className="pin">
            </div>
        );
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleOK}
            />,
        ];

        return (

            <div>
                <FloatingActionButton style={{ position: 'absolute', bottom: '0', padding: '16px' }} onClick={this.clickPin}>
                    <ContentAdd />
                </FloatingActionButton>
                <div className="show">
                    <GoogleMapReact
                        center={this.state.center}
                        defaultZoom={15}
                        onClick={this._onClick}
                    >
                        {
                            this.state.items.map((marker, index) => {
                                return (
                                    <AnyReactComponent
                                        key={marker['.key']}
                                        lat={marker.oldLat}
                                        lng={marker.oldLng}
                                        test={index}
                                    >
                                    </AnyReactComponent>

                                )
                            })
                        }
                    </GoogleMapReact>
                    {
                        this.state.checkPin ?
                            <div className="labelShow">
                                <Card style={{ width: '80px' }}>
                                    <CardHeader
                                        title="Marker"
                                        subtitle=""
                                        actAsExpander={false}
                                        showExpandableButton={false}
                                    />
                                </Card>
                            </div>
                            : <div />

                    }

                    <Dialog
                        title="Find Friend"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        <TextField
                            hintText=""
                            floatingLabelText="สถานที่"
                            value={this.state.address} onChange={this.handleChange2}
                        />
                        <TextField
                            hintText=""
                            floatingLabelText="จำนวนคน"
                            value={this.state.value} onChange={this.handleChange}
                        />
                        <TextField
                            hintText=""
                            floatingLabelText="เบอร์โทรศัพท์"
                            value={this.state.tel} onChange={this.handleChange3}
                        />
                    </Dialog>
                    <BottomSheet
                        onRequestClose={() => {
                            self = this
                            setTimeout(function () {
                                self.closeBottomSheet()
                            }, 100)
                        }
                        }
                        open={this.state.click}
                    >
                        <Subheader>{this.tempUser.name}</Subheader>
                        <div style={{ height: '80px', background: '#E4BE55' }} onClick={this.go.bind(null, this.tempUser)}>
                            <div>
                                <div style={{ 'padding-left': '16px' }}>
                                    <div style={{ 'margin-top': 0, width: '60px', display: 'inline' }}>
                                        <img src={this.tempUser.photo} style={{ 'margin-top': '10px', background: '#FFFFFF', 'border': '1px solid #000000', display: 'inline', height: '60px', width: '60px', 'border-radius': '50%', 'object-fit': 'cover' }} />
                                    </div>
                                    <div style={{ position: 'absolute', 'padding-left': '16px', 'padding-top': '20px', display: 'inline', color: '#FFFFFF' }}>
                                        Go to {this.tempUser.address}<br />
                                        Need {this.tempUser.max} people
                                        </div>
                                </div>
                            </div>
                        </div>
                    </BottomSheet>
                </div>
            </div >
        );
    }
}
reactMixin(Main.prototype, ReactFireMixin)

export default withRouter(Main);
