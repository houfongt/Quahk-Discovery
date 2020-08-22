var firebaseConfig = {
    apiKey: "AIzaSyAG7-yLEWcsPtEgY18yY4v4yGaUui15lvk",
    authDomain: "quahk-competition-3rdmwdsc.firebaseapp.com",
    databaseURL: "https://quahk-competition-3rdmwdsc.firebaseio.com",
    projectId: "quahk-competition-3rdmwdsc",
    storageBucket: "quahk-competition-3rdmwdsc.appspot.com",
    messagingSenderId: "768144406056",
    appId: "1:768144406056:web:40c269b46cd21b67e6e71d",
    measurementId: "G-6YHSEGHMJV",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var perf = firebase.performance();