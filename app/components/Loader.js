import React, { Component } from "react";
import { View,Text,ActivityIndicator, StyleSheet, StatusBar } from "react-native";

import Colors from "../assets/styles/colors";

export default class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.loaderContainer}>
      <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.COLOR_PRIMARY_DARK}
        />
        <Text style={styles.loadingText}>Welcome to MY CHAT</Text>
        <ActivityIndicator
          color={Colors.WHITE_COLOR}
          style={[styles.loaderStyles]}
          animating
          size="large"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    loaderContainer:{
        flex:1,
        alignItems: 'center',
        backgroundColor: Colors.COLOR_PRIMARY,
        justifyContent:"space-around"
    },
    loadingText:{
        fontFamily:"Roboto",
        fontSize:30,
        color:Colors.WHITE_COLOR,
    },
  loaderStyles: {
    // flex: 1
  }
});
