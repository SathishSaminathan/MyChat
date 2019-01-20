import React, { Component } from "react";
import { View, Text } from "react-native";
import { GoogleSignin } from "react-native-google-signin";
import firebase from 'react-native-firebase';

export default class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "sat"
    };
  }

  signOut = () => {
    firebase.auth().signOut();
    // try {
    //   // await GoogleSignin.revokeAccess();
    //   GoogleSignin.signOut()
    //     .then(() => this.setState({
    //       user:null
    //     },()=>console.log("user signed out. do your job!")))
    //     .catch(err => console.error("sum tim wong", err));
    //   this.setState({ user: null }); // Remember to remove the user from your app's state as well
    // } catch (error) {
    //   console.error(error);
    // }
  };

  render() {
    return (
      <View>
        <Text onPress={this.signOut}> LogOut </Text>
      </View>
    );
  }
}
