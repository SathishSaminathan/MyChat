import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions,ImageBackground } from "react-native";

import Images from "../../assets/img/image";
import Message from "./Message";

const { width, height } = Dimensions.get("window");

export default class MessageArea extends Component {
  constructor(props) {
    console.log("constructor MessageArea", props.CurrentUser);
    super(props);
    this.state = {
      MessageList: this.props.MessageList,
      CurrentUser:this.props.CurrentUser
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps MessageArea");
    if(nextProps){
      return{
        MessageList:nextProps.MessageList 
      }
    }
  }

  renderMessage = () =>
    this.state.MessageList.map((message, i) => (
      <Message CurrentUser={this.props.CurrentUser} MessageContent={message} key={i} />
    ));

  render() {
    return (
      <ScrollView
        ref={ref => (this.scrollView = ref)}
        onContentSizeChange={(contentWidth, contentHeight) => {
          this.scrollView.scrollToEnd({ animated: true });
        }}
      >
        {/* <ImageBackground  style={{width:width, height: '100%'}}  src={Images.chatBackGround}> */}
        {this.renderMessage()}
        {/* </ImageBackground> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
