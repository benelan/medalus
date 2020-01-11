import React from 'react';
import './App.css';
import { loadCss } from 'esri-loader'
import { loadMap } from './esriMap/'
import MainHeader from './components/MainHeader';
import UserInputForm from './components/UserInputForm';
import About from './components/About';

class App extends React.Component {

  state = {collapsed: true};

  toggleNavbar = () => {
    this.setState({collapsed: !this.state.collapsed});
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
        <MainHeader onClick={this.toggleNavbar} collapsed={this.state.collapsed}/>
        <div id="viewDiv" style={mD}>
        <button id="feature-count" class="esri-widget">Number of Features</button>
        </div>
        <UserInputForm />
        <About />
        </React.Fragment>
    );
  }
}

export default App;
