//document.getElementById('title').innerHTML = window.location.search.split('?')[1];

var postsApp = new Vue({
  el: '#postHtml',
  data: {
    merchantId: window.location.search.split('?')[1],
    merchantData: [],
    message: 'hello world!',
  },
  mounted() {
    let docId = window.location.search.split('?')[1];
    const merchantRef = firebase.firestore().collection('merchants').doc(docId);

    merchantRef.onSnapshot((doc) => {
      let merchantData = [];

      merchantData.push({ ...doc.data(), id: doc.id });

      document.title = merchantData[0].name + ' - Quahk 發現中小企';

      this.merchantData = merchantData;
    });
  },
});
