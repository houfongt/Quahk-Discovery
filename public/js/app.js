Vue.directive("trim", {
  inserted: function(el) {
    var str = el.innerHTML;
    var resultString = str.split(' ').slice(0, 15).join(" ") + "...";
    el.innerHTML = resultString
  }
});


var app = new Vue({
  el: '#app',
  data: {
    merchants: [],
    merchantsImage: []
  },
  mounted() {
    const merchantRef = firebase.firestore().collection('merchants');
    merchantRef.onSnapshot((snapshot) => {
      let merchants = [];
      snapshot.forEach((doc) => {
        merchants.push({ ...doc.data(), id: doc.id });

        const merchantImgRef = firebase.firestore().collection('merchants').doc(doc.id).collection('images');
        merchantImgRef.onSnapshot((snapshot) => {
          let merchantsImage = [];
          snapshot.forEach((doc) => {
              merchantsImage.push({...doc.data(), id:doc.id});

              
          });

          this.merchantsImage = merchantsImage;
        });
      });

      this.merchants = merchants;
    });
  },
});
