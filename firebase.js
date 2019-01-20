import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAD6GviDzjXRgfB0UuHOA3SvJP2TGPKpDU",
  authDomain: "mychat-90efa.firebaseapp.com",
  databaseURL: "https://mychat-90efa.firebaseio.com",
  projectId: "mychat-90efa",
  storageBucket: "mychat-90efa.appspot.com",
  messagingSenderId: "136892080908"
};
firebase.initializeApp(config);

export default firebase;