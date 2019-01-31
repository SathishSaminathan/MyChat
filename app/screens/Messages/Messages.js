import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  StatusBar
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Emoji from "react-native-emoji";
import firebase from "react-native-firebase";
import { GoogleSignin } from "react-native-google-signin";

import firebaseDb from "../../../firebase";
import Colors from "../../assets/styles/colors";
import CustomStyles from "../../assets/styles/styles";
import MessageArea from "./MessageArea";

const { width, height } = Dimensions.get("window");

export default class Messages extends Component {
  constructor(props) {
    console.log("constructor check", props.CurrentUser);
    super(props);
    this.state = {
      MessagesRef: firebaseDb.database().ref("messages"),
      CurrentUser: props.CurrentUser,
      Messages: [],
      MessageContent: "",
      MessageList: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps", nextProps);
    if (nextProps) {
      return {
        CurrentUser: nextProps.CurrentUser
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  componentDidMount() {
    // this.MessageField.focus();
    this.addListeners();
  }

  addListeners = () => {
    let loadedMessages = [];
    this.state.MessagesRef.child("personel").on("child_added", snap => {
      loadedMessages.push(snap.val());
      console.log("messages...", loadedMessages);
      this.setState(
        {
          MessageList: loadedMessages
        },
        console.log("MessageList...", this.state.MessageList)
      );
    });
  };

  createMessage = () => {
    console.log("Current User...", this.state.CurrentUser);
    const message = {
      timestamp: firebaseDb.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.CurrentUser.uid,
        name: this.state.CurrentUser.displayName,
        avatar: this.state.CurrentUser.photoURL
      },
      senderId: this.state.CurrentUser.uid,
      senderName: this.state.CurrentUser.displayName,
      senderAvatar: this.state.CurrentUser.photoURL,
      content: this.state.MessageContent
    };
    return message;
  };

  handleSendMessage = () => {
    console.log("Uid..", this.state.CurrentUser);
    // let message = [];
    // message = this.state.MessageList;
    // message.push({ text: this.state.MessageContent });
    // this.setState({
    //   MessageList: message,
    //   MessageContent: ""
    // });

    const { MessagesRef, MessageContent, CurrentUser } = this.state;
    if (MessageContent) {
      MessagesRef.child("personel")
        .push()
        .set(this.createMessage())
        .then(() => {
          console.log("Message Sent...");
          this.setState({
            MessageContent: ""
          });
        })
        .catch(err => {
          console.log("Sending Messaging.. err", err);
        });
    }
  };

  signOut = () => {
    firebase.auth().signOut();
    try {
      // await GoogleSignin.revokeAccess();
      GoogleSignin.signOut()
        .then(() =>
          // this.setState(
          //   {
          //     user: null
          //   },
          //   () => console.log("user signed out. do your job!")
          // )
          console.log("user signed out. do your job!")
        )
        // .catch(err => console.error("something went wrong", err));
      // this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { MessageContent, MessageList, CurrentUser } = this.state;
    console.log("render...", MessageList);
    return (
      <View style={styles.messageContainer}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.COLOR_PRIMARY_DARK}
        />
        <View style={styles.headerStyle}>
          <FontAwesome
            style={[{ color: Colors.WHITE_COLOR }, CustomStyles.medium]}
            name="bars"
          />
          <Text style={[{ color: Colors.WHITE_COLOR }, CustomStyles.medium]}>
            My Chat
          </Text>
          <FontAwesome
            onPress={this.signOut}
            style={[{ color: Colors.WHITE_COLOR }, CustomStyles.medium]}
            name="sign-out"
          />
        </View>
        <View style={styles.messageListContainer}>
          <MessageArea MessageList={MessageList} CurrentUser={CurrentUser} />
        </View>
        <View style={styles.messageButton}>
          <Emoji name="coffee" style={{ fontSize: 40 }} />
          <TextInput
            ref={input => {
              this.MessageField = input;
            }}
            value={MessageContent}
            returnKeyType="done"
            onChangeText={MessageContent => this.setState({ MessageContent })}
            style={{
              // width: "80%"
              flex: 1
              //   maxWidth:"80%"
            }}
            placeholder="enter message"
          />
          {/* {Message.length > 0 && (

          )} */}
          <TouchableOpacity
            style={styles.sendButton}
            onPress={this.handleSendMessage}
          >
            <FontAwesome
              style={{
                fontSize: 28,
                color: "white"
              }}
              name="angle-right"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1
  },
  messageListContainer: {
    height: height - height / 5
  },
  messageButton: {
    elevation: 10,
    width: "100%",
    backgroundColor: Colors.WHITE_COLOR,
    position: "absolute",
    bottom: 0,
    height: height / 12,
    borderTopWidth: 1,
    borderTopColor: Colors.COLOR_PRIMARY,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
    // justifyContent: 'space-around',
  },
  sendButton: {
    backgroundColor: Colors.COLOR_PRIMARY,
    height: height / 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: width / 6
  },
  headerStyle: {
    width: width,
    height: height / 12,
    backgroundColor: Colors.COLOR_PRIMARY,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10
  }
});
