import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

  injectTapEventPlugin();


class App extends Component {
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
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
          <div className = "bg">
            ddddd
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
