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
  let merchantComments = document.getElementById('textarea1').value;

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
          let imageName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          let imageFile = document.getElementById('photosUpload').files[i];
          var storage = firebase.storage();
          var imagesRef = storage.ref('images/' + imageName);

          var file = imagesRef.put(imageFile);

          console.log(docId);

          file.on('state_changed', function complete() {
            file.snapshot.ref.getDownloadURL().then(function (url) {
              //console.log(downloadURL);
              firestore
                .collection('merchants')
                .doc(docId)
                .collection('images')
                .add({
                  imageSrc: url,
                })
                .then(function (docRef) {
                  console.log('Document written with ID: ', docRef.id);
                  $('.closeBtn_Actions').trigger('click');
                  M.toast({ html: '成功加入記錄' });
                })
                .catch(function (error) {
                  console.error('Error adding document: ', error);
                });
            });
          });
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
