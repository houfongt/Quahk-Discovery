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
    message: 'hello world!',
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

      this.merchantData = merchantData;
    });
  },
});

// send user back to main page
function backToIndex() {
  location.replace('index.html');
}

// user can share this post via url
$('#shareBtn').on('click', () => {
  // get url and title
  let thisURL = location.href;
  let thisTitle = document.title;
  
  if (navigator.share) {
    navigator
      .share({
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
  document.execCommand("copy");
}