document.addEventListener('DOMContentLoaded', function () {
  var elems = document.getElementById('notFoundModal');
  var instances = M.Modal.init(elems, { dismissible: false });
});

// prevent user from enter a not existent post with just a blank page
function checkExists() {
  let docId = window.location.search.split('?')[1];
  if (window.location.search.split('?')[1] == undefined) {
    $('#notFoundModal').modal('open');
    return;
  } else {
  }
  let merchantRef = firebase.firestore().collection('merchants').doc(docId);
  merchantRef.onSnapshot((docRef) => {
    if (docRef.exists) {
    } else {
      $('#notFoundModal').modal('open');
    }
  });
}

// get data and display post
var postsApp = new Vue({
  el: '#postHtml',
  data: {
    merchantId: window.location.search.split('?')[1],
    merchantData: [],
    merchantImages: [],
    posterUid: '',
    posterName: '',
  },
  mounted() {
    // get docId from url and load firestore data.
    let docId = window.location.search.split('?')[1];
    const merchantRef = firebase.firestore().collection('merchants').doc(docId);

    merchantRef.onSnapshot((doc) => {
      let merchantData = [];

      merchantData.push({ ...doc.data(), id: doc.id });

      document.title = merchantData[0].name + ' - Quahk 發現中小企';

      // get all images links
      let totalImage = Object.keys(merchantData[0]).filter((v) => v.startsWith('imageSrc'));

      let imagesLinkAfter0 = [];

      for (let i = 0; i < totalImage.length - 1; i++) {
        /* because we already displayed image0 as cover photo,
           we only need the photos afterwards.
           eg. image1, image2, image3, etc... */
        let imageLinkName = 'imageSrc' + (i + 1);

        imagesLinkAfter0[i] = merchantData[0][imageLinkName];

        this.merchantImages = imagesLinkAfter0;
      }

      let posterUid = merchantData[0].posterUid;

      this.posterUid = posterUid;

      this.merchantData = merchantData;

      let user = firebase.auth().currentUser;

      const posterRef = firebase.firestore().collection('users').doc(posterUid);

      posterRef.onSnapshot((doc) => {
        let posterName = doc.data().nickname;

        this.posterName = posterName;
      });

      if (user) {
        if (this.posterUid == user.email) {
          $('#deleteBtn').show();
          $('#editBtn').show();
          $('#accountBtn').hide();
        } else {
          $('#deleteBtn').hide();
          $('#editBtn').hide();
          $('#accountBtn').show();
        }
      } else {
        $('#deleteBtn').hide();
        $('#editBtn').hide();
        $('#accountBtn').show();
      }
    });
  },
  methods: {
    deletePopUp: function () {
      let user = firebase.auth().currentUser;

      if (user) {
        if (this.posterUid == user.email) {
          $('#deletePrompt').modal('open');
        } else {
          $('#permissionError').modal('open');
        }
      } else {
        $('#permissionError').modal('open');
      }
    },
    deletePost: function () {
      let user = firebase.auth().currentUser;

      if (user) {
        if (this.posterUid == user.email) {
          let docId = window.location.search.split('?')[1];

          firebase
            .firestore()
            .collection('merchants')
            .doc(docId)
            .delete()
            .then(() => {
              backToIndex('deleted');
            })
            .catch((error) => {
              console.error('Error removing document: ', error);
            });
        } else {
          $('#permissionError').modal('open');
        }
      } else {
        $('#permissionError').modal('open');
      }
    },
    toForm2: function () {
      if (document.getElementById('storeName').value == '' || document.getElementById('input_location').value == '') {
        $('#missingInfoModel').modal('open');
      } else {
        document.getElementById('formCancelBtn').style.display = 'none';
        document.getElementById('form1Next').style.display = 'none';
        $('.loaderWrapper').fadeIn('fast');
        document.getElementsByClassName('.form1')[0].style.display = 'none';
        form2.style.display = 'inline-block';
        form2Options.style.display = 'inline';
        toform3Btn.style.display = 'inline';
        loaderWrapper.fadeOut('slow');
      }
    },
  },
});

$('#deleteBtn').on('click', () => {
  postsApp.deletePopUp();
});

$('#editBtn').on('click', () => {
  let docId = window.location.search.split('?')[1];
  location.replace('editPost.html' + "?" + docId);
});

function deleteNext() {
  $('#finalDeletePrompt').modal('open');
}

$('#finalDeleteBtn').on('click', () => {
  postsApp.deletePost();
});

// send user back to main page
function backToIndex(message) {
  location.replace('index.html' + '?' + message);
}

// user can share this post via url
$('#shareBtn').on('click', () => {
  // get url and title
  let thisURL = location.href;
  let thisTitle = document.title;

  if (navigator.share) {
    navigator.share({
      title: thisTitle,
      text: thisTitle,
      url: thisURL,
    });
  } else {
    // web share api is not accept on client
    $('#noWebShareModal').modal('open');
  }
});

// if web share api is not accept on client, I will provide a url copy button.
function copyURL() {
  let currentURL = location.href;
  currentURL.select();
  document.execCommand('copy');
}
