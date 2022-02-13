window.onload = init;

const attributionControl = new ol.control.Attribution({
  collapsible: true,
});

function init() {
  const map = new ol.Map({
    view: new ol.View({
      center: [04721242, 3041234],
      zoom: 2,
      //   to limit the rea
      //   extent: [
      //     7565041.697447874,
      //     811584.4625886064,
      //     10792166.027911734,
      //     4361421.226098852,
      //   ],
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
        zIndex: 1,
        visible: false,
        // exten:[LX,BY,RX,TY],
        extent: [
          7565041.697447874,
          811584.4625886064,
          10792166.027911734,
          4361421.226098852,
        ],
        opacity: 0.5,
      }),
    ],
    target: "js-map",
    controls: ol.control
      .defaults({ attribution: false })
      .extend([attributionControl]),
  });

  // Layer group

  const layerGroup = new ol.layer.Group({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM({
          url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
          zIndex: 0,
          visible: false,
          extent: [
            7565041.697447874,
            811584.4625886064,
            10792166.027911734,
            4361421.226098852,
          ],
          opacity: 0.5,
        }),
      }),
      new ol.layer.Tile({
        source: new ol.source.BingMaps({
          key:
            "Asd2p_SFbrqsiVxWAwjgGGOjR7uG-g5tof3pizdgmr7ckpCDKFlpcLq8z44LmQrk",
          imagerySet: "AerialWithLabels", //Road, Canvas, CanvasDark, OrdanceSurvey
        }),
        visible: false,
      }),
    ],
  });
  map.addLayer(layerGroup);

  //   cartoDB base Map
  const cartoDBBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url:
        "http://{1-4}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
    }),
    visible: false,
  });
  map.addLayer(cartoDBBaseLayer);

  //   TileDebug
  const tileDebuglayer = new ol.layer.Tile({
    source: new ol.source.TileDebug(),
    visible: false,
  });
  map.addLayer(tileDebuglayer);

  //   stemen layer
  const stamenBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: "http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg",
    }),
    visible: false,
  });
  map.addLayer(stamenBaseLayer);

  //   argis layer
  const tileArgisLayer = new ol.layer.Tile({
    source: new ol.source.TileArcGISRest({
      url:
        "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer",
    }),
    visible: false,
  });
  map.addLayer(tileArgisLayer);

  //   novaa layer
  const noaaWMSLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url:
        "https://nowcoast.noaa.gov/arcgis/services/nowcoast/forecast_meteoceanhydro_sfc_ndfd_dailymaxairtemp_offsets/MapServer/WMSServer?",
      params: {
        LAYERS: 5,
        FORMAT: "image/png",
        TRANSPARENT: true,
      },
      //   attributions: '<a href="https://nowcoast.noaa.gov">@NOVA</a>',
    }),
    visible: true,
  });

  noaaWMSLayer
    .getSource()
    .setAttributions('<a href="https://nowcoast.noaa.gov">@Shubham Sunny<a/>');
  noaaWMSLayer.set("maxZoom", 5);
  map.addLayer(noaaWMSLayer);
}
