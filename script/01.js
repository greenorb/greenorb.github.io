      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: 4.7693, lng: 96.6865}
        });
        var geocoder = new google.maps.Geocoder();
        
        map.data.loadGeoJson('https://raw.githubusercontent.com/greenorb/greenorb.github.io/master/01.geojson');
 
        map.data.setStyle(function(feature) {
        var Fungsi = feature.getProperty('Fungsi');
        var color = "gray";

        if (Fungsi == "CA") {
        color = "mediumorchid";
         }
        if (Fungsi == "HL") {
        color = "green";
         }         
        if (Fungsi == "HP") {
        color = "yellow";
         }         
        if (Fungsi == "HPK") {
        color = "fuchsia";
         }         
        if (Fungsi == "HPT") {
        color = "lime";
         }         
        if (Fungsi == "SM") {
        color = "purple";
         } 
        if (Fungsi == "Tahura") {
        color = "purple";
         }
        if (Fungsi == "TB") {
        color = "purple";
         }
        if (Fungsi == "TN") {
        color = "purple";
         }
        if (Fungsi == "TWA") {
        color = "purple";
         }
        if (Fungsi == "TWAL") {
        color = "purple";
         }
         return {
         fillColor: color,
         strokeWeight: 1
        }      
       });
        document.getElementById('submit').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
        });
      }
      function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Gunakan satu spasi sebelum input lat/long: ' + status);
          }
        });
      }
