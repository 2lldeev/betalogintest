const firebaseConfig = {
    apiKey: "AIzaSyBJ6-gQPaPSz80ZGneKrEe2Fd380ERlz74",
    authDomain: "quran-help.firebaseapp.com",
    projectId: "quran-help",
    storageBucket: "quran-help.appspot.com",
    messagingSenderId: "1077555981459",
    appId: "1:1077555981459:web:a215c1a21a41905783b166",
    measurementId: "G-3FKY23Z156"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()



if (localStorage.getItem("email ") === null || localStorage.getItem("password ") === null) {
  location.href = "register.html";
  }
else{
  location.href = "main.html";
} 