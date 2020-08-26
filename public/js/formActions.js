let star1 = $('#star1'),
  star2 = $('#star2'),
  star3 = $('#star3'),
  star4 = $('#star4'),
  star5 = $('#star5'),
  finalSubmit = $('#finalSubmit'),
  rating = 0;

star1.on('click', function (e) {
  e.preventDefault();
  star1.html('<i class="material-icons">star</i>');
  star2.html('<i class="material-icons">star_border</i>');
  star3.html('<i class="material-icons">star_border</i>');
  star4.html('<i class="material-icons">star_border</i>');
  star5.html('<i class="material-icons">star_border</i>');
  rating = 1;
});

star2.on('click', function (e) {
  e.preventDefault();
  star1.html('<i class="material-icons">star</i>');
  star2.html('<i class="material-icons">star</i>');
  star3.html('<i class="material-icons">star_border</i>');
  star4.html('<i class="material-icons">star_border</i>');
  star5.html('<i class="material-icons">star_border</i>');
  rating = 2;
});

star3.on('click', function (e) {
  e.preventDefault();
  star1.html('<i class="material-icons">star</i>');
  star2.html('<i class="material-icons">star</i>');
  star3.html('<i class="material-icons">star</i>');
  star4.html('<i class="material-icons">star_border</i>');
  star5.html('<i class="material-icons">star_border</i>');
  rating = 3;
});

star4.on('click', function (e) {
  e.preventDefault();
  star1.html('<i class="material-icons">star</i>');
  star2.html('<i class="material-icons">star</i>');
  star3.html('<i class="material-icons">star</i>');
  star4.html('<i class="material-icons">star</i>');
  star5.html('<i class="material-icons">star_border</i>');
  rating = 4;
});

star5.on('click', function (e) {
  e.preventDefault();
  star1.html('<i class="material-icons">star</i>');
  star2.html('<i class="material-icons">star</i>');
  star3.html('<i class="material-icons">star</i>');
  star4.html('<i class="material-icons">star</i>');
  star5.html('<i class="material-icons">star</i>');
  rating = 5;
});

finalSubmit.on('click', function (e) {
  e.preventDefault();
  $('#finalSubmit').css('display', 'none');
  $('#form3OptionsId').css('display', 'none');
  $('.loader-wrapper').fadeIn('fast');
  let merchantName = document.getElementById('storeName').value;
  let geopoint = document.getElementById('input_location').value.split(',', 2);
  let lat = parseFloat(geopoint[0]);
  let lng = parseFloat(geopoint[1]);
  let decodedLocation = document.getElementById('decoded_location').value;
  if(document.getElementById('textarea1').value !== '') {
    window.merchantComments = document.getElementById('textarea1').value;
  } else {
    window.merchantComments = '該用戶沒有評論';
  }
  let firestore = firebase.firestore();

  firestore
    .collection('merchants')
    .add({
      name: merchantName,
      geopoint: new firebase.firestore.GeoPoint(lat, lng),
      streetName: decodedLocation,
      comments: merchantComments,
      rating: rating,
      editAble: false,
    })
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id);
      let docId = docRef.id;
      console.log(document.getElementById('photosUpload').files.length);
      if (document.getElementById('photosUpload').files.length > 0) {
        for (let i = 0; i < document.getElementById('photosUpload').files.length; i++) {
          let imageRefName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          let imageFile = document.getElementById('photosUpload').files[i];
          let imageName = 'imageSrc' + i;
          var storage = firebase.storage();
          var imagesRef = storage.ref('images/' + imageRefName);

          var file = imagesRef.put(imageFile);

          console.log(docId);

          file.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            function (snapshot) {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;
              }
            },
            function (error) {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;

                case 'storage/canceled':
                  // User canceled the upload
                  break;

                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  break;
              }
            },
            function () {
              file.snapshot.ref.getDownloadURL().then(function (url) {
                //console.log(downloadURL);
                firestore
                  .collection('merchants')
                  .doc(docId)
                  .update({
                    [imageName]: url,
                  })
                  .then(function () {
                    console.log('Document written with ID: ');
                    if (i = document.getElementById('photosUpload').files.length) {
                      
                        $.ajax({
                           url: "https://formsubmit.co/ajax/14fb7776c3a6d1713b8ef36abe0a903e",
                           method: "POST",
                           data: {
                            email:"edwardswalker@icloud.com",
                            _subject: "New submission!",
                            _template: "box",
                            _autoresponse: "Thanks",
                            name: "Quahk Discovery",
                            message: "I'm from Devro LABS"
                           },
                           dataType: "json"
                          });
                      
                      $('.closeBtn_Actions').trigger('click');
                      M.toast({ html: '成功加入記錄' });
                    }
                  })
                  .catch(function (error) {
                    console.error('Error adding document: ', error);
                  });
              });
            }
          );
        }
      } else {
        $('.closeBtn_Actions').trigger('click');
        M.toast({ html: '成功加入記錄' });
      }
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
});
