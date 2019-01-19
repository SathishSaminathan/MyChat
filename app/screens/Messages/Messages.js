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

import Colors from "../../assets/styles/colors";
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
      MessageContent:''
    });
  };

  render() {
    const { MessageContent, MessageList } = this.state;
    return (
      <View style={styles.messageContainer}>
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
          <TouchableOpacity style={styles.sendButton} onPress={this.handleSendMessage}>
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
  }
});
