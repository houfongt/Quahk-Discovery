const { firebaseConfig } = require("firebase-functions");

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

$('#loginBtn').on('click', () => {
    let emailField = $('#email').val();
    if (emailIsValid(emailField)) {
        
    } else {
        $("#emailFormatErrorModal").modal("open");
        return;
    }

    
});