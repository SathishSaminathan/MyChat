import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Colors from "../../assets/styles/colors";
import CustomStyles from "../../assets/styles/styles";

const { width, height } = Dimensions.get("window");

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true }, () => console.log(this.state.loading));
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  renderFooter = () => {
    if (!this.state.loading) {
      return null;
    } else {
      return (
        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: Colors.COLOR_PRIMARY
          }}
        >
          <ActivityIndicator style={{ color:Colors.COLOR_PRIMARY}} animating size="large" />
        </View>
      );
    }
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: width,
          backgroundColor: Colors.COLOR_PRIMARY_LIGHT,
        //   marginLeft: "14%"
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
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
            style={[{ color: Colors.WHITE_COLOR }, CustomStyles.medium]}
            name="bell"
          />
        </View>

        <FlatList
          data={this.state.data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.flatview}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25
                }}
                source={{ uri: item.picture.thumbnail }}
              />
              <View style={styles.nameEmailArea}>
                <Text style={styles.name}>{item.name.first}</Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerStyle: {
    width: width,
    height: height / 12,
    backgroundColor: Colors.COLOR_PRIMARY,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  flatview: {
    // paddingTop: 30,
    borderRadius: 2,
    flexDirection:"row",
    margin:10
  },
  nameEmailArea:{
    marginLeft:5
  },
  name: {
    fontFamily: "Roboto",
    fontSize: 18
  },
  email: {
    color:Colors.COLOR_PRIMARY_DARK
  }
});
