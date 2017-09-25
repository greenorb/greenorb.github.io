      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: 2.3804, lng: 99.1438}
        });
        var geocoder = new google.maps.Geocoder();
        
        // Load GeoJSON.
        map.data.loadGeoJson('https://raw.githubusercontent.com/greenorb/greenorb.github.io/master/00.geojson');

        // Set the stroke width, and fill color for each polygon
        map.data.setStyle(function(feature) {
        var Fungsi = feature.getProperty('Fungsi');
        var color = "black";

        if (Fungsi == "CA") {
        color = "darkviolet";
         }
        if (Fungsi == "HL") {
        color = "green";
         }         
        if (Fungsi == "HP") {
        color = "yellow";
         }         
        if (Fungsi == "HPK") {
        color = "deeppink";
         }         
        if (Fungsi == "HPT") {
        color = "lime";
         }
        if (Fungsi == "HSA") {
        color = "darkviolet";
         }         
        if (Fungsi == "SM") {
        color = "darkviolet";
         } 
        if (Fungsi == "Tahura") {
        color = "darkviolet";
         }
        if (Fungsi == "TB") {
        color = "darkviolet";
         }
        if (Fungsi == "TN") {
        color = "darkviolet";
         }
        if (Fungsi == "TNL") {
        color = "darkviolet";
         }
        if (Fungsi == "TWA") {
        color = "darkviolet";
         }
        if (Fungsi == "TWAL") {
        color = "darkviolet";
         }
        if (Fungsi == "KSA") {
        color = "darkviolet";
         }
        if (Fungsi == "KSAL") {
        color = "darkviolet";
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
