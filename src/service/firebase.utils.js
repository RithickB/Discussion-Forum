import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCVEi2PcdXWGKdlTUk7e5itaZ8a777gIpI",
  authDomain: "discussion-forum-61117.firebaseapp.com",
  projectId: "discussion-forum-61117",
  storageBucket: "discussion-forum-61117.appspot.com",
  messagingSenderId: "648929175258",
  appId: "1:648929175258:web:1a8353920f842f6b4967e3",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;