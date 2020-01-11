import React from 'react';
import './App.css';
import { loadCss } from 'esri-loader'
import { loadMap } from './esriMap/'
import NavBar from './components/NavBar';
import UserInputForm from './components/UserInputForm';
import About from './components/About';

class App extends React.Component {

  state = { collapsed: true };

  toggleNavbar = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

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
      <React.Fragment>
        <NavBar onClick={this.toggleNavbar} collapsed={this.state.collapsed} />
        <div id="viewDiv" style={mD}></div>
        <UserInputForm />
        <About />
      </React.Fragment>
    );
  }
}

export default App;
