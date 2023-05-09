//Initialize map
let map = L.map("map").setView([39.960938, -83.017194], 11);

//import data
import data from "../locations.json" assert { type: "json" };
const locValues = Object.values(data);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  minZoom: 11,
  interactive: true,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

//create icon for markers

let testIcon = L.icon({
  iconUrl: "../Resources/Images/WhatsApp.svg.png",

  iconSize: [25, 48],
  shadowSize: [38, 40],
  iconAnchor: [19, 30],
  shadowAnchor: [4, 20],
  popupAnchor: [-5, -40],
});
/*
L.marker([39.989479,-83.005341], {icon: testIcon}).addTo(map);//kroger
L.marker([39.7389, -83.3441], {icon: testIcon}).addTo(map);//ohio is real
// add popup
 L.popup()
    .setLatLng([39.7389, -83.3441])
    .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    .openOn(map);
*/
// create an orange rectangle

// zoom the map to the rectangle bounds
//map.fitBounds(bounds);

// zoom the map to the polyline
//map.fitBounds(polyline.getBounds());

//READ AND PLACE LOCATIONS
for (let j = 0; j < locValues.length; ++j) {
  L.marker([locValues[j].Lat, locValues[j].Long], { icon: testIcon })
    .addTo(map)
    .on("click", function(){  L.popup()
        .setLatLng([locValues[j].Lat, locValues[j].Long])
        .setContent(
          '<div class="Pop-up "><h1>' +
            locValues[j].Name +
            "</h1>" +
            "<h2>" +
            locValues[j].FlavorText +
            "</h2>" +
            "<p>Address: " +
            locValues[j].Address +
            '</p>Learn More!: <a  href="' +
            locValues[j].href +
            '">Click here</a></div>'
        )
        .openOn(map);
    })
    //.on("hover", setHover(j));
}
//function setHover(j) {
//    L.popup()
//    .setLatLng([locValues[j].Lat, locValues[j].Long])
//    .setContent("<h1>a</h1>")
//}

//NOTES
//39.989479,-83.005341
//add marker at 39.950010 -82.823420
