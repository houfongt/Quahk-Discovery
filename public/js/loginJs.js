document.addEventListener('DOMContentLoaded', function () {
  var elems = document.getElementById('loggedInModal');
  var instances = M.Modal.init(elems, { dismissible: false });
});

// const { firebaseConfig } = require("firebase-functions");

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    let userRef = firebase.firestore().collection('users').doc(user.email);

    userRef.onSnapshot((doc) => {
      document.getElementById('welcomeUser').innerText = doc.data().nickname + '，歡迎回來！';
    });

    $('#loggedInModal').modal('open');
  } else {
    // No user is signed in.
  }
});

$("#loginBtn").on("click", () => {
  let emailField = $("#email").val();
  let password = $('#password').val();
  if (emailIsValid(emailField)) {
  } else {
    $("#emailFormatErrorModal").modal("open");
    return;
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(emailField, password).then(() => {
      location.replace('index.html?loginSuccess');
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
});

function backToIndex() {
  location.replace('index.html');
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      location.replace('index.html?signOut')
    })
    .catch(function (error) {
      // An error happened.
    });
}
