document.addEventListener("DOMContentLoaded", function () {

    // -------------------------
    // INITIALIZE MAP
    // -------------------------
    var map = L.map('map', { preferCanvas: true })
        .setView([49.5, -125.5], 8);

    // -------------------------
    // BASEMAPS
    // -------------------------
    var streetMap = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: '&copy; OpenStreetMap contributors' }
    );

    var satelliteMap = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { attribution: 'Tiles © Esri' }
    ).addTo(map); // Default basemap

    
    // -------------------------
    // LOCATION MARKERS
    // -------------------------
    var locations = [
        { name: "Victoria", coords: [48.4284, -123.3656], description: "Capital city of British Columbia." },
        { name: "Tofino", coords: [49.1523, -125.9020], description: "Surf town on the west coast." },
        { name: "Pacific Rim National Park Reserve", coords: [49.0705, -125.8078], description: "Famous beaches and rainforest." },
        { name: "Cathedral Grove", coords: [49.2946, -124.6046], description: "Old-growth forest with massive trees." },
        { name: "Elk Falls", coords: [50.0403, -125.2345], description: "Waterfall near Campbell River." },
        { name: "Ucluelet", coords: [48.9368, -125.5435], description: "Quieter alternative to Tofino." },
        { name: "Sombrio Beach", coords: [48.5790, -124.3985], description: "Free camping and hidden waterfall." },
        { name: "Rathtrevor Beach Provincial Park", coords: [49.3207, -124.2657], description: "Warm shallow beach near Parksville." }
    ];

    locations.forEach(function(place) {
        L.marker(place.coords)
            .addTo(map)
            .bindPopup("<b>" + place.name + "</b><br>" + place.description);
    });

    // -------------------------
    // LIVE MOUSE COORDINATES DISPLAY
    // -------------------------
    var coordsDiv = L.control({ position: 'bottomleft' });
    coordsDiv.onAdd = function(map) {
        this._div = L.DomUtil.create('div', 'mouse-coords');
        this._div.style.background = 'rgba(255,255,255,0.8)';
        this._div.style.padding = '5px';
        this._div.style.borderRadius = '4px';
        this._div.style.fontSize = '0.85rem';
        this._div.style.boxShadow = '0 0 4px rgba(0,0,0,0.3)';
        this._div.innerHTML = "Lat: -- , Lng: --";
        return this._div;
    };
    coordsDiv.addTo(map);

    map.on('mousemove', function(e) {
        coordsDiv._div.innerHTML = "Lat: " + e.latlng.lat.toFixed(6) + 
                                   " , Lng: " + e.latlng.lng.toFixed(6);
    });

    // -------------------------
    // CLICKABLE COORDINATE POPUP
    // -------------------------
    map.on('click', function(e) {
        var lat = e.latlng.lat.toFixed(6);
        var lng = e.latlng.lng.toFixed(6);

        L.popup()
            .setLatLng(e.latlng)
            .setContent("Coordinates:<br>Lat: " + lat + "<br>Lng: " + lng)
            .openOn(map);

        console.log("Clicked coordinates:", lat, lng);
    });

    // -------------------------
    // LAYER CONTROL
    // -------------------------
    var baseMaps = {
        "Street Map": streetMap,
        "Satellite": satelliteMap
    };


    L.control.layers(baseMaps,{ collapsed: false }).addTo(map);

    // -------------------------
    // ENSURE PROPER MAP SIZE ON GITHUB PAGES
    // -------------------------
    setTimeout(function () {
        map.invalidateSize();
    }, 100);

});