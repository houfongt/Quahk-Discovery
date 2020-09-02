document.addEventListener('DOMContentLoaded', function () {
  var elems = document.getElementById('welcomeModal');
  var instances = M.Modal.init(elems, { dismissible: false });
});

Vue.directive('trim', {
  inserted: function (el) {
    var str = el.innerHTML;
    var resultString = str.split('').slice(0, 15).join('') + '...';
    el.innerHTML = resultString;
  },
});

var indexApp = new Vue({
  el: '#app',
  data: {
    merchants: [],
    merchantsImage: [],
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
            merchantsImage.push({ ...doc.data(), id: doc.id });
          });

          this.merchantsImage = merchantsImage;
        });
      });

      this.merchants = merchants;
    });
  },
});

function firstLaunch() {
  if (localStorage.getItem('firstLaunch') == 'true') {
  } else {
    $('#welcomeModal').modal('open');
  }

  if ((location.search).split('?')[1] == 'done') {
    M.toast({ html: '成功加入記錄' });
  } else {

  }
}

function agreeTerms() {
  localStorage.setItem('firstLaunch', 'true');
}


