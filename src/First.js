import React, { Component } from 'react'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './App'
import Home from './Main'
import Group from './Group'
import firebase from 'firebase'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { AppBar, List, ListItem, Subheader, FlatButton } from 'material-ui'

function PrivateRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    )
}

function PublicRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed === false
                ? <Component {...props} />
                : <Redirect to='/home' />}
        />
    )
}

export default class App extends Component {
    state = {
        authed: false,
        loading: true,
    }


    constructor(props) {
        super(props);
        console.log(props);

    }

    componentDidMount() {
        this.removeListener = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.user = user;
                this.setState({
                    authed: true,
                    loading: false,
                })
            } else {
                this.setState({
                    authed: false,
                    loading: false
                })
            }
        })
    }

    logout() {
        firebase.auth().signOut().then(function () {
            console.log('Signed Out');
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    }

    componentWillUnmount() {
        this.removeListener()
    }
    render() {
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
        return this.state.loading === true ? <h1>Loading</h1> : (
            <MuiThemeProvider muiTheme={muiTheme}>
                <BrowserRouter>
                    <div>
                        <div>
                            {
                                this.state.authed
                                    ?
                                    <AppBar
                                        title=""
                                        iconElementRight={<FlatButton label="Logout" onClick={this.logout} />}
                                        iconElementLeft={<div />}
                                        style={{ position: 'fixed' }}
                                    /> : <div />
                            }

                        </div>
                        <div className="container">
                            <div className="row">
                                <Switch>
                                    <PublicRoute path='/' exact component={Home} />
                                    <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                                    <PrivateRoute authed={this.state.authed} user={this.user} path='/home' component={() => (<Home user={this.user} />)} /> />
                                    <PrivateRoute authed={this.state.authed} user={this.user} path='/user' component={() => (<Group user={this.user} />)} /> />
                                <Route render={() => <h3>No Match</h3>} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>

        );
    }
}