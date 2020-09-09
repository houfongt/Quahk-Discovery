let star1 = $('#star1'),
  star2 = $('#star2'),
  star3 = $('#star3'),
  star4 = $('#star4'),
  star5 = $('#star5'),
  emailField = $('#email'),
  emailBox = $('#emailBox'),
  sendCopyBox = $('#sendCopyBox'),
  finalSubmit = $('#finalSubmit'),
  emailRating = $('#emailRating'),
  uploadStatus = false,
  rating = '該用戶沒有評';

star1.on('click', (e) => {
  e.preventDefault();
  star1.html('<i class="material-icons">star</i>');
  star2.html('<i class="material-icons">star_border</i>');
  star3.html('<i class="material-icons">star_border</i>');
  star4.html('<i class="material-icons">star_border</i>');
  star5.html('<i class="material-icons">star_border</i>');
  rating = 1;
  emailRating.val('1分');
});

star2.on('click', (e) => {
  e.preventDefault();
  star1.html('<i class="material-icons">star</i>');
  star2.html('<i class="material-icons">star</i>');
  star3.html('<i class="material-icons">star_border</i>');
  star4.html('<i class="material-icons">star_border</i>');
  star5.html('<i class="material-icons">star_border</i>');
  rating = 2;
  emailRating.val('2分');
});

star3.on('click', (e) => {
  e.preventDefault();
  star1.html('<i class="material-icons">star</i>');
  star2.html('<i class="material-icons">star</i>');
  star3.html('<i class="material-icons">star</i>');
  star4.html('<i class="material-icons">star_border</i>');
  star5.html('<i class="material-icons">star_border</i>');
  rating = 3;
  emailRating.val('3分');
});

star4.on('click', (e) => {
  e.preventDefault();
  star1.html('<i class="material-icons">star</i>');
  star2.html('<i class="material-icons">star</i>');
  star3.html('<i class="material-icons">star</i>');
  star4.html('<i class="material-icons">star</i>');
  star5.html('<i class="material-icons">star_border</i>');
  rating = 4;
  emailRating.val('4分');
});

star5.on('click', (e) => {
  e.preventDefault();
  star1.html('<i class="material-icons">star</i>');
  star2.html('<i class="material-icons">star</i>');
  star3.html('<i class="material-icons">star</i>');
  star4.html('<i class="material-icons">star</i>');
  star5.html('<i class="material-icons">star</i>');
  rating = 5;
  emailRating.val('5分');
});


sendCopyBox.on('click', () => {
  if (document.getElementById('sendCopyBox').checked) {
    //console.log(document.getElementById('sendCopyBox').checked);
    emailBox.show();
  } else {
    //console.log(document.getElementById('sendCopyBox').checked);
    emailBox.hide();
  }
});

$('#laterEdit').on('click', () => {
  if (document.getElementById('laterEdit').checked) {
    $('#editAlert').show();
    $('#createAccountAlert').hide();
    document.getElementById('sendCopyBox').removeAttribute('disabled');
  } else {
    $('#editAlert').hide();
    $('#createAccountAlert').show();
    document.getElementById('sendCopyBox').disabled = 'true';
    document.getElementById('sendCopyBox').checked = 'true';
    emailBox.show();
  }
});

finalSubmit.on('click', async function (e) {
  e.preventDefault();
  let emailVal = emailField.val();

  if (document.getElementById('sendCopyBox').checked) {
    if (emailIsValid(emailVal)) {
    } else {
      $('#emailFormatErrorModal').modal('open');
      return;
    }
  } else {
  }

  if (document.getElementById('laterEdit').checked) {
    window.poster = 'anonymous';
  } else {
    let emailVal = emailField.val();
    let password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailVal, password)
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          if (errorCode == 'auth/email-already-in-use') {

          }
          var errorMessage = error.message;
          // ...
        });
  }

  $('#finalSubmit').hide();
  $('#form3OptionsId').hide();
  $('.loader-wrapper').fadeIn('fast');
  let merchantName = document.getElementById('storeName').value;
  let geopoint = document.getElementById('input_location').value.split(',', 2);
  let isEditAble = !document.getElementById('laterEdit').checked;
  let lat = parseFloat(geopoint[0]);
  let lng = parseFloat(geopoint[1]);
  let decodedLocation = document.getElementById('decoded_location').value;
  if (document.getElementById('textarea1').value !== '') {
    window.merchantComments = document.getElementById('textarea1').value;
  } else {
    window.merchantComments = '該用戶沒有評論';
  }

  let imageLink = [];
  let firestore = firebase.firestore();

  //console.log(docId);
  if (document.getElementById('photosUpload').files.length > 0) {
    for (let i = 0; i < document.getElementById('photosUpload').files.length; i++) {
      let imageFile = document.getElementById('photosUpload').files[i];

      await uploadImageAsPromise(imageFile).then((res) => {
        imageLink[i] = res;
      });
    }

    firestore
      .collection('merchants')
      .add({
        name: merchantName,
        geopoint: new firebase.firestore.GeoPoint(lat, lng),
        streetName: decodedLocation,
        comments: merchantComments,
        rating: rating,
        editAble: isEditAble,
        posterUid: poster,
      })
      .then((docRef) => {
        console.log('Document written successfully:' + docRef.id);
        for (let i = 0; i < imageLink.length; i++) {
          let imageName = 'imageSrc' + [i];
          firestore
            .collection('merchants')
            .doc(docRef.id)
            .update({
              [imageName]: imageLink[i],
            })
            .then(() => {
              console.log('Document update successfully, with image link.');
            })
            .catch((error) => {});
        }
      })
      .catch((error) => {
        // reject(error);
      });
    if (document.getElementById('sendCopyBox').checked) {
      console.log(document.getElementById('sendCopyBox').checked);
      document.getElementsByClassName('form-page')[0].submit();
    } else {
      $('.closeBtn_Actions').trigger('click');
      M.toast({ html: '成功加入記錄' });
    }
  } else {
    firestore
      .collection('merchants')
      .add({
        name: merchantName,
        geopoint: new firebase.firestore.GeoPoint(lat, lng),
        streetName: decodedLocation,
        comments: merchantComments,
        rating: rating,
        imageSrc0: 'assets/noPhoto.png',
        editAble: isEditAble,
        posterUid: poster,
      })
      .then(() => {
        console.log('Document written successfully.');
        if (document.getElementById('sendCopyBox').checked) {
          document.getElementsByClassName('form-page')[0].submit();
        } else {
          $('.closeBtn_Actions').trigger('click');
          M.toast({ html: '成功加入記錄' });
        }
      });
  }
});

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function uploadImageAsPromise(imageFile) {
  return new Promise(function (resolve, reject) {
    let imageRefName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var storageRef = firebase.storage().ref('images/' + imageRefName);

    //Upload file
    var task = storageRef.put(imageFile);

    //Update progress bar
    task.on(
      'state_changed',
      function progress(snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percentage);
      },
      function error(err) {
        reject(err);
      },
      function complete() {
        let downloadURL = task.snapshot.ref.getDownloadURL();

        resolve(downloadURL);
      }
    );
  });
}
