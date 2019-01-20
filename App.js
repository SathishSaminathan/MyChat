/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View
} from "react-native";
import firebase from "react-native-firebase";

import Login from "./app/screens/auth/Login";
import Messages from "./app/screens/Messages/Messages";
import Home from "./app/screens/Home/Home";
import Colors from "./app/assets/styles/colors";
import LoggedIn from "./app/screens/auth/LoggedIn";
import LoggedOut from "./app/screens/auth/LoggedOut";
import Loader from "./app/components/Loader";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      Loading: true,
      CurrentUser: null
    };
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user)=>{
      this.setState({
        Loading:false,
        user
      })
    })
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  _currentUser = CurrentUser => {
    this.setState(
      {
        CurrentUser: CurrentUser.user._user
      },
      () => console.log("working.user,", this.state.CurrentUser)
    );
  };

  render() {
    // The application is initialising
    if (this.state.Loading)
      return (
        <Loader/>
      );
    // The user exists, so they're logged in
    if (this.state.user)
      return <Messages CurrentUser={this.state.CurrentUser} />;
    // The user is null, so they're logged out
    return <Login currentUser={this._currentUser} />;
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
});
