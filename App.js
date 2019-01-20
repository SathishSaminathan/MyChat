/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import firebase from 'react-native-firebase';

import Login from './app/screens/auth/Login';
import Messages from './app/screens/Messages/Messages';
import Home from './app/screens/Home/Home';
import Colors from "./app/assets/styles/colors";
import LoggedIn from './app/screens/auth/LoggedIn';
import LoggedOut from './app/screens/auth/LoggedOut';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor () {
    super()
    this.state={
      Loading:true
    }
  }

  componentDidMount(){
    this.authSubscription = firebase.auth().onAuthStateChanged((user)=>{
      debugger
      this.setState({
        Loading:false,
        user
      })
    })
  }

  componentWillUnmount(){
    this.authSubscription();
  }
  
  render() {
    // The application is initialising
    if (this.state.loading) return <ActivityIndicator style={{ color:Colors.COLOR_PRIMARY}} animating size="large" />;
    // The user exists, so they're logged in
    if (this.state.user) return <Messages />;
    // The user is null, so they're logged out
    return <Login />;
    // return (
    //   // <Login/>
    //   // <Messages/>
    //   <Home/>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
