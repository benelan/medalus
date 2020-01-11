import React from 'react';
import './App.css';
import { loadCss } from 'esri-loader'
import { loadMap } from './esriMap/'
import MainHeader from './components/MainHeader';
import UserInputForm from './components/UserInputForm';

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
      <div>
        <MainHeader onClick={this.toggleNavbar} collapsed={this.state.collapsed}/>
        <div id="viewDiv" style={mD}></div>
        <div className="ui equal width center aligned grid">
          <div className="row" style={{backgroundColor: '#869D05', color: '#FFFFFF'}}>
            <div className="column">Divider</div>
              <div className="column">
              <div className="ui segment" style={{backgroundColor: '#D0CFD4'}}>
                <UserInputForm />
              </div>
            </div>
          </div>
        </div>
        <div className="ui tow column centered grid">
        </div>
        
        
      </div>
      
    );
  }
}

export default App;
