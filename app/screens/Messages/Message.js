import React from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";

import Colors from "../../assets/styles/colors";
import images from "../../assets/img/image";

const { width, height } = Dimensions.get("window");

const Message = ({ MessageContent }) => (
  <View style={styles.messageContainer}>
    <Image style={styles.profileImage} source={images.profileImage} />
    <View style={styles.messageTextArea}>
      <Text style={styles.messageAuthor}>Sathish Sachu</Text>
      <Text style={styles.messageText}>{MessageContent.text}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  messageTextArea: {
    maxWidth: width - width / 3.5
  },
  messageAuthor:{
    textDecorationLine:"underline",
    fontFamily: 'Roboto',
    marginLeft: 10,
  },
  messageText: {
    backgroundColor: Colors.COLOR_PRIMARY,
    color: "white",
    marginLeft: 10,
    borderRadius: 10,
    padding: 5
  }
});

export default Message;
