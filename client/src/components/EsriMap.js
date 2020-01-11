import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import { loadModules } from "esri-loader";
import { loadCss } from "esri-loader";
import { observer, inject } from 'mobx-react'

const EsriMap = inject("DataStore")(observer(
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
        if(that.props.DataStore.county.length > 0){
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

        const url = "http://belan2.esri.com:8080/almeda.geojson";

        const template = {
          title: "{OBJECTID}",
          content:
            "Shape length of county is {Shape_Length} and shape area is {Shape_Area}"
        };

        const geoJSONLayer = new GeoJSONLayer({
          url: url,
          popupTemplate: template,
          renderer: renderer
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
          container: "timeSliderDiv",
          view: view,
          // show data within a given time range
          // in this case data within one year
          mode: "time-window",
          fullTimeExtent: {
            // entire extent of the timeSlider
            start: new Date(2000, 0, 1),
            end: new Date(2010, 0, 1)
          },
          values: [
            // location of timeSlider thumbs
            new Date(2000, 0, 1),
            new Date(2001, 1, 1)
          ]
        });
        view.ui.add(timeSlider, "manual");

        var featureCount = document.getElementById("feature-count");
        var county = document.getElementById("county");
        var selectCountyTitle = document.getElementById("select-county-title");
        const filterBtn = document.getElementById("filterBtn");
        const txtBox = document.getElementById("txtBox");

        view.ui.add(filterBtn, "top-right");
        view.ui.add(txtBox, "top-right");
        //view.ui.add(featureCount, "top-right");
        //view.ui.add(selectCountyTitle, "top-right");
        //view.ui.add(county, "top-right");

        filterBtn.onclick = function(){
          geojsonLayerView.filter = {
            where: txtBox.value
          }
        };

        view.when(()=> {
          view.whenLayerView(geoJSONLayer)
            .then((layerView) => {
              geojsonLayerView = layerView;
              handle = watchUtils.watch(geojsonLayerView, 'updating', ()=> {
                  console.log('finished loading the layer!');
              });
            })
            .catch(err => console.log('failed in layerview ', err));
        });

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

  render() {
    const mD = {
      width: "100%",
      height: "600px"
    };
    let definitionExpression;
    let filterVisibility = {};
    if(this.props.DataStore.where.length > 0) {
      filterVisibility = {visibility: 'visible'};
      definitionExpression = this.props.DataStore.where;
    } else {
      filterVisibility = {visibility: 'hidden'};
      definitionExpression = '';
    }
    console.log('county ', this.props.DataStore.county);

    return (
      <Row id="map">
        <Col md={12}>
          <div id="viewDiv" style={mD}>
            <button id="filterBtn" className="esri-widget" style={filterVisibility}>Filter</button>
            <input type="text" id="txtBox" className="esri-widget" style={{visibility: filterVisibility.visibility, backgroundColor: '#FFFFFF'}} value={definitionExpression} readOnly></input>
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
            <div id="timeSliderDiv"></div>
          </div>
          
        </Col>
      </Row>
    );
  }
}))

export default EsriMap;
