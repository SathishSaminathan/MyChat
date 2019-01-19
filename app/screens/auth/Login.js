import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import images from "../../assets/img/image";
import Colors from "../../assets/styles/colors";

const { width, height } = Dimensions.get("window");

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogin = () => {};

  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={images.backgroundImage}
        blurRadius={3}
      >
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
        <View style={styles.logoArea}>
          <Image style={styles.logoImage} source={images.logoImg} />
          <Text style={styles.logoText}>WELCOME TO MY APP</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.handleLogin}
        >
          <View style={styles.buttonTextArea}>
            <FontAwesome style={styles.buttonText} name="google-plus" />
            <Text style={[styles.buttonText, { fontSize: 18 }]}>
              Login with Gmail
            </Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logoArea: {
    width: "100%",
    height: 400,
    alignItems: "center"
  },
  logoImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.COLOR_PRIMARY
  },
  logoText: {
    color: "white",
    marginVertical: 10,
    fontSize: 45,
    fontFamily: "vincHand"
  },
  buttonContainer: {
    width: "90%",
    backgroundColor: Colors.COLOR_PRIMARY,
    height: height / 12,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  buttonTextArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
    paddingHorizontal: 30
  },
  buttonText: { color: "white", fontSize: 24, fontFamily: "Roboto" }
});
