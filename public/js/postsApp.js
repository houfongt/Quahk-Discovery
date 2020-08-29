//document.getElementById('title').innerHTML = window.location.search.split('?')[1];

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

      let totalImage = Object.keys(merchantData[0]).filter(v => v.startsWith("imageSrc"));

      let imagesLinkAfter0 = [];

      for (let i = 0; i < (totalImage.length) - 1; i++) {

        let imageLinkName = 'imageSrc' + (i + 1);
        
        imagesLinkAfter0[i] = merchantData[0][imageLinkName];

        console.log(imageLinkName);

        this.merchantImages = imagesLinkAfter0;

      }
      
     // this.merchantImages = totalImage;

      this.merchantData = merchantData;
    });
  },
});

function checkURL() {

}
