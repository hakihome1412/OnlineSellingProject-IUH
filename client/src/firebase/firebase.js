import firebase from 'firebase/app'
import 'firebase/storage';
import 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyDsMqWB7nE5x6GIooM4qVxoe78csX-X3-A",
    authDomain: "onlineselling2-9e8dd.firebaseapp.com",
    databaseURL: "https://onlineselling2-9e8dd.firebaseio.com",
    projectId: "onlineselling2-9e8dd",
    storageBucket: "onlineselling2-9e8dd.appspot.com",
    messagingSenderId: "1045878817709",
    appId: "1:1045878817709:web:f4a58fc9ae79fbb2505724",
    measurementId: "G-K4X8PWK1H4"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//analytics is optional for this tutoral 
firebase.analytics();

const storage = firebase.storage()

export  {
    storage, firebase as default
  }
 