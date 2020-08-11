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

        // Code for localStorage/sessionStorage.

        var localCases = { 'title': 'abc', 'msg': 'hello world' };
        // Put the object into storage
       // localStorage.setItem('cases', JSON.stringify(localCases));

        if (localStorage.store0 == undefined) {
            console.log("doesn't exists");
        } else {
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
