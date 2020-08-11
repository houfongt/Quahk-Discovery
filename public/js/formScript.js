var sourceImg = document.getElementById("bannerImg");

function changeCloudStatus() {
    var checkBox = document.querySelector("#cloud1");
    if (checkBox.checked == true) {
        localStorage.cloudSaving = true;
        alert("Cloud Saving has been turned on.");
    } else if (checkBox.checked == false) {
        localStorage.cloudSaving = false;
        alert("Cloud Saving has been disabled.");
    }
}

function checkStorage() {
    if (typeof (Storage) !== "undefined") {
        sourceImg.setAttribute("src", localStorage.bullImg);
        // Code for localStorage/sessionStorage.
        
var localCases = { 'title': 'abc', 'msg': 'hello world' };
        // Put the object into storage
        localStorage.setItem('cases', JSON.stringify(localCases));

        if (localStorage.cases == "") {
            console.log("doesn't exists");
        } else {
            var i;
            var casesArray = JSON.parse(localStorage.getItem("cases"));
            console.log(casesArray);
        }

        //localStorage.cloudSaving = false;
        //localStorage.message = document.querySelector("#message");
    } else {
        // Sorry! No Web Storage support..
        alert("Sorry! Your browser don't support Local Storage \nSo, you can only use cloud saving.");
        document.querySelector("#submitBtn").removeAttribute("onclick");
        document.getElementById("ricky").setAttribute("action", "https://us-central1-quahk-competition-3rdmwdsc.cloudfunctions.net/formSubmit");
        document.getElementById("ricky").setAttribute("method", "POST");
        document.getElementById("cloud1").setAttribute("disabled", "");
        document.getElementById("cloud1").setAttribute("checked", "");

    }
}


// Get a reference to the image element


// Take action when the image has loaded
sourceImg.addEventListener("load", function () {
    var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");

    // Make sure canvas is as big as the picture
    imgCanvas.width = sourceImg.width;
    imgCanvas.height = sourceImg.height;

    // Draw image into canvas element
    imgContext.drawImage(sourceImg, 0, 0, sourceImg.width, sourceImg.height);

    // Get canvas contents as a data URL
    var imgAsDataURL = imgCanvas.toDataURL("image/png");

    // Save image into localStorage
    try {
        localStorage.setItem("bullImg", imgAsDataURL);
    }
    catch (e) {
        console.log("Storage failed: " + e);
    }
}, false); 