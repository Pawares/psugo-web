import * as firebase from 'firebase'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyC8vPVbHSptjITeqdM6vbVehA2u30Vu1eo",
    authDomain: "psugo-9a86c.firebaseapp.com",
    databaseURL: "https://psugo-9a86c.firebaseio.com",
    projectId: "psugo-9a86c",
    storageBucket: "psugo-9a86c.appspot.com",
    messagingSenderId: "1057998863738"
  };

firebase.initializeApp(config)

const firestore = firebase.firestore()
export { firestore }