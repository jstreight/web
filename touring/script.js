// // Password protection
// (function() {
//     var correctPassword = "westcoast2026"; // change this
//     var entered = prompt("Enter password to access the Vancouver Island Guide:");

//     if (entered !== correctPassword) {
//         document.write("<h1>Access Denied</h1>");
//         document.body.style.backgroundColor = "black";
//         throw new Error("Access denied");
//     }
// })();


// Initialize map centered on Vancouver Island
var map = L.map('map').setView([49.5, -125.5], 8);

// OpenStreetMap tiles
var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
});

// Satellite imagery (Esri World Imagery)
var satelliteMap = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
    }
).addTo(map);

// Locations data (GeoJSON style)
var locations = [
    {
        name: "Victoria",
        coords: [48.4284, -123.3656],
        description: "Capital city of British Columbia."
    },
    {
        name: "Tofino",
        coords: [49.1520, -125.9040],
        description: "Surf town on the west coast."
    },
    {
        name: "Pacific Rim National Park Reserve",
        coords: [49.0800, -125.7500],
        description: "Famous beaches and rainforest."
    },
    {
        name: "Cathedral Grove",
        coords: [49.3036, -124.6273],
        description: "Old-growth forest with massive trees."
    },
    {
        name: "Nanaimo",
        coords: [49.1659, -123.9401],
        description: "Harbour city and gateway from Vancouver."
    },
    {
        name: "Elk Falls",
        coords: [50.0420, -125.2480],
        description: "Waterfall near Campbell River."
    },
    {
        name: "Ucluelet",
        coords: [48.9416, -125.5460],
        description: "Quieter alternative to Tofino."
    },
    {
        name: "Sombrio Beach",
        coords: [48.5783, -124.4022],
        description: "Free camping and hidden waterfall."
    },
    {
        name: "Rathtrevor Beach Provincial Park",
        coords: [49.3290, -124.3180],
        description: "Warm shallow beach near Parksville."
    }
];

// Add markers
locations.forEach(function(place) {
    L.marker(place.coords)
        .addTo(map)
        .bindPopup("<b>" + place.name + "</b><br>" + place.description);
});

fetch("data/roads.geojson")
  .then(res => res.json())
  .then(data => {

    function roadStyle(feature) {
      switch (feature.properties.fclass) {
        case "motorway":
          return { color: "#d73027", weight: 6 };
        case "primary":
          return { color: "#fc8d59", weight: 5 };
        case "secondary":
          return { color: "#fee08b", weight: 4 };
        case "tertiary":
          return { color: "#91bfdb", weight: 3 };
        case "residential":
          return { color: "#cccccc", weight: 2 };
        case "service":
          return { color: "#aaaaaa", weight: 1 };
        default:
          return { color: "#999999", weight: 1 };
      }
    }

    L.geoJSON(data, {
      style: roadStyle,
      onEachFeature: function (feature, layer) {
        if (feature.properties.name) {
          layer.bindTooltip(feature.properties.name, {
            permanent: false,
            direction: "center",
            className: "road-label"
          });
        }
      }
    }).addTo(map);

  });
// --- Layer Control ---
L.control.layers(
    {
        "Street Map": streetMap,
        "Satellite": satelliteMap
    }

).addTo(map);
