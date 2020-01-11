<<<<<<< HEAD
import React from 'react';
import './App.css';
import { loadCss } from 'esri-loader'
import { loadMap } from './esriMap/'
import NavBar from './components/NavBar';
import UserInputForm from './components/UserInputForm';
import About from './components/About';

class App extends React.Component {

=======
import React from "react";
import "./App.css";
import { loadCss } from "esri-loader";
import { loadMap } from "./esriMap/";
import MainHeader from "./components/MainHeader";
import UserInputForm from "./components/UserInputForm";
import About from "./components/About";

class App extends React.Component {
>>>>>>> dropdown
  state = { collapsed: true };

  toggleNavbar = () => {
    this.setState({ collapsed: !this.state.collapsed });
<<<<<<< HEAD
  }
=======
  };
>>>>>>> dropdown

  componentWillMount() {
    loadCss();
    loadMap();
  }
  render() {
    const mD = {
      width: "100%",
      height: "600px"
    };

    return (
      <React.Fragment>
<<<<<<< HEAD
<<<<<<< HEAD
        <MainHeader onClick={this.toggleNavbar} collapsed={this.state.collapsed}/>
=======
        <MainHeader
          onClick={this.toggleNavbar}
          collapsed={this.state.collapsed}
        />
>>>>>>> dropdown
        <div id="viewDiv" style={mD}>
          <button id="feature-count" class="esri-widget">
            Number of Features
          </button>
          <span id="select-county-title">Select a county:</span>
          <br />
          <select id="county" class="esri-select">
            <option value="San Bernardino">San Bernardino</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="San Francisco">San Francisco</option>
            <option value="Santa Clara">Santa Clara</option>
            <option value="San Diego">San Diego</option>
          </select>
        </div>
=======
        <NavBar onClick={this.toggleNavbar} collapsed={this.state.collapsed} />
        <div id="viewDiv" style={mD}></div>
>>>>>>> refs/remotes/origin/master
        <UserInputForm />
        <About />
      </React.Fragment>
    );
  }
}

export default App;
