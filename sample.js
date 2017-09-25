              //Defining map as a global variable to access from other functions
              var map;
			  
				function initMap() {
                    //Enabling new cartography and themes
                    google.maps.visualRefresh = true;
					
					//extend the Polygon class to have getArea() function
					google.maps.Polygon.prototype.getArea=function(){
						var area = google.maps.geometry.spherical.computeArea(this.getPath());
						return area;
					};
					
					//extend the Polygon class to have getLength() function
					google.maps.Polygon.prototype.getLength=function(){
						var length = google.maps.geometry.spherical.computeLength(this.getPath());
						return length;
					};
					
                    //Setting starting options of map
                    var mapOptions = {
                          center: new google.maps.LatLng(-6.206518, 106.799918),
                          zoom: 18,
                          mapTypeId: google.maps.MapTypeId.SATELLITE
                    };
        var geocoder = new google.maps.Geocoder();      
        document.getElementById('submit').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
        });
                    //Getting map DOM element
                    var mapElement = document.getElementById("mapDiv");

                    //Creating a map with DOM element which is just obtained
                    map = new google.maps.Map(mapElement, mapOptions);
					
					//creating drawingManager
					var drawingManager = new google.maps.drawing.DrawingManager({
						//initial drawing tool to be enabled
						drawingMode:null,
						//enable the drawingControl to be seen in the UI
						drawingControl:true,
						//select which drawing modes to be seen in the drawingControl and position them
						drawingControlOptions: {
							//select a position in the UI
							position: google.maps.ControlPosition.BOTTOM_CENTER,
							//selected drawing modes to be seen in the control
							drawingModes: [
								google.maps.drawing.OverlayType.POLYGON,
								google.maps.drawing.OverlayType.POLYLINE,
							]
						},
						//specific drawing mode options, this one for polyline
						polylineOptions: {
							strokeColor:'red',
							strokeWeight:3
						},
						//specific drawing mode options, this one for polygon
						polygonOptions: {
							strokeColor:'blue',
							strokeWeight:3,
							fillColor:'yellow',
							fillOpacity:0.2
						}
					});
					
					//enable drawing functionality
					drawingManager.setMap(map);
					
					//add event listener for completion of your polygon
google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
            if (event.type == google.maps.drawing.OverlayType.CIRCLE) {
                var radius = event.overlay.getRadius();
                alert("Radius of circle =" + radius + " m");
            }
            if (event.type == google.maps.drawing.OverlayType.POLYGON) {
                var geom = event.overlay.getPath();
                alert("Area of POLYGON =" + calculateArea(geom) + " sq. m");
            }
            if (event.type == google.maps.drawing.OverlayType.POLYLINE) {
                var geom = event.overlay.getPath();
                alert("Length of POLYLINE =" + calculateLength(geom) + " m");
            }
        });
      }
        
      // Calculates area in sq meters
      function calculateArea(geom) {
          var areaInMetres = google.maps.geometry.spherical.computeArea(geom); 
          //var areaInHectare = areaInMetres * .0001; 
          return areaInMetres;
      }
        
      // Calculates length in meters
      function calculateLength(geom) {
          var areaInMetre = google.maps.geometry.spherical.computeLength(geom);
          return areaInMetre;
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
