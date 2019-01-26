import React from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";

import Colors from "../../assets/styles/colors";
import images from "../../assets/img/image";

const { width, height } = Dimensions.get("window");

const Message = ({ MessageContent, CurrentUser }) => (
  <View
    style={[
      styles.messageContainer,
      {
        flexDirection: `${
          MessageContent.senderId === CurrentUser.uid ? "row-reverse" : "row"
        }`
      }
    ]}
  >
    {MessageContent.senderId !== CurrentUser.uid && (
      <Image
        style={styles.profileImage}
        source={{ uri: MessageContent.senderAvatar }}
      />
    )}
    <View style={styles.messageTextArea}>
      {MessageContent.senderId !== CurrentUser.uid && (
        <Text style={styles.messageAuthor}>{MessageContent.senderName}</Text>
      )}
      <Text
        style={
          MessageContent.senderId === CurrentUser.uid
            ? styles.ownMessageText
            : styles.messageText
        }
      >
        {MessageContent.content}
      </Text>
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
  messageAuthor: {
    textDecorationLine: "underline",
    fontFamily: "Roboto",
    marginLeft: 10
  },
  messageText: {
    backgroundColor: Colors.COLOR_PRIMARY,
    color: "white",
    marginLeft: 10,
    borderRadius: 10,
    padding: 5
  },
  ownMessageText: {
    backgroundColor: Colors.WHITE_COLOR,
    color: Colors.COLOR_PRIMARY,
    marginLeft: 10,
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.COLOR_PRIMARY,
  }
});

export default Message;
