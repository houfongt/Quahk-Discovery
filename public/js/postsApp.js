document.addEventListener('DOMContentLoaded', function () {
  var elems = document.getElementById('notFoundModal');
  var instances = M.Modal.init(elems, { dismissible: false });
});

function checkExists() {
  let docId = window.location.search.split('?')[1];
  if (window.location.search.split('?')[1] == undefined) {
    $('#notFoundModal').modal('open');
    return;
  } else {

  }
  let merchantRef = firebase.firestore().collection('merchants').doc(docId);
  merchantRef.onSnapshot(
    (docRef) => {
      if (docRef.exists) {
      } else {
        $('#notFoundModal').modal('open');
      }
    });
}

var postsApp = new Vue({
  el: '#postHtml',
  data: {
    merchantId: window.location.search.split('?')[1],
    merchantData: [],
    merchantImages: [],
    message: 'hello world!',
  },
  mounted() {
    let docId = window.location.search.split('?')[1];
    const merchantRef = firebase.firestore().collection('merchants').doc(docId);

    merchantRef.onSnapshot((doc) => {
      let merchantData = [];

      merchantData.push({ ...doc.data(), id: doc.id });

      document.title = merchantData[0].name + ' - Quahk 發現中小企';

      let totalImage = Object.keys(merchantData[0]).filter((v) => v.startsWith('imageSrc'));

      let imagesLinkAfter0 = [];

      for (let i = 0; i < totalImage.length - 1; i++) {
        let imageLinkName = 'imageSrc' + (i + 1);

        imagesLinkAfter0[i] = merchantData[0][imageLinkName];

        this.merchantImages = imagesLinkAfter0;
      }

      this.merchantData = merchantData;
    });
  },
});

function backToIndex() {
  location.replace('index.html');
}
