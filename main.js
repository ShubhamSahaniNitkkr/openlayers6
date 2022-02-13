window.onload = init;

function init() {
  const fullScreenControl = new ol.control.FullScreen();
  const mousePositionControl = new ol.control.MousePosition();
  const overViewMapControl = new ol.control.OverviewMap({
    collapsed: false,
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
  });
  const scaleLineControl = new ol.control.ScaleLine();
  const zoomSliderControl = new ol.control.ZoomSlider();
  const zoomToExtendControl = new ol.control.ZoomToExtent();

  const map = new ol.Map({
    view: new ol.View({
      center: [04721242, 3041234],
      zoom: 2,
      //   maxZoom: 4,
      //   minZoom: 2,
      //   rotation: 0.45,
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    target: "js-map",
    keyboardEventTarget: document,
    controls: ol.control
      .defaults()
      .extend([
        fullScreenControl,
        mousePositionControl,
        overViewMapControl,
        scaleLineControl,
        zoomSliderControl,
        zoomToExtendControl,
      ]),
  });

  //   overlay
  const popupContainerElement = document.getElementById("popup-coordinates");
  const popup = new ol.Overlay({
    element: popupContainerElement,
    positioning: "bottom",
  });
  map.addOverlay(popup);
  map.on("click", (e) => {
    const clickedCoordinates = e.coordinate;
    popup.setPosition(undefined);
    popup.setPosition(clickedCoordinates);
    popupContainerElement.innerHTML = clickedCoordinates;
  });

  //   dragrotate interaction
  const dragRotateInteraction = new ol.interaction.DragRotate({
    condition: ol.events.condition.altKeyOnly,
  });
  map.addInteraction(dragRotateInteraction);

  //freehand drawing on map
  const drawInteraction = new ol.interaction.Draw({
    type: "Polygon",
    freehand: true,
  });
  //   disabling draw
  //   map.addInteraction(drawInteraction);

  drawInteraction.on("drawend", (e) => {
    let parser = new ol.format.GeoJSON();
    let drawnFeatures = parser.writeFeatures([e.feature]);
    console.log(drawnFeatures);
  });
}
