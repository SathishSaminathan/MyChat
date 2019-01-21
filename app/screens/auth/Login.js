import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton
} from "react-native-google-signin";
import firebase from "react-native-firebase";

import firebaseDb from "../../../firebase";
import images from "../../assets/img/image";
import Colors from "../../assets/styles/colors";
import Loader from "../../components/Loader";

const { width, height } = Dimensions.get("window");

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRef: firebaseDb.database().ref("users"),
      currentUser: null,
      Loader:false
    };
  }

  componentWillMount() {
    GoogleSignin.configure({
      forceConsentPrompt: true,
      webClientId:
        "136892080908-avo2mk2m7rbl1d1pegmoboifl6jlfa2i.apps.googleusercontent.com"
    });
  }

  componentDidMount() {
    GoogleSignin.hasPlayServices({
      autoResolve: true,
      showPlayServicesUpdateDialog: true
    })
      .then(() => {
        // play services are available. can now configure library
        console.log("Play service availble");
      })
      .catch(err => {
        console.log("Play services error", err.code, err.message);
      });
  }

  handleLogin = () => {
    GoogleSignin.signIn()
      .then(data => {
        console.log("singIn invoked...");
        // Create a new Firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(
          data.idToken,
          data.accessToken
        );
        this.setState({
          Loader:true
        })
        // Login with the credential
        return firebase.auth().signInWithCredential(credential);
      })
      .then(currentUser => {
        this.setState({
          Loader:false
        })
        this.props.currentUser(currentUser);
        console.log(`Google login with user : ${JSON.stringify(currentUser)}`);
        this.saveUser(currentUser).then(() => {
          console.log("User Saved");
        });
      })
      .catch(err => {
        console.log("Login failed with error..", err);
      });
  };

  saveUser = createdUser => {
    return this.state.userRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
      email: createdUser.user.email
    });
  };

  render() {
    return (
      this.state.Loader?<Loader/>:<ImageBackground
        style={[styles.container,{resizeMode:"contain"}]}
        source={images.backgroundImage}
        blurRadius={3}
      >
        <StatusBar
          backgroundColor={Colors.COLOR_PRIMARY}
          barStyle="light-content"
          // translucent
        />
        <View style={styles.logoArea}>
          <Image style={[styles.logoImage]} source={images.logoImg} />
          <Text style={styles.logoText}>WELCOME TO MY APP</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.handleLogin}
        >
          <View style={styles.buttonTextArea}>
            <FontAwesome style={styles.buttonText} name="google-plus" />
            <Text style={[styles.buttonText, { fontSize: 18 }]}>
              Login with Gmail
            </Text>
          </View>
        </TouchableOpacity>
        {/* <GoogleSigninButton
          style={{ width: 48, height: 48 }}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signIn}
          disabled={this.state.isSigninInProgress}
        /> */}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logoArea: {
    width: "100%",
    height: 400,
    alignItems: "center",
  },
  logoImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.COLOR_PRIMARY,
    resizeMode:"cover"
  },
  logoText: {
    color: "white",
    marginVertical: 10,
    fontSize: 45,
    fontFamily: "vincHand"
  },
  buttonContainer: {
    width: "90%",
    backgroundColor: Colors.COLOR_PRIMARY,
    height: height / 12,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  buttonTextArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
    paddingHorizontal: 30
  },
  buttonText: { color: "white", fontSize: 24, fontFamily: "Roboto" }
});
