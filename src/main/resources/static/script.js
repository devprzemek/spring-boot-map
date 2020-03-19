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
        color: 'black',
        dashArray: '1',
        fillOpacity: 0.7
    };
}
L.geoJson(window.statesData, {style: style}).addTo(map);
