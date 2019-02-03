import React, { PureComponent } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions
} from "react-native";

import Colors from "../assets/styles/colors";

const { width, height } = Dimensions.get("window");

export default class CustomLoader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.leaderArea}>
        <ActivityIndicator color={Colors.WHITE_COLOR} />
        <Text style={styles.textStyle}>Loading</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leaderArea: {
    alignSelf: "center",
    top: 10,
    width: width / 3,
    backgroundColor: Colors.COLOR_PRIMARY,
    // flex:1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 40,
    borderRadius: 20
  },
  textStyle: {
    color: Colors.WHITE_COLOR,
    marginRight: 10
  }
});
