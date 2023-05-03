//Initialize map
let map = L.map('map').setView([39.960938, -83.017194], 19);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 11,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//create icon for markers

let testIcon = L.icon({
    iconUrl: '../Resources/Images/Bat Walter White.jpg',

    iconSize: [25, 48],
    shadowSize: [38, 40],
    iconAnchor: [19, 30],
    shadowAnchor: [4, 20],
    popupAnchor: [-5, -40]
});

L.marker([39.950008, -82.823418], {icon: testIcon}).addTo(map);

//NOTES
//add marker at 39.950010 -82.823420