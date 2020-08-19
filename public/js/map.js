function startMap() {
  $("#mapModel").modal("open");
  initMap();
}

var map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 22.210928, lng: 113.552971 },
    zoom: 18,
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        var marker = new google.maps.Marker({
          position: pos,
          map: map,
          draggable: true, //make it draggable
        });
        // console.log(marker);
        //infoWindow.setContent('Location found.');
        //infoWindow.open(map);
        map.setCenter(pos);

        markerLocation(marker);

        google.maps.event.addListener(map, "click", function (event) {
          var clickedLocation = event.latLng;
          marker.setPosition(clickedLocation);
          markerLocation(marker);
        });

        google.maps.event.addListener(marker, "dragend", function (event) {
          markerLocation(marker);
        });
      },
      function (error) {
        if (error.code == error.PERMISSION_DENIED) {
          document.getElementById("mapErrorReason").innerText =
            "錯誤原因：用戶拒絕";
          $("#mapError").modal("open");
          var marker = false;
          google.maps.event.addListener(map, "click", function (event) {
            //Get the location that the user clicked.
            var clickedLocation = event.latLng;
            //If the marker hasn't been added.
            if (marker == false) {
              //Create the marker.
              marker = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true, //make it draggable
              });
              //Listen for drag events!
              google.maps.event.addListener(marker, "dragend", function (
                event
              ) {
                markerLocation(marker);
              });
            } else {
              //Marker has already been added, so just change its location.
              marker.setPosition(clickedLocation);
            }
            //Get the marker's location.
            markerLocation(marker);
          });
        } else if (error.code == error.POSITION_UNAVAILABLE) {
          document.getElementById("mapErrorReason").innerText =
            "錯誤原因：用戶已批准，但裝置內部零件發生問題。";
          $("#mapError").modal("open");
          var marker = false;
          google.maps.event.addListener(map, "click", function (event) {
            //Get the location that the user clicked.
            var clickedLocation = event.latLng;
            //If the marker hasn't been added.
            if (marker == false) {
              //Create the marker.
              marker = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true, //make it draggable
              });
              //Listen for drag events!
              google.maps.event.addListener(marker, "dragend", function (
                event
              ) {
                markerLocation(marker);
              });
            } else {
              //Marker has already been added, so just change its location.
              marker.setPosition(clickedLocation);
            }
            //Get the marker's location.
            markerLocation(marker);
          });
        } else if (error.code == error.TIMEOUT) {
          document.getElementById("mapErrorReason").innerText =
            "錯誤原因：用戶已批准，獲取逾時";
          $("#mapError").modal("open");
          var marker = false;
          google.maps.event.addListener(map, "click", function (event) {
            //Get the location that the user clicked.
            var clickedLocation = event.latLng;
            //If the marker hasn't been added.
            if (marker == false) {
              //Create the marker.
              marker = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true, //make it draggable
              });
              //Listen for drag events!
              google.maps.event.addListener(marker, "dragend", function (
                event
              ) {
                markerLocation(marker);
              });
            } else {
              //Marker has already been added, so just change its location.
              marker.setPosition(clickedLocation);
            }
            //Get the marker's location.
            markerLocation(marker);
          });
        }
      }
    );
  } else {
    // Browser doesn't support Geolocation
    $("#mapError").modal("open");
    var marker = false;
    google.maps.event.addListener(map, "click", function (event) {
      //Get the location that the user clicked.
      var clickedLocation = event.latLng;
      //If the marker hasn't been added.
      if (marker == false) {
        //Create the marker.
        marker = new google.maps.Marker({
          position: clickedLocation,
          map: map,
          draggable: true, //make it draggable
        });
        //Listen for drag events!
        google.maps.event.addListener(marker, "dragend", function (event) {
          markerLocation(marker);
        });
      } else {
        //Marker has already been added, so just change its location.
        marker.setPosition(clickedLocation);
      }
      //Get the marker's location.
      markerLocation(marker);
    });
  }
  /*
    google.maps.event.addListener(map, 'click', function(event) {                
        //Get the location that the user clicked.
        var clickedLocation = event.latLng;
        //If the marker hasn't been added.
        if(marker == false){
            //Create the marker.
            marker = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true //make it draggable
            });
            //Listen for drag events!
            google.maps.event.addListener(marker, 'dragend', function(event){
                markerLocation();
            });
        } else{
            //Marker has already been added, so just change its location.
            marker.setPosition(clickedLocation);
        }
        //Get the marker's location.
        markerLocation();
    }); */
}
/*
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
*/
function markerLocation(marker) {
  //Get location.
  var currentLocation = marker.getPosition();
  //Add lat and lng values to a field that we can save.
  let lat = currentLocation.lat();
  let lng = currentLocation.lng();
  let finalPosition = lat + "," + lng;
  //console.log(finalPosition);
  document.getElementById("input_location").value = finalPosition;

  var geocoder = new google.maps.Geocoder();

  geocodeLatLng(geocoder, finalPosition);
}

function geocodeLatLng(geocoder, finalPosition) {
  var latlngStr = finalPosition.split(",", 2);
  var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
  geocoder.geocode({ location: latlng }, function (results, status) {
    if (status === "OK") {
      if (results[0]) {
        document.getElementById("decoded_location").value =
          results[0].formatted_address;
      } else {
        window.alert("No results found");
      }
    } else {
      window.alert("Geocoder failed due to: " + status);
    }
  });
}
