// yelp fusion key
//1q5Wyuia20sg6oTNXdP3N16DVxyXOgjddjzmQURK9Y1KzVBBFK5VvoQ_XAuamKYG1ZTBImLDYQ0rtVsqgeyCivZeEUGgD_1vc1ozyrmFI2wnBNEUzDnDWQKRce5cZHYx
// client id :LybLDQc8dmEyo1TR3FJhrA
//docs https://docs.developer.yelp.com/docs/fusion-authentication
//Initialize map
let map = L.map("map").setView([39.960938, -83.017194], 11);

//import data
import localData from "../locations.json" assert { type: "json" };
const locValues = Object.values(localData);
import SubwayData from "/YelpSubway.json" assert { type: "json" };
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

//READ AND PLACE LOCATIONS
for (let j = 0; j < locValues.length; ++j) {
  testIcon = L.icon({
    iconUrl: "../Resources/Images/whatsapp.svg.png",
    iconSize: [25, 48],
    shadowSize: [38, 40],
    iconAnchor: [19, 30],
    shadowAnchor: [4, 20],
    popupAnchor: [-5, -40],
  });
  L.marker([locValues[j].Lat, locValues[j].Long], { icon: testIcon })
    .addTo(map)
    .on("click", function () {
      L.popup()
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
    });
}
//load the Sub Way
for (let j = 0; j < SubwayData.businesses.length; ++j) {
  testIcon = L.icon({
    iconUrl: "../Resources/Images/marker.png",
    iconSize: [25, 48],
    shadowSize: [38, 40],
    iconAnchor: [19, 30],
    shadowAnchor: [4, 20],
    popupAnchor: [-5, -40],
  });
  L.marker(
    [
      SubwayData.businesses[j].coordinates.latitude,
      SubwayData.businesses[j].coordinates.longitude,
    ],
    { icon: testIcon }
  )
    .addTo(map)
    .on("click", function () {
      L.popup()
        .setLatLng([SubwayData.businesses[j].coordinates])
        .setContent(
          '<div class="Pop-up "><h1>' +
            SubwayData.businesses[j].name +
            "</h1>" +
            "<h2>" +
            SubwayData.businesses[j].rating +
            "/5 </h2>" +
            "<p>Address: " +
            SubwayData.businesses[j].address1 +
            "</p>Learn More<a href=\"google.com\">"+ "a"+"</a></div>"
        )
        .openOn(map);
    });
}
