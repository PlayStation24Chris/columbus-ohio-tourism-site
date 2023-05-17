// yelp fusion key
//1q5Wyuia20sg6oTNXdP3N16DVxyXOgjddjzmQURK9Y1KzVBBFK5VvoQ_XAuamKYG1ZTBImLDYQ0rtVsqgeyCivZeEUGgD_1vc1ozyrmFI2wnBNEUzDnDWQKRce5cZHYx
// client id :LybLDQc8dmEyo1TR3FJhrA
//docs https://docs.developer.yelp.com/docs/fusion-authentication
//Initialize map

let map = L.map("map").setView([39.960938, -83.017194], 11);

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

let funkymode = null;

loadJSON();

//import data
async function loadJSON()
{
  let response = await fetch('../locations.json');
  const localData = await response.json();
  
  response = await fetch('../YelpSubway.json');
  const SubwayData = await response.json();
  response = await fetch('../funkymode.json');
  funkymode = await response.json();
  console.log(funkymode)
  fillMap(Object.values(localData), SubwayData);
}

// import localData from "../locations.json" assert { type: "json" };
// const locValues = Object.values(localData);
// import SubwayData from "../YelpSubway.json" assert { type: "json" };

function fillMap(locValues, SubwayData)
{
  
  //READ AND PLACE LOCATIONS
  for (let j = 0; j < locValues.length; ++j) {
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
          .setLatLng([
            SubwayData.businesses[j].coordinates.latitude,
            SubwayData.businesses[j].coordinates.longitude,
          ])
          .setContent(
            '<div class="Pop-up "><h1>' +
              SubwayData.businesses[j].name +
              "</h1>" +
              "<h2>" +
              SubwayData.businesses[j].rating +
              "/5 </h2>" +
              "<p>Address: " +
              SubwayData.businesses[j].location.address1 +
              '</p>Learn More<a href="subway.html?address='+ SubwayData.businesses[j].location.display_address.join('_') +'">' +
              " Click Here!" +
              "</a></div>"
          )
          .openOn(map);
      });
  }
}

const Funky = document.getElementById('Funky');
Funky.addEventListener('click', function Funkymode(){
  console.log("funky");
  testIcon = L.icon({
    iconUrl: "../Resources/Images/pngegg.png",
    iconSize: [25, 48],
    shadowSize: [38, 40],
    iconAnchor: [19, 30],
    shadowAnchor: [4, 20],
    popupAnchor: [-5, -40],
  });
  for (let j = 0; j < funkymode.businesses.length; ++j) {
    L.marker(
      [
        funkymode.businesses[j].coordinates.latitude,
        funkymode.businesses[j].coordinates.longitude,
      ],
      { icon: testIcon }
    )
      .addTo(map)
      .on("click", function () {
        L.popup()
          .setLatLng([
            funkymode.businesses[j].coordinates.latitude,
            funkymode.businesses[j].coordinates.longitude,
          ])
          .setContent(
            '<div class="Pop-up "><h1>' +
            funkymode.businesses[j].name +
              "</h1>" +
              "<h2>" +
              funkymode.businesses[j].rating +
              "/5 </h2>" +
              "<p>Address: " +
              funkymode.businesses[j].location.address1 +
              "</a></div>"
          )
          .openOn(map);
      });
  }
}, {once: true});