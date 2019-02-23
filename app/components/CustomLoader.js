import React, { PureComponent } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions
} from "react-native";
import * as Animatable from "react-native-animatable";

import Colors from "../assets/styles/colors";

const { width, height } = Dimensions.get("window");

export default class CustomLoader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Animatable.View
        style={styles.leaderArea}
        // animation="rubberBand"
        // iterationCount="infinite"
      >
        <ActivityIndicator color={Colors.WHITE_COLOR} size="small" />
        <Text style={{
          fontSize:10,
          position:'absolute',
          left:11,
          color:Colors.COLOR_SECONDARY
        }}>M</Text>
      </Animatable.View>
      /* <Text style={styles.textStyle}>Loading</Text> */
    );
  }
}

const styles = StyleSheet.create({
  leaderArea: {
    position:'relative',
    alignSelf: "center",
    top: 10,
    // width: width / 3,
    backgroundColor: Colors.COLOR_PRIMARY,
    // flex:1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    // height: 40,
    borderRadius: 20,
    padding: 5
  },
  textStyle: {
    color: Colors.WHITE_COLOR,
    marginRight: 10
  }
});
