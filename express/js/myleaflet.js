// LayersGroup
var wfsParamos = new L.layerGroup();
var wfsDepartamentos = new L.layerGroup();
var wfsMunicipios = new L.layerGroup();

// Geoserver Config
var url_geoserver_wfs = "/geoserver/wfs?";

//WMS
// Capas MUNICIPIOS WMS
var municipios = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
  layers: "municipios",
  format: "image/png",
  transparent: true,
  tiled: true,
  atttibution: "Natural Earth",
});

// Capa DEPARTAMENTOS WMS
var departamentos = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
  layers: "departamentos",
  format: "image/png",
  transparent: true,
  tiled: true,
  atttibution: "Natural Earth",
});

// Capa PARAMOS WMS
var paramos = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
  layers: "paramos",
  format: "image/png",
  transparent: true,
  tiled: true,
  atttibution: "Natural Earth",
});

// Capa VIAS WMS
var vias = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
  layers: "vias",
  format: "image/png",
  transparent: true,
  tiled: true,
  atttibution: "Natural Earth",
});

//WFS
// URL del servicio WFS
var wfsURL_departamentos =
  url_geoserver_wfs +
  "version=1.0.0&request=GetFeature&typeName=ne:departamentos&outputFormat=application/json";
var wfsURL_municipos =
  url_geoserver_wfs +
  "version=1.0.0&request=GetFeature&typeName=ne:municipios&outputFormat=application/json";
  var wfsURL_paramos =
  url_geoserver_wfs +
  "version=1.0.0&request=GetFeature&typeName=ne:paramos&outputFormat=application/json";

// Capas MUNICIPIOS WFS
fetch(wfsURL_municipos)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Crear capa L.geoJSON con los datos cargados
    var polygons = L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        layer.on("click", function (event) {
          var properties = feature.properties;
          alert("Polígono: " + properties.mpio_cnmbr);
        });
      },
    }).addTo(wfsMunicipios);
  })
  .catch(function (error) {
    console.log(error);
  });

// Capas DEPARTAMENTOS WFS
fetch(wfsURL_departamentos)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Crear capa L.geoJSON con los datos cargados
    var polygons = L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        layer.on("click", function (event) {
          var properties = feature.properties;
          alert("Polígono: " + properties.dpto_cnmbr);
        });
      },
    }).addTo(wfsDepartamentos);
  })
  .catch(function (error) {
    console.log(error);
  });

// Capa PARAMOS WFS
fetch(wfsURL_paramos)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Crear capa L.geoJSON con los datos cargados
    var polygons = L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        layer.on("click", function (event) {
          var properties = feature.properties;
          alert("Polígono: " + properties.dpto_cnmbr);
        });
      },
    }).addTo(wfsParamos);
  })
  .catch(function (error) {
    console.log(error);
  });
// --------------------------------------------------------------------------------------------------

// Leaflet Config
var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>' +
    " contributors",
  maxZoom: 19,
});

var osm2 = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
  maxZoom: 19 + "contributors",
  maxZoom: 18,
});

// google Mapa
var google = L.tileLayer(
  "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
  {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }
);

// OSM Mapa
var map = L.map("map", {
  center: [4.6908488667957435, -74.04341937825983],
  layers: [osm, paramos],
  zoom: 6,
  scrollWheelZoom: true,
});

var miniMap = new L.Control.MiniMap(osm2, {
  toggleDisplay: true,
  minimized: false,
  position: "bottomleft",
}).addTo(map);

var baseMaps = {
  "<img src='https://cdn-icons-png.flaticon.com/128/854/854878.png' height=15px, width=15px /> Google":
    google,
  "<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Openstreetmap_logo.svg/1200px-Openstreetmap_logo.svg.png' height=15px, width=15px /> OSM":
    osm,
};
var overlayMaps = {
  "<img src='https://cdn.icon-icons.com/icons2/1448/PNG/512/42497departmentstore_99030.png' height=15px, width=15px/> Departamentos (WMS)":
    departamentos,
  "<img src='https://cdn.icon-icons.com/icons2/1286/PNG/512/66_85286.png' height=15px, width=15px/> Municipios (WMS)":
    municipios,
  "<img src='https://cdn.icon-icons.com/icons2/2437/PNG/512/road_icon_148221.png' height=15px, width=15px/> Vias (WMS)":
    vias,
  "<img src='https://cdn.icon-icons.com/icons2/567/PNG/512/mountain_icon-icons.com_54385.png' height=15px, width=15px/> Paramos (WMS)":
    paramos,
  "<img src='https://cdn.icon-icons.com/icons2/1448/PNG/512/42497departmentstore_99030.png' height=15px, width=15px/> Departamentos (WFS)":
    wfsDepartamentos,
  "<img src='https://cdn.icon-icons.com/icons2/1286/PNG/512/66_85286.png' height=15px, width=15px/> Municipios (WFS)":
    wfsMunicipios,
    "<img src='https://cdn.icon-icons.com/icons2/567/PNG/512/mountain_icon-icons.com_54385.png' height=15px, width=15px/> Paramos (WFS)":
    wfsParamos,    
};

// add base layers
var controlLayers = L.control
  .layers(baseMaps, overlayMaps, { collapse: false })
  .addTo(map);

// Add SCALEBAR
L.control
  .scale({
    metric: true,
    imperial: false,
    maxWindth: 100,
  })
  .addTo(map);
