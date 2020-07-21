var location = document.getElementById("input_location").value;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        location.innerHTML = "Geolocation is not supported by this browser.";
    }
}