// const { firebaseConfig } = require("firebase-functions");

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    location.replace("index.html" + '?loginSuccess');
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
    .signInWithEmailAndPassword(emailField, password)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
});
