// Beer Mapping API

// desired url example: http://beermapping.com/webservice/locquery/cf14ac03008445d03cf9b26ed33bc258/goose+island&s=json
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

      var searchValue = $("#search").val()
      console.log(searchValue)
      var breweryName = (data[0].name);
      var breweryState = (data[0].state);
      var breweryCity = (data[0].city);
      var breweryStreet = (data[0].street);
      var place = (breweryName + breweryStreet + breweryCity + breweryState);
      console.log(place); // logs info for Sierra Nevada in CA

    // Mapbox geocoder is giving me cities and state
    $.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + searchValue + '.json?access_token=pk.eyJ1Ijoia3N1bW1lcmlsbCIsImEiOiJjajdreWRlNTgyaTl0MnFvMjRscnI1eDBvIn0.YzcP4_MZvzgm6HiMGcUsHQ&country=us', function(data){
        console.log($.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + searchValue + '.json?access_token=pk.eyJ1Ijoia3N1bW1lcmlsbCIsImEiOiJjajdreWRlNTgyaTl0MnFvMjRscnI1eDBvIn0.YzcP4_MZvzgm6HiMGcUsHQ')); //logs response from Mapbox
        console.log(data.features[0].center); // logs coordinates for searchValue

        // add markers to map
        data.features.forEach(function(marker) {

        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
        .addTo(map);

        // if search is a city, make a for loop to go through data to grab all breweries in that city
        if (searchValue === "seattle") {
        for (var i = 0; i < data; i++) {
          return i;
        }
        } else {
          console.log("not seattle");
        }

      });
    });




  })

});

})





/* 2 different attempts to flyto marker location
//   $(document).ready(function(){
//     $("#searchForm").submit(function(e){
//       e.preventDefault();
//       map.flyTo({
//           center: [
//               -74.50 + (Math.random() - 0.5) * 10,
//               40 + (Math.random() - 0.5) * 10]
//         });
//   })
// })
//     document.getElementById("#fly").addEventListener('click', function () {
//       // Fly to a random location by offsetting the point -74.50, 40
//       // by up to 5 degrees.
//       map.flyTo({
//           center: [
//               -74.50 + (Math.random() - 0.5) * 10,
//               40 + (Math.random() - 0.5) * 10]
//
//   });
// });
*/
