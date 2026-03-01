// Password protection
(function() {
    var correctPassword = "westcoast2026"; // change this
    var entered = prompt("Enter password to access the Vancouver Island Guide:");

    if (entered !== correctPassword) {
        document.write("<h1>Access Denied</h1>");
        document.body.style.backgroundColor = "black";
        throw new Error("Access denied");
    }
})();


// Initialize map centered on Vancouver Island
var map = L.map('map').setView([49.5, -125.5], 8);

// OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

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
