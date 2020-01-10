import React from 'react';
import './App.css';
import { loadCss } from 'esri-loader'
import { loadMap } from './esriMap/'
import MainHeader from './components/MainHeader';

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
      <div>
        <MainHeader />
        <div id="viewDiv" style={mD}></div>
      </div>
      
    );
  }
}

export default App;
