import React, { Component } from "react";
import { Col, Row, Spinner } from "reactstrap";
import { loadModules } from "esri-loader";
import { loadCss } from "esri-loader";
import { observer, inject } from "mobx-react";

const EsriMap = inject("DataStore")(
  observer(
    class EsriMap extends Component {
      componentDidMount() {
        loadCss();
        this.loadMap();
      }

      loadMap() {
        const that = this;
        // this will lazy load the ArcGIS API
        // and then use Dojo's loader to require the classes
        loadModules([
          "esri/Map",
          "esri/views/MapView",
          "esri/layers/GeoJSONLayer",
          "esri/widgets/TimeSlider",
          "esri/core/watchUtils"
        ])
          .then(([Map, MapView, GeoJSONLayer, TimeSlider, watchUtils]) => {
            let geojsonLayerView;
            let handle;
            if (that.props.DataStore.county.length > 0) {
              console.log("SUCCESS!!!!");
            }
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

            //symbology for rendering unique values based on Grid Codes

            //symbol for Grid Code 1
            const codeOne = {
              type: "simple-fill", //autocast as new SimpleFillSymbol()
              color: [255, 255, 0, 1], //yellow
              style: "solid"
            };

            const codeTwo = {
              type: "simple-fill", //autocast as new SimpleFillSymbol()
              color: [0, 255, 0, 1], //green
              style: "solid"
            };

            const codeThree = {
              type: "simple-fill", //autocast as new SimpleFillSymbol()
              color: [255, 0, 0, 1], //red
              style: "solid"
            };

            const codeFour = {
              type: "simple-fill", //autocast as new SimpleFillSymbol()
              color: [0, 0, 255, 1], //blue
              style: "solid"
            };

            var renderer = {
              type: "unique-value", //autocasts as new UniqueValueRenderer
              field: "gridcode",
              uniqueValueInfos: [
                {
                  value: "1", // grid code value "4"
                  symbol: codeOne // will be assigned codeOne
                },
                {
                  value: "2", // grid code value "4"
                  symbol: codeTwo // will be assigned codeTwo
                },
                {
                  value: "3", // grid code value "4"
                  symbol: codeThree // will be assigned codeThree
                },
                {
                  value: "4", // grid code value "4"
                  symbol: codeFour // will be assigned codeFour
                }
              ]
            };

            //const url = "http://belan2.esri.com:8080/almeda.geojson";
            //const url="https://jbanuelos.esri.com/hackathon/almeda_2011.geojson";
            // const url =
            //   "https://bsvensson.github.io/various-tests/geojson/usgs-earthquakes-06182019.geojson";
            // const url =
            //   "https://kghime.esri.com/geojsonHack/SanDiego_2011.geojson";
            const url = "https://kghime.esri.com/geojsonHack/output.geojson";

            console.log(url);
            const template = {
              title: "{OBJECTID}",
              content:
                "Shape length of county is {Shape_Length} and shape area is {Shape_Area}"
            };

            const geoJSONLayer = new GeoJSONLayer({
              url: url,
              popupTemplate: template,
              renderer: renderer,
              timeInfo: {
                startField: "Year" //name of the date field
              },
              interval: {
                unit: "years",
                value: 1
              }
            });

            const map = new Map({
              basemap: "dark-gray",
              layers: [geoJSONLayer]
            });

            const view = new MapView({
              container: "viewDiv",
              center: [-122.189964, 37.830697],
              zoom: 10,
              map: map
            });

            //Time Slider widget
            var timeSlider = new TimeSlider({
              container: "timeSlider",
              //view: view,
              //mode: "cumulative-from-start",
              playRate: 50,
              stops: {
                interval: {
                  value: 1,
                  unit: "days"
                }
              }
            });
            view.ui.add(timeSlider, "manual");

            //var featureCount = document.getElementById("feature-count");
            //var county = document.getElementById("county");
            //var selectCountyTitle = document.getElementById("select-county-title");
            const refreshBtn = document.getElementById("refreshDiv");
            const resetBtn = document.getElementById("resetBtn");

            view.ui.add(refreshBtn, "manual");
            view.ui.add(resetBtn, "bottom-right");
            //view.ui.add(featureCount, "top-right");
            //view.ui.add(selectCountyTitle, "top-right");
            //view.ui.add(county, "top-right");

            refreshBtn.onclick = function() {
              const inputGeometry = that.props.DataStore.inputGeometry;
              const where = that.props.DataStore.where;

              if (Object.keys(inputGeometry).length !== 0) {
                const extent = JSON.parse(that.props.DataStore.inputGeometry);
                const polygon = {
                  type: "polygon",
                  rings: [
                    [extent.xmin, extent.ymin],
                    [extent.xmin, extent.ymax],
                    [extent.xmax, extent.ymax],
                    [extent.xmax, extent.ymin],
                    [extent.xmin, extent.ymin]
                  ]
                };
                geojsonLayerView.filter = {
                  geometry: polygon,
                  spatialRelationship: "intersects",
                  where: where
                };
              } else {
                geojsonLayerView.filter = {
                  where: where
                };
              }
            };

            resetBtn.onclick = function() {
              geojsonLayerView.filter = { where: "1=1" };
            };

            view.when(() => {
              view
                .whenLayerView(geoJSONLayer)
                .then(layerView => {
                  geojsonLayerView = layerView;
                  handle = watchUtils.watch(
                    geojsonLayerView,
                    "updating",
                    () => {
                      console.log("finished loading the layer!");

                      //const start = geoJSONLayer.timeInfo.fullTimeExtent.start;
                    }
                  );

                  //const start = new Date(2019, 4, 25);
                 const start = geoJSONLayer.timeInfo.fullTimeExtent.start;
                //   console.log(start);
                //   const end = geoJSONLayer.timeInfo.fullTimeExtent.end;
                //   console.log(end);
                    timeSlider.fullTimeExtent = {
                      start: start,
                      end: geoJSONLayer.timeInfo.fullTimeExtent.end
                    };

                    const end = new Date(start);
                    end.setDate(end.getDate() + 1);
                //   const end = geoJSONLayer.timeInfo.fullTimeExtent.end;
                //   console.log(start);
                //   console.log(end);
                  timeSlider.values = [start, end];
                })
                .catch(err => console.log("failed in layerview ", err));
            });

            timeSlider.watch("timeExtent", function() {
              geoJSONLayer.definitionExpression =
                "Year <= " + timeSlider.timeExtent.end.getTime();

              geojsonLayerView.effect = {
                filter: {
                  timeExtent: timeSlider.timeExtent,
                  geometry: view.extent
                },
                excludedEffect: "grayscale(20%) opacity(12%)"
              };
            });

            // timeSlider.watch("timeExtent", function(value){
            //     // update layer view filter to reflect current timeExtent
            //     geojsonLayerView.filter = {
            //       timeExtent: value
            //     };
            //   });

            //Button click event on counting number of features
            // featureCount.addEventListener("click", function() {
            //   console.log("button clicked");

            //   view
            //     .whenLayerView(geoJSONLayer)
            //     .then(function(layerView) {
            //       return layerView.queryFeatureCount();
            //     })
            //     .then(function(count) {
            //       console.log(count); // prints the total number of client-side graphics to the console
            //     });
            // });

            //Dropdown selection event to select a county and map over it
            // var highlight;
            // county.addEventListener("change", function(event) {
            //   console.log(event);
            //   var highlight;
            //   view.whenLayerView(geoJSONLayer).then(function(layerView) {
            //     var query = geoJSONLayer.createQuery();
            //     query.where = "OBJECTID = 872";
            //     geoJSONLayer.queryFeatures(query).then(function(result) {
            //       if (highlight) {
            //         highlight.remove();
            //       }
            //       highlight = layerView.highlight(result.features);
            //     });
            //   });
            // });
          }) //end of module
          .catch(err => {
            // handle any errors
            console.error(err);
          });
      }

      render() {
        const mD = {
          width: "100%",
          height: "600px"
        };

        let filterVisibility =
          this.props.DataStore.where.length > 0 ||
          this.props.DataStore.inputGeometry.length > 0
            ? { visibility: "visible" }
            : { visibility: "hidden" };
        this.props.DataStore.inputGeometry.length > 0
          ? console.log("extent", this.props.DataStore.inputGeometry)
          : console.log("no extent");

        return (
          <Row id="map">
            <Col md={12}>
              <div id="viewDiv" style={mD}>
                <div
                  id="refreshDiv"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "250px",
                    height: "80px",
                    margin: "-40px 0 0 -125px",
                    visibility: { filterVisibility }
                  }}
                >
                  <button
                    id="refreshBtn"
                    className="circular ui button"
                    style={filterVisibility}
                  >
                    Refresh
                    <img
                      src={process.env.PUBLIC_URL + "./icon-refresh.png"}
                      alt="refresh-icon"
                    ></img>
                  </button>
                </div>
                <button
                  id="resetBtn"
                  className="circular ui button"
                  style={filterVisibility}
                >
                  Reset
                </button>
                {/* <button id="feature-count" className="esri-widget">
              Number of Features
            </button>
            <span id="select-county-title">Select a county:</span>
            <br />
            <select id="county" className="esri-select">
              <option value="San Bernardino">San Bernardino</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Santa Clara">Santa Clara</option>
              <option value="San Diego">San Diego</option>
              
            </select> */}
                <div id="timeSlider"></div>
              </div>
            </Col>
          </Row>
        );
      }
    }
  )
);

export default EsriMap;
