document.addEventListener('DOMContentLoaded', function() {
    var elems = document.getElementById('activationModal');
    var instances = M.Modal.init(elems, {dismissible: false});
  });

function checkActivation() {
    if (localStorage.getItem('key') == undefined) {
        window.location.replace('activation.html');
    } else {

    }
};

function askActivation() {
    $('#activationModal').modal('open');
}