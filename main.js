window.onload = init;

const attributionControl = new ol.control.Attribution({
  collapsible: true,
});

function init() {
  const map = new ol.Map({
    view: new ol.View({
      center: [04721242, 3041234],
      zoom: 2,
    }),
    target: "js-map",
    controls: ol.control
      .defaults({ attribution: false })
      .extend([attributionControl]),
  });

  const openstreetVectorTile = new ol.layer.VectorTile({
    source: new ol.source.VectorTile({
      url:
        "https://api.maptiler.com/tiles/v3-openmaptiles/{z}/{x}/{y}.pbf?key=z3SiQ8F8nlnnyDY0S9Pi",
      format: new ol.format.MVT(),
      attribution:
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }),
    title: "openstreetVectorTile",
    visible: false,
  });

  const openstreetVectorTileStyle =
    "https://api.maptiler.com/maps/5c467b6d-0dbb-44a3-be0a-71e5f5e4d281/style.json?key=z3SiQ8F8nlnnyDY0S9Pi";
  fetch(openstreetVectorTileStyle).then(function (response) {
    response.json().then(function (glstyle) {
      console.log(glstyle);
      olms.applyStyle(openstreetVectorTile, glstyle, "v3-openmaptiles");
    });
  });

  const geoJsonIndiaStatesLayer = new ol.layer.VectorImage({
    source: new ol.source.Vector({
      url: "./data/vectors/map.geojson",
      format: new ol.format.GeoJSON(),
    }),
    visible: false,
    title: "geoJsonIndiaStates",
  });

  const heapMapVectorTileLayer = new ol.layer.Heatmap({
    source: new ol.source.Vector({
      url: "./data/vectors/heatmap.geojson",
      format: new ol.format.GeoJSON(),
    }),
    radius: 20,
    blur: 12,
    // gradient:[''],
    title: "heapMapVectorTile",
    visible: false,
  });

  const openStreetMap = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: true,
    title: "OSMStandard",
  });

  const OSMHumanitarian = new ol.layer.Tile({
    source: new ol.source.OSM({
      url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    }),
    visible: false,
    title: "OSMHumanitarian",
  });

  const BingMaps = new ol.layer.Tile({
    source: new ol.source.BingMaps({
      key: "Asd2p_SFbrqsiVxWAwjgGGOjR7uG-g5tof3pizdgmr7ckpCDKFlpcLq8z44LmQrk",
      imagerySet: "AerialWithLabels", //Road, Canvas, CanvasDark, OrdanceSurvey
    }),
    visible: false,
    title: "BingMaps",
  });

  const cartoDBBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url:
        "http://{1-4}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
    }),
    visible: false,
    title: "CartoDarkAll",
  });

  const stamenBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: "http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg",
    }),
    visible: false,
    title: "StamenTerrian",
  });

  const baseLayerGroup = new ol.layer.Group({
    layers: [
      openStreetMap,
      OSMHumanitarian,
      BingMaps,
      cartoDBBaseLayer,
      stamenBaseLayer,
      openstreetVectorTile,
      geoJsonIndiaStatesLayer,
      heapMapVectorTileLayer,
    ],
  });
  map.addLayer(baseLayerGroup);

  // baselayer swicher logic
  const baseLayerElements = document.querySelectorAll(
    ".sidebar > input[type=radio]"
  );
  for (let baseElement of baseLayerElements) {
    baseElement.addEventListener("change", function () {
      console.log(this.value);
      baseLayerGroup.getLayers().forEach((element) => {
        element.setVisible(element.get("title") === this.value);
      });
    });
  }

  const tileDebuglayer = new ol.layer.Tile({
    source: new ol.source.TileDebug(),
    title: "debuglayer",
    visible: false,
  });

  const tileArgisLayer = new ol.layer.Tile({
    source: new ol.source.TileArcGISRest({
      url:
        "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer",
    }),
    title: "argislayer",
    visible: false,
  });

  const noaaWMSLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url:
        "https://nowcoast.noaa.gov/arcgis/services/nowcoast/forecast_meteoceanhydro_sfc_ndfd_dailymaxairtemp_offsets/MapServer/WMSServer?",
      params: {
        LAYERS: 5,
        FORMAT: "image/png",
        TRANSPARENT: true,
      },
    }),
    title: "novaalayer",
    visible: false,
  });

  const imagelayer = new ol.layer.Image({
    source: new ol.source.ImageStatic({
      url: "./data/images/india.jpg",
      imageExtent: [
        7565041.697447874,
        811584.4625886064,
        10792166.027911734,
        4361421.226098852,
      ],
      attribution: "India",
    }),
    visible: false,
    title: "imagelayer",
  });

  const RasterLayerGroup = new ol.layer.Group({
    layers: [tileDebuglayer, tileArgisLayer, noaaWMSLayer, imagelayer],
  });
  map.addLayer(RasterLayerGroup);

  const RasterLayerElements = document.querySelectorAll(
    ".sidebar > input[type=checkbox]"
  );
  for (let rasterElement of RasterLayerElements) {
    rasterElement.addEventListener("change", function () {
      let currentElem;
      RasterLayerGroup.getLayers().forEach((element) => {
        console.log(this.value, element.get("title"));
        if (this.value === element.get("title")) {
          currentElem = element;
        }
      });
      this.checked
        ? currentElem.setVisible(true)
        : currentElem.setVisible(false);
    });
  }
}
