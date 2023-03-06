if (localStorage.getItem("email ") === null || localStorage.getItem("password ") === null) {
  
}
else{
  location.href = "main.html";
}  

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ6-gQPaPSz80ZGneKrEe2Fd380ERlz74",
  authDomain: "quran-help.firebaseapp.com",
  databaseURL: "https://quran-help-default-rtdb.firebaseio.com",
  projectId: "quran-help",
  storageBucket: "quran-help.appspot.com",
  messagingSenderId: "1077555981459",
  appId: "1:1077555981459:web:a215c1a21a41905783b166",
  measurementId: "G-3FKY23Z156"
};


function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth();
  const database = firebase.database();
  
  // Set up our register function
  function register () {
    // Get all our input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const full_name = document.getElementById('full_name').value;
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is invalid');
      return;
      // Don't continue running the code
    }

   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser;

      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  
      // Add this user to Firebase Database
      var database_ref = database.ref();
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        last_login : date +" / "+time
        
      };
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data);
      console.log(user_data)
  
      // DOne
      sleep(5000);
      
      
      localStorage.setItem("email ", email);
      localStorage.setItem("password ", password);

      sleep(1000);

      console.log("redirecting...")
      location.href = "main.html"

    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;
  
      alert(error_message);
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is invalid');
      return;
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser;
  
      // Add this user to Firebase Database
      var database_ref = database.ref();
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      };
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data);


      sleep(5000);
  
      // DOne

      localStorage.setItem("email ", email);
      localStorage.setItem("password ", password);

      sleep(1000);

      console.log("redirecting...")
      location.href = "main.html"
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;
  
      alert(error_message);
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true;
    } else {
      // Email is not good
      return false;
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false;
    } else {
      return true;
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false;
    }
  
    if (field.length <= 0) {
      return false;
    } else {
      return true;
    }
  }
