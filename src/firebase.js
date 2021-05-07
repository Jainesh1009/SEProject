import firebase from "firebase";
require('firebase/auth')
var firebaseConfig = {
    apiKey: "AIzaSyDhTEClUv6NN5HXa5Q0wiFCJVExYtaedE8",
    authDomain: "warehouse-9094b.firebaseapp.com",
    projectId: "warehouse-9094b",
    storageBucket: "warehouse-9094b.appspot.com",
    messagingSenderId: "516598560640",
    appId: "1:516598560640:web:5f6adc5afbbba831487365",
    measurementId: "G-S0H0CW67D5"
  };

const db = firebase.initializeApp(firebaseConfig);
export default db;
