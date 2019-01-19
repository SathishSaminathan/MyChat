import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import Message from "./Message";

const { width, height } = Dimensions.get("window");

export default class MessageArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MessageList: this.props.MessageList
    };
  }

  renderMessage = () =>
    this.state.MessageList.map((message, i) => <Message MessageContent={message} key={i} />);

  render() {
    return (
      <ScrollView
        ref={ref => (this.scrollView = ref)}
        onContentSizeChange={(contentWidth, contentHeight) => {
          this.scrollView.scrollToEnd({ animated: true });
        }}
      >
        {this.renderMessage()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
 
});
