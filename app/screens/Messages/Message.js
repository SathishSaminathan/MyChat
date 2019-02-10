import React from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import moment from "moment";

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
      <View style={[styles.messageAndTime, MessageContent.senderId === CurrentUser.uid&& {borderRadius:13,borderBottomLeftRadius:13, borderBottomRightRadius:0, padding:3, backgroundColor:Colors.COLOR_SECONDARY, borderWidth:1, borderColor:Colors.COLOR_PRIMARY}]}>
        <Text
          style={
            MessageContent.senderId === CurrentUser.uid
              ? styles.ownMessageText
              : styles.messageText
          }
        >
          {MessageContent.content}
        </Text>
        <Text style={[styles.sendTimeStyle, MessageContent.senderId === CurrentUser.uid&&{color:Colors.COLOR_PRIMARY}]}>
          {moment(MessageContent.timestamp).fromNow()}
        </Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf:'flex-end'
  },
  messageTextArea: {
    maxWidth: width - width / 3.5,
    elevation: 5
  },
  messageAuthor: {
    fontFamily: "Roboto",
    marginLeft: 10
  },
  messageAndTime: {
    flexDirection: "column",
    backgroundColor: Colors.COLOR_PRIMARY,
    maxWidth: width - width / 3.5,
    marginLeft: 10,
    borderRadius:13,
    padding:3,
    borderBottomLeftRadius:0,
    elevation:6,
    borderColor:Colors.COLOR_SECONDARY,
    borderWidth:1
  },
  messageText: {
    // backgroundColor: Colors.COLOR_PRIMARY,
    color: Colors.COLOR_SECONDARY,
    // marginLeft: 10,
    // borderRadius: 6,
    padding: 5
  },
  ownMessageText: {
    backgroundColor: Colors.COLOR_SECONDARY,
    color: Colors.COLOR_PRIMARY,
    // marginLeft: 10,
    borderRadius: 10,
    padding: 5,
  },
  sendTimeStyle: {
    fontSize: 10,
    fontStyle: "italic",
    paddingRight: 3,
    flex:1,
    alignSelf: 'flex-end',
    color: Colors.COLOR_SECONDARY,
  }
});

export default Message;
