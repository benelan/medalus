import React from 'react';
import NavBar from './components/NavBar';
import UserInputForm from './components/UserInputForm';
import About from './components/About';
import EsriMap from './components/EsriMap';

const App = () => {
    return (
      <React.Fragment>
        <NavBar />
        {/*<EsriMap />*/}
        <UserInputForm />
        <About />
      </React.Fragment>
    );
  }

export default App;
