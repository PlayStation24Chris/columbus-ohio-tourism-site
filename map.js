//Initialize map
let map = L.map('map').setView([39.960938, -83.017194], 19);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 11,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//create icon for markers

let testIcon = L.icon({
    iconUrl: '../Resources/Images/WhatsApp.svg.png',

    iconSize: [25, 48],
    shadowSize: [38, 40],
    iconAnchor: [19, 30],
    shadowAnchor: [4, 20],
    popupAnchor: [-5, -40]
});

L.marker([39.964821, -82.978752], {icon: testIcon}).addTo(map);// art museum 
L.marker([39.959277, -82.980705], {icon: testIcon}).addTo(map);//hospitlal
L.marker([39.989479,-83.005341], {icon: testIcon}).addTo(map);//kroger
L.marker([39.7389, -83.3441], {icon: testIcon}).addTo(map);//ohio is real
// define rectangle geographical bounds
var bounds = [[39.7389, -83.3441], [39.989479,-83.005341]];

// create an orange rectangle
L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);

// zoom the map to the rectangle bounds
map.fitBounds(bounds);

// zoom the map to the polyline
map.fitBounds(polyline.getBounds());
//NOTES
//39.989479,-83.005341
//add marker at 39.950010 -82.823420

//SUBWAYS
/*
40.1179231, -83.0150081
39.9589294, -82.996934
39.9162279, -83.0358222
40.0499474, -83.0516656
39.9275356, -83.1203298
40.0598008, -82.9861377
40.0072525, -83.0463039
39.9940551, -82.9811159
*/