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

//READ AND PLACE LOCATIONS
for (let j = 0; j < locValues.length; ++j) {
  if(locValues[j].Subway){
testIcon= L.icon({
  iconUrl: "../Resources/Images/marker.png",
  iconSize: [25, 48],
  shadowSize: [38, 40],
  iconAnchor: [19, 30],
  shadowAnchor: [4, 20],
  popupAnchor: [-5, -40],
})
  }
  else{
   testIcon= L.icon({
      iconUrl: "../Resources/Images/WhatsApp.svg.png",
    
      iconSize: [25, 48],
      shadowSize: [38, 40],
      iconAnchor: [19, 30],
      shadowAnchor: [4, 20],
      popupAnchor: [-5, -40],
    })
  }
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
//i can  speeck
//NOTES
//39.989479,-83.005341
//add marker at 39.950010 -82.823420
