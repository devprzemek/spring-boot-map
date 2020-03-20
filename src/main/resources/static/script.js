const mapBoxAccessToken = 'pk.eyJ1IjoicHNhbGFtb25payIsImEiOiJjazd4YjFranEwMDFvM2twZ2dkc3BhNnBkIn0.OfYylFI1n9JFpzdUJaTNWA';

var map = L.map('mapid').setView([33.1, -96.0], 5);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapBoxAccessToken, {
    id: 'mapbox/light-v9',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

function getColor(confirmedCases) {
    return confirmedCases > 1000 ? '#99000d' :
        confirmedCases > 500  ? '#cb181d' :
            confirmedCases > 200  ? '#ef3b2c' :
                confirmedCases > 100  ? '#fb6a4a' :
                    confirmedCases > 50   ? '#fc9272' :
                        confirmedCases > 20   ? '#fcbba1' :
                            confirmedCases > 10   ? '#fee0d2' :
                                '#fff5f0';
}

function style(feature) {
    let color = data[feature.properties.NAME];

    return {
        fillColor: getColor(color),
        weight: 2,
        opacity: 1,
        color: '#000000',
        dashArray: '1',
        fillOpacity: 0.5
    };
}
var geojson = L.geoJson(window.statesData, {style: style}).addTo(map);

function highlightFeature(event) {
    var layer = event.target;

    layer.setStyle({
        weight: 4,
        color: '#808080',
        dashArray: '',
        fillOpacity: 0.5
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(event) {
    geojson.resetStyle(event.target);
    info.update();
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
}

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);


var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>COVID-19 Confirmed cases</h4>' +  (props ?
        '<b>' + props.NAME + '</b><br />' + data[props.NAME]+ ' cases'
        : 'Hover over a state');
};
info.addTo(map);
var legend = L.control({position: 'bottomright'});
var grades = [0, 10, 20, 50, 100, 200, 500, 1000];

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'legend');


    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? ' &ndash; ' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

legend.addTo(map);