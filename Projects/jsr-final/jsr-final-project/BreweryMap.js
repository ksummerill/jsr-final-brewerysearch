// Beer Mapping API

var beerMappingUrl = 'http://beermapping.com/webservice/locquery/' + 'cf14ac03008445d03cf9b26ed33bc258/';
var xhr = new XMLHttpRequest();

mapboxgl.accessToken = 'pk.eyJ1Ijoia3N1bW1lcmlsbCIsImEiOiJjajdreWRlNTgyaTl0MnFvMjRscnI1eDBvIn0.YzcP4_MZvzgm6HiMGcUsHQ';

// Initializes the map and grabs the style
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ksummerill/cj9uj0uru3ypt2sp421ot86qt',
  center: [-97.922211, 39.381266],
  zoom: 3.5
});


// takes input from search form and adds to beerMappingUrl to get JSON and parse data
$(document).ready(function(){
  $("#searchForm").submit(function(e){
    e.preventDefault();
    $.get(beerMappingUrl + "/" + $("#search").val() + "&s=json", function(data){
      console.log(data); // logs data from beermapping

      // mostly for debugging purposes
      var searchValue = $("#search").val()
      console.log(searchValue)
      var breweryName = (data[0].name);
      var breweryState = (data[0].state);
      var breweryCity = (data[0].city);
      var breweryStreet = (data[0].street);
      var breweryScore = (data[0].overall);
      var breweryUrl = (data[0].url);
      var place = (breweryName + breweryStreet + breweryCity + breweryState);
      console.log(place); // logs info for search


    // Mapbox geocoder
    $.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + searchValue + '.json?access_token=pk.eyJ1Ijoia3N1bW1lcmlsbCIsImEiOiJjajdreWRlNTgyaTl0MnFvMjRscnI1eDBvIn0.YzcP4_MZvzgm6HiMGcUsHQ&country=us&types=poi&limit=1', function(data){
        //console.log($.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + searchValue + '.json?access_token=pk.eyJ1Ijoia3N1bW1lcmlsbCIsImEiOiJjajdreWRlNTgyaTl0MnFvMjRscnI1eDBvIn0.YzcP4_MZvzgm6HiMGcUsHQ')); //logs response from Mapbox
        console.log(data.features); // logs coordinates for searchValue

        for (i = 0; i < data.features.length; i++);
          var markerCoordinate = data.features[i];
          console.log(markerCoordinate);

        // add markers to map
        data.features.forEach(function(marker) {

        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map. coordinates are set by MB API
        new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({closeButton: true, offset: 25 }) // add popups
        .setHTML('<h3>' + breweryName + '</h3>' + '<h4>' + 'Score: ' + Math.round(breweryScore) + '<h4>' + '<p>' + 'Website: ' + breweryUrl + '</p>'))
        .addTo(map);

        // click on marker and fly to that location
        el.addEventListener('click', function(e) {
          flyToBrewery(marker);
        });

        function flyToBrewery(markerCoordinate) {
          map.flyTo({
            center: markerCoordinate.geometry.coordinates,
            zoom: 11
          });
        }
      });

      // click on x popup and fly back out to full map to search again

      var el = document.createElement('div');
        el.className = 'popup';
        el.addEventListener('click', function(e) {
          flyOut(popup);
        });

      var popup = new mapboxgl.Popup({closeButton: true})
        popup.on('close', function(){
         flyOut()
        })

      function flyOut() {
        map.flyTo({
          center: [-97.922211, 39.381266],
          zoom: 3.5
        });
      }
    });

    })
  });
});
