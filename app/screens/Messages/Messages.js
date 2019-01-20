import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Emoji from "react-native-emoji";
import firebase from "react-native-firebase";

import Colors from "../../assets/styles/colors";
import CustomStyles from "../../assets/styles/styles";
import MessageArea from "./MessageArea";

const { width, height } = Dimensions.get("window");

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MessageContent: "",
      MessageList: [
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        },
        {
          text: "hai"
        }
      ]
    };
  }

  componentDidMount() {
    // this.MessageField.focus();
  }

  handleSendMessage = () => {
    let message = [];
    message = this.state.MessageList;
    message.push({ text: this.state.MessageContent });
    this.setState({
      MessageList: message,
      MessageContent: ""
    });
  };

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
    const { MessageContent, MessageList } = this.state;
    return (
      <View style={styles.messageContainer}>
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
          <MessageArea MessageList={MessageList} />
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
              width: "80%"
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
    height: height - height / 9
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
    flex: 1,
    height: height / 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
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
