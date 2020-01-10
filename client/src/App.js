import React from 'react';
import './App.css';
import { loadCss } from 'esri-loader'
import { loadMap } from './esriMap/'

class App extends React.Component {

  componentWillMount() {
    loadCss()
    loadMap()
  }
  render() {

    const mD = {
      width: "100%",
      height: "600px"
    }

    return (
      <div id="viewDiv" style={mD}></div>
    );
  }
}

export default App;
