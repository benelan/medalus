import { loadModules } from "esri-loader";

export function loadMap() {
  // this will lazy load the ArcGIS API
  // and then use Dojo's loader to require the classes
  loadModules(["esri/Map", "esri/views/MapView", "esri/layers/GeoJSONLayer"])
    .then(([Map, MapView, GeoJSONLayer]) => {
      // // then we load a web map from an id
      // var webmap = new WebMap({
      //   portalItem: { // autocasts as new PortalItem()
      //     id: 'f2e9b762544945f390ca4ac3671cfa72'
      //   }
      // });
      // // and we show that map in a container w/ id #viewDiv
      // var view = new MapView({
      //   map: webmap,
      //   container: 'viewDiv'
      // });

      const url = "https://kghime.esri.com/geojsonHack/output.geojson";

      const template = {
        title: "{OBJECTID}",
        content:
          "Shape length of county is {Shape_Length} and shape area is {Shape_Area}"
      };

      const geoJSONLayer = new GeoJSONLayer({
        url: url,
        popupTemplate: template
      });

      const map = new Map({
        basemap: "dark-gray",
        layers: [geoJSONLayer]
      });

      const view = new MapView({
        container: "viewDiv",
        center: [-116.4194, 34.9592],
        zoom: 10,
        map: map
      });

      var featureCount = document.getElementById("feature-count");
      var county = document.getElementById("county");
      var selectCountyTitle = document.getElementById("select-county-title");

      view.ui.add(featureCount, "top-right");
      view.ui.add(selectCountyTitle, "top-right");
      view.ui.add(county, "top-right");

      //Button click event on counting number of features
      featureCount.addEventListener("click", function() {
        console.log("button clicked");

        view
          .whenLayerView(geoJSONLayer)
          .then(function(layerView) {
            return layerView.queryFeatureCount();
          })
          .then(function(count) {
            console.log(count); // prints the total number of client-side graphics to the console
          });
      });

      //Dropdown selection event to select a county and map over it
      // var highlight;
      county.addEventListener("change", function(event) {
        console.log(event);
        var highlight;
        view.whenLayerView(geoJSONLayer).then(function(layerView) {
          var query = geoJSONLayer.createQuery();
          query.where = "OBJECTID = 872";
          geoJSONLayer.queryFeatures(query).then(function(result) {
            if (highlight) {
              highlight.remove();
            }
            highlight = layerView.highlight(result.features);
          });
        });
      });
    }) //end of module
    .catch(err => {
      // handle any errors
      console.error(err);
    });
}
