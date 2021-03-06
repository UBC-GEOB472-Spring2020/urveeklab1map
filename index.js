<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Display a map with a custom style</title>
<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
<script src='https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js'></script>
<link href='https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css' rel='stylesheet' />
<link rel="stylesheet" href="index.css">
</head>
<body>
<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.4.2/mapbox-gl-geocoder.min.js"></script>
<link
    rel="stylesheet"
    href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.4.2/mapbox-gl-geocoder.css"
    type="text/css"
    />
    <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
     
<div id='map'></div>
<div class='map-overlay' id='features'><h2>Population Density of US</h2>
<div id='pd'><p>Hover over a state to reveal its population density</p></div></div>
<div class='map-overlay' id='legend'></div> 
  
<script>
mapboxgl.accessToken = 'pk.eyJ1IjoidXJ2ZWVrIiwiYSI6ImNrNmlnNnhoMzAwcG8za285ZGp6b3JjdTkifQ.y-r82uRmAE2MHOQ-2LuB4Q';
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/urveek/ck785o8ib07pn1inyib67q8g8', // stylesheet location
center: [-77.5, 38], // starting position [lng, lat]
zoom: 3 // starting zoom
});


map.on('load', function() {


 
var layers = ['0-10', '10-20', '20-50', '50-100', '100-200', '200-500', '500-1000', '1000+'];
var colors = ['#FFEDA0', '#FED976', '#FEB24C', '#eb8b47', '#d76b2d', '#9a5223', '#7a2a0b', '#800026'];

for (i = 0; i < layers.length; i++) {
  var layer = layers[i];
  var color = colors[i];
  var item = document.createElement('div');
  var key = document.createElement('span');
  key.className = 'legend-key';
  key.style.backgroundColor = color;

  var value = document.createElement('span');
  value.innerHTML = layer;
  item.appendChild(key);
  item.appendChild(value);
  legend.appendChild(item);
}


map.on('mousemove', function(e) {
  var states = map.queryRenderedFeatures(e.point, {
    layers: ['statedata']
  });

  if (states.length > 0) {
    document.getElementById('pd').innerHTML = '<h3><strong>' + states[0].properties.name + '</strong></h3><p><strong><em>' + states[0].properties.density + '</strong> people/square mile</em></p>';
  } else {
    document.getElementById('pd').innerHTML = '<p>Hover over a state to reveal its population density!</p>';
  }

});

map.addControl(
new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl
})
);

map.getCanvas().style.cursor = 'default';
map.fitBounds([[-133.2421875, 16.972741], [-47.63671875, 52.696361]]);



});
</script>
 
</body>
</html>