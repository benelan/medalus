import React, { Component } from "react";
import { Col, Row, Spinner } from "reactstrap";
import { loadModules } from "esri-loader";
import { loadCss } from "esri-loader";
import { observer, inject } from "mobx-react";
import "./map.css";

const EsriMap = inject("DataStore")(
  observer(
    class EsriMap extends Component {

      state = { // prevent memory leak on map reload
        map: null,
        view: null,
        geoJSONLayer: null,
        timeSlider: null,
        layerList: null,
        layerListExpand: null,
        geojsonLayerView: null,
        handle: null
      }

      componentDidMount() {
        loadCss();
        this.loadMap();
      }

      onClickHandler = () => {
        this.props.DataStore.setClicked(this.props.DataStore.clicked);
        //reload the map is necessary
        if (this.props.DataStore.reloadMap) {
          this.props.DataStore.setReloadMap(false);
          this.loadMap()
        }
      };

      loadMap() {
        const that = this;
        // this will lazy load the ArcGIS API
        // and then use Dojo's loader to require the classes
        loadModules([
          "esri/Map",
          "esri/views/MapView",
          "esri/layers/GeoJSONLayer",
          "esri/widgets/TimeSlider",
          "esri/layers/MapImageLayer",
          "esri/widgets/LayerList",
          "esri/widgets/Expand",
          "esri/core/watchUtils"
        ])
          .then(
            ([
              Map,
              MapView,
              GeoJSONLayer,
              TimeSlider,
              MapImageLayer,
              LayerList,
              Expand,
              watchUtils
            ]) => {

              //symbology for rendering unique values based on Grid Codes

              //symbol for Grid Code 1
              const codeOne = {
                type: "simple-fill", //autocast as new SimpleFillSymbol()
                color: [0, 100, 0, 1], //dark green
                style: "solid",
                outline: {
                  // autocasts as new SimpleLineSymbol()
                  color: "transparent",
                  width: 0
                }
              };

              const codeTwo = {
                type: "simple-fill", //autocast as new SimpleFillSymbol()
                color: [255, 204, 0, 1], //yellowish orange
                style: "solid",
                outline: {
                  // autocasts as new SimpleLineSymbol()
                  color: "transparent",
                  width: 0
                }
              };

              const codeThree = {
                type: "simple-fill", //autocast as new SimpleFillSymbol()
                color: [255, 0, 0, 1], //red
                style: "solid",
                outline: {
                  // autocasts as new SimpleLineSymbol()
                  color: "transparent",
                  width: 0
                }
              };

              const codeFour = {
                type: "simple-fill", //autocast as new SimpleFillSymbol()
                color: [128, 128, 128, 1], //gray
                style: "solid",
                outline: {
                  // autocasts as new SimpleLineSymbol()
                  color: "transparent",
                  width: 0
                }
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
              // const url = "https://kghime.esri.com/geojsonHack/output.geojson";
              const url = "http://belan2.esri.com:8080/output.geojson";

              const template = {
                title: "{Name}",
                content: `<p>The county of <b>{Name}</b> has a classification of <b>{gridcode}</b> in this region</p>`
              };

             that.state.geoJSONLayer = new GeoJSONLayer({
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

              that.state.map = new Map({
                basemap: "dark-gray",
                layers: [that.state.geoJSONLayer]
              });

              that.state.view = new MapView({
                container: "viewDiv",
                center: [-121.6169, 39.1404],
                zoom: 4,
                map: that.state.map
              });

              //Time Slider widget
              that.state.timeSlider = new TimeSlider({
                container: "timeSlider",
                playRate: 1000,
                stops: {
                  interval: {
                    value: 1,
                    unit: "years"
                  }
                }
              });

              // const timeSliderExpand = new Expand({
              //   expandIconClass: "esri-icon-clock",
              //   expandTooltip: "Time Slider",
              //   view: view,
              //   content: timeSlider,
              //   expanded: true
              // });
              // view.ui.add(timeSliderExpand, "top-right");
              that.state.view.ui.add(that.state.timeSlider, "bottom-left");

              //var featureCount = document.getElementById("feature-count");
              //var county = document.getElementById("county");
              //var selectCountyTitle = document.getElementById("select-county-title");
              const refreshBtn = document.getElementById("refreshDiv");
              const resetBtn = document.getElementById("resetBtn");

              that.state.view.ui.add(refreshBtn, "manual");
              that.state.view.ui.add(resetBtn, "bottom-right");

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
                  that.state.geojsonLayerView.filter = {
                    geometry: polygon,
                    spatialRelationship: "intersects",
                    where: where
                  };
                } else {
                  that.state.geojsonLayerView.filter = {
                    where: where
                  };
                }
              };

              resetBtn.onclick = function() {
                that.state.geojsonLayerView.filter = { where: "1=1" };
              };

              // function displayImageService() {
              //   if (document.getElementById("imageService").checked) {
              //     map.add();
              //   } else {
              //     map.remove();
              //   }
              // }

              const imgServiceLayer = new MapImageLayer({
                url:
                  "https://jaiswal.esri.com/server/rest/services/Hackathon/Desertification2010/MapServer",
                  visible: false
              });

              const imgServiceLayer1 = new MapImageLayer({
                url:
                  "https://jaiswal.esri.com/server/rest/services/Hackathon/Desertification2011/MapServer",
                  visible: false
              });
              const imgServiceLayer2 = new MapImageLayer({
                url:
                  "https://jaiswal.esri.com/server/rest/services/Hackathon/Desertification2012/MapServer",
                  visible: false
              });
              const imgServiceLayer3 = new MapImageLayer({
                url:
                  "https://jaiswal.esri.com/server/rest/services/Hackathon/Desertification2013/MapServer",
                  visible: false
              });
              const imgServiceLayer4 = new MapImageLayer({
                url:
                  "https://jaiswal.esri.com/server/rest/services/Hackathon/Desertification2014/MapServer",
                  visible: false
              });
              const imgServiceLayer5 = new MapImageLayer({
                url:
                  "https://jaiswal.esri.com/server/rest/services/Hackathon/Desertification2015/MapServer",
                  visible: false
              });
              const imgServiceLayer6 = new MapImageLayer({
                url:
                  "https://jaiswal.esri.com/server/rest/services/Hackathon/Desertification2016/MapServer",
                  visible: false
              });
              const imgServiceLayer7 = new MapImageLayer({
                url:
                  "https://jaiswal.esri.com/server/rest/services/Hackathon/Desertification2017/MapServer",
                  visible: false
              });
              const imgServiceLayer8 = new MapImageLayer({
                url:
                  "https://jaiswal.esri.com/server/rest/services/Hackathon/Desertification2018/MapServer",
                  visible: false
              });

              that.state.map.addMany([
                imgServiceLayer,
                imgServiceLayer1,
                imgServiceLayer2,
                imgServiceLayer3,
                imgServiceLayer4,
                imgServiceLayer5,
                imgServiceLayer6,
                imgServiceLayer7,
                imgServiceLayer8
              ]);

              that.state.layerList = new LayerList({
                view: that.state.view
              });
              // Adds widget below other elements in the top left corner of the view
              that.state.layerListExpand = new Expand({
                expandIconClass: "esri-icon-layers",
                expandTooltip: "Image Services for each year",
                view: that.state.view,
                content: that.state.layerList,
                expanded: false
              });
              that.state.view.ui.add(that.state.layerListExpand, "top-right");
              

              //const imgServiceChkBox = document.getElementById("imageService");
              //view.ui.add(imgServiceChkBox, "top-right");
              //   imgServiceChkBox.onchange = function() {
              //     if (imgServiceChkBox.checked) {
              //       map.add(imgServiceLayer);
              //     } else {
              //       map.remove(imgServiceLayer);
              //     }
              //   };

              that.state.view.when(() => {
                that.state.view
                  .whenLayerView(that.state.geoJSONLayer)
                  .then(layerView => {
                    that.state.geojsonLayerView = layerView;
                    that.state.handle = watchUtils.watch(
                      that.state.geojsonLayerView,
                      "updating",
                      () => {
                        //console.log("finished loading the layer!");
                        that.props.DataStore.setLoaded(
                          that.props.DataStore.loaded
                        );
                      }
                    );

                    that.state.view.extent = that.state.geoJSONLayer.fullExtent; // zoom to extent
                    //const start = new Date(2019, 4, 25);
                    const start = that.state.geoJSONLayer.timeInfo.fullTimeExtent.start;
                    const end = that.state.geoJSONLayer.timeInfo.fullTimeExtent.end;

                    that.state.timeSlider.fullTimeExtent = {
                      start: start,
                      end: end
                    };

                    that.state.timeSlider.values = [end, end];
                  })
                  .catch(err => console.log("failed in layerview ", err));
              });

              that.state.timeSlider.watch("timeExtent", function() {
                that.state.geoJSONLayer.definitionExpression =
                  //"Year <= " + timeSlider.timeExtent.end.getTime();
                  "Year <= " + that.state.timeSlider.timeExtent.end.getTime();

                that.state.geojsonLayerView.effect = {
                  filter: {
                    timeExtent: that.state.timeSlider.timeExtent,
                    geometry: that.state.view.extent
                  }
                  //excludedEffect: "grayscale(20%) opacity(12%)"
                };
              });
            }
          ) //end of module
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
        // this.props.DataStore.inputGeometry.length > 0
        //   ? console.log("extent", this.props.DataStore.inputGeometry)
        //   : console.log("no extent");

        let refreshVisibility = this.props.DataStore.clicked
          ? { visibility: "visible" }
          : { visibility: "hidden" };
        let loaderVisibility = this.props.DataStore.loaded
          ? { visibility: "hidden" }
          : { visibility: "visible" };

        return (
          <Row id="map">
            <Col md={12}>
              <div id="viewDiv" style={mD}>
                <div id="timeSlider"></div>

                
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
                    style={refreshVisibility}
                    onClick={this.onClickHandler}
                  >
                    Refresh
                    <img
                      src={process.env.PUBLIC_URL + "./icon-refresh.png"}
                      alt="refresh-icon"
                    ></img>
                  </button>

                  <Spinner animation="border" style={loaderVisibility} />
                </div>
                <button
                  id="resetBtn"
                  className="circular ui button"
                  style={filterVisibility}
                >
                  Reset
                </button>
              </div>
            </Col>
          </Row>
        );
      }
    }
  )
);

export default EsriMap;
