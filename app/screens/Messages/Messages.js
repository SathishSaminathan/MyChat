import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  StatusBar,
  ImageBackground
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Emoji from "react-native-emoji";
import firebase from "react-native-firebase";
import { GoogleSignin } from "react-native-google-signin";
import Icon from "react-native-vector-icons/MaterialIcons";
import Voice from "react-native-voice";
import * as Animatable from "react-native-animatable";

import firebaseDb from "../../../firebase";
import Colors from "../../assets/styles/colors";
import CustomStyles from "../../assets/styles/styles";
import MessageArea from "./MessageArea";
import CustomLoader from "../../components/CustomLoader";
import Images from "../../assets/img/image";

const { width, height } = Dimensions.get("window");

const HeaderHeight = height / 13;
const MessageButtonHeight = HeaderHeight;
const MessageListAreaHeight = height - 2 * HeaderHeight - 24;

export default class Messages extends Component {
  constructor(props) {
    console.log("constructor check", props.CurrentUser);
    super(props);
    this.state = {
      MessagesRef: firebaseDb.database().ref("messages"),
      CurrentUser: props.CurrentUser,
      Messages: [],
      MessageContent: "",
      MessageList: [],
      IsRecording: false,
      results: []
    };
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }

  toggleSpeech = () => {
    let p = new Promise(resolve => {
      this.setState(
        {
          IsRecording: !this.state.IsRecording
        },
        () => {
          console.log(this.state.IsRecording);
        }
      );
      resolve();
    });
    p.then(() => {
      if (this.state.IsRecording) {
        Voice.start("ta-IN");
      } else {
        Voice.stop();
      }
    });
  };

  onSpeechStart = () => {
    Voice.start("ta-IN");
  };

  onSpeechEnd = () => {
    Voice.stop();
  };

  onSpeechResults(e) {
    this.setState(
      {
        results: e.value,
        MessageContent: e.value[0],
        IsRecording: false
      },
      () => console.log("results...", this.state.results[0])
    );
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
      GoogleSignin.signOut().then(() =>
        // this.setState(
        //   {
        //     user: null
        //   },
        //   () => console.log("user signed out. do your job!")
        // )
        console.log("user signed out. do your job!")
      );
      // .catch(err => console.error("something went wrong", err));
      // this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      MessageContent,
      MessageList,
      CurrentUser,
      IsRecording
    } = this.state;
    console.log("render...", MessageList);
    return (
      <View style={styles.messageContainer}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.COLOR_PRIMARY}
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
        <ImageBackground
          style={styles.messageListContainer}
          source={Images.chatBackGround5}
        >
          {MessageList.length == 0 ? (
            <CustomLoader />
          ) : (
            <MessageArea MessageList={MessageList} CurrentUser={CurrentUser} />
          )}
        </ImageBackground>
        <View style={styles.messageButton}>
          {/* <Emoji name="coffee" style={{ fontSize: 40 }} /> */}
          <TouchableOpacity onPress={() => this.toggleSpeech()}>
            {IsRecording ? (
              <Animatable.Text animation="rotate" iterationCount="infinite">
                <Icon
                  style={[
                    styles.mikeStyle,
                    {
                      borderWidth: 1,
                      borderRadius: 16,
                      paddingLeft: 1,
                      fontSize: 25
                    }
                  ]}
                  name="stop"
                />
              </Animatable.Text>
            ) : (
              <Text>
                <Icon
                  style={[
                    styles.mikeStyle,
                  ]}
                  name="settings-voice"
                />
              </Text>
            )}
          </TouchableOpacity>
          <TextInput
            ref={input => {
              this.MessageField = input;
            }}
            value={MessageContent}
            returnKeyType="done"
            onChangeText={MessageContent => this.setState({ MessageContent })}
            selectionColor={Colors.COLOR_PRIMARY}
            style={{
              flex: 1
            }}
            placeholder="enter message"
          />
          {/* {Message.length > 0 && (

          )} */}
          <TouchableOpacity
            style={styles.sendButton}
            onPress={this.handleSendMessage}
          >
            <FontAwesome style={styles.sendIcon} name="telegram" />
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
    // height: height - height / 5
    height: MessageListAreaHeight,
    width: width,
    backgroundColor: "black"
  },
  messageButton: {
    elevation: 10,
    width: "100%",
    backgroundColor: Colors.WHITE_COLOR,
    position: "absolute",
    bottom: 0,
    height: MessageButtonHeight,
    // height: height / 12,
    borderTopWidth: 1,
    borderTopColor: Colors.COLOR_PRIMARY,
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5
    // justifyContent: 'space-around',
  },
  sendButton: {
    // backgroundColor: Colors.COLOR_PRIMARY,
    height: height / 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: width / 6
  },
  sendIcon: {
    fontSize: 35,
    color: Colors.COLOR_PRIMARY
  },
  headerStyle: {
    width: width,
    height: HeaderHeight,
    backgroundColor: Colors.COLOR_PRIMARY,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  mikeStyle: {
    fontSize: 30,
    color: Colors.COLOR_PRIMARY
    // borderWidth: 1,
  }
});
