//Initialize map
let map = L.map('map').setView([39.960938, -83.017194], 19)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 11,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//add marker at 39.950010 -82.823420