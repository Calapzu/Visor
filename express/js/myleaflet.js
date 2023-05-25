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

var google = L.tileLayer(
  "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
  {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }
);

var municipios = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
  layers: "municipios",
  format: "image/png",
  transparent: true,
  tiled: true,
  atttibution: "Natural Earth",
});

var departamentos = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
  layers: "departamentos",
  format: "image/png",
  transparent: true,
  tiled: true,
  atttibution: "Natural Earth",
});

var paramos = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
  layers: "paramos",
  format: "image/png",
  transparent: true,
  tiled: true,
  atttibution: "Natural Earth",
});

var vias = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
  layers: "vias",
  format: "image/png",
  transparent: true,
  tiled: true,
  atttibution: "Natural Earth",
});

var map = L.map("map", {
  center: [4.6908488667957435, -74.04341937825983],
  layers: [osm, departamentos, municipios, vias, paramos, google],
  zoom: 6,
  scrollWheelZoom: true,
});

var miniMap = new L.Control.MiniMap(osm2).addTo(map);

var baseMaps = {
  "<img src='https://cdn-icons-png.flaticon.com/128/854/854878.png' height=15px, width=15px /> Google":
    google,
  "<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Openstreetmap_logo.svg/1200px-Openstreetmap_logo.svg.png' height=15px, width=15px /> OSM":
    osm,
};
var overlayMaps = {
  "<img src='https://cdn.icon-icons.com/icons2/1448/PNG/512/42497departmentstore_99030.png' height=15px, width=15px/> Departamentos":
    departamentos,
  "<img src='https://cdn.icon-icons.com/icons2/1286/PNG/512/66_85286.png' height=15px, width=15px/> Municipios":
    municipios,

  "<img src='https://cdn.icon-icons.com/icons2/2437/PNG/512/road_icon_148221.png' height=15px, width=15px/> Vias":
    vias,
  "<img src='https://cdn.icon-icons.com/icons2/567/PNG/512/mountain_icon-icons.com_54385.png' height=15px, width=15px/> Paramos":
    paramos,
};


L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

L.control.scale({ position: "bottomleft" }).addTo(map);
