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
    let shopName = document.getElementById('shopName').value;
    let shopComment = document.getElementById('shopComment').value;
    let imgExists = document.getElementById('uploadImg').files[0];
    

    if (imgExists !== undefined) {
        
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

        let merchant = {
            merchantName: shopName,
            merchantComment: shopComment,
            merchantImg: imgName
        }

        console.log(merchant);

    } else {
        
        let merchant = {
            merchantName: shopName,
            merchantComment: shopComment
        }

        console.log(merchant);
    }

    
   
    /*

    if (localStorage.merchantNum == undefined) {
        localStorage.setItem('merchantNum', '0');
        let merchant0 = {
            merchantName: shop1,
            storeImg: imgName
        }; 
        let myObj_JSONed = JSON.stringify(merchant0);
    }  else {
        let merchantNum = localStorage.getItem('merchantNum');
        let merchantNumParsed = parseInt(merchantNum);
        let y = merchantNumParsed+1 ;
    
        Object

        console.log(y);
        localStorage.setItem('merchantNum', y);
    }

    */
    
    form.reset();

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