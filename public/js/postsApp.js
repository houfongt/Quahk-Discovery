console.log(location.search)
let query = location.search;
let queryfinal = query.split('?');
console.log(queryfinal[1])

document.getElementById('title').innerHTML = (window.location.search).split('?')[1];

var postsApp = new Vue({
    el: '#postHtml',
    data: {
      merchantId: (window.location.search).split('?')[1],
      merchants: []
    },
    mounted() {
        
        const merchantRef = firebase.firestore().collection('merchants').doc(merchantId);
        console.log(merchantRef)
    }
  });