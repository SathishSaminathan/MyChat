/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Alert } from "react-native";
import firebase from "react-native-firebase";
import SplashScreen from "react-native-splash-screen";

import Login from "./app/screens/auth/Login";
import Messages from "./app/screens/Messages/Messages";
import Home from "./app/screens/Home/Home";
import LoggedIn from "./app/screens/auth/LoggedIn";
import LoggedOut from "./app/screens/auth/LoggedOut";
import Loader from "./app/components/Loader";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      Loading: true,
      CurrentUser: null
    };
  }

  componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
    SplashScreen.hide();
    this.authSubscription = firebase.auth().onAuthStateChanged(user => {
      this.setState({
        Loading: false,
        user
      });
    });
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
  }

  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken', value);
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  componentWillUnmount() {
    this.authSubscription();
    this.notificationListener();
    this.notificationOpenedListener();
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
    if (this.state.Loading) return <Loader />;
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
  }
});
