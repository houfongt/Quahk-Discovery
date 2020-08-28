console.log(location.search);
let query = location.search;
let queryfinal = query.split('?');
console.log(queryfinal[1]);

document.getElementById('title').innerHTML = window.location.search.split('?')[1];

var postsApp = new Vue({
  el: '#postHtml',
  data: {
    merchantId: window.location.search.split('?')[1],
    merchantData: [],
    message: "hello world!"
  },
  mounted() {
    let docId = window.location.search.split('?')[1];
    const merchantRef = firebase.firestore().collection('merchants').doc(docId);
    console.log(merchantRef);
    merchantRef.onSnapshot((doc) => {
      let merchantData = [];

      merchantData.push({ ...doc.data(), id: doc.id });

      this.merchantData = merchantData;
    });

    
  },
});
