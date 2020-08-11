var form = document.getElementById("ricky");
var parentDiv = document.getElementById("resultImg");

let shop1 = 'shop1';

function resetLocal(e) {
    localStorage.clear();
    window.location.reload();
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    var reader = new FileReader();
    var imgName = document.getElementById('uploadImg').files[0].name;
    console.log(imgName);

    reader.addEventListener('load', function () {
       if (this.result && localStorage) {
           
           localStorage.setItem(imgName, this.result);
           
           alert('success');
           showImage();
       } else {
           alert('failed'); 
       }
    });

    reader.readAsDataURL(document.getElementById('uploadImg').files[0]);

    if (localStorage.merchant0 == undefined) {
        localStorage.setItem('merchantNum', '0');
        let merchant0 = {
            merchantName: shop1,
            storeImg: imgName
        }; 
        let myObj_JSONed = JSON.stringify(merchant0);
    }  
    
    

});

function showImage() {
    for (let i = 0; i< localStorage.length; i++) {
        let res = localStorage.getItem(localStorage.key(i));
        var image = new Image();
        image.src = res;
        parentDiv.appendChild(image);
    }
}

showImage();