import React from 'react';
import NavBar from './components/NavBar';
import UserInputForm from './components/UserInputForm';
import About from './components/About';
import EsriMap from './components/EsriMap';
import { Provider } from 'mobx-react'
import DataStore from './store/DataStore'
import Hero from './components/Hero';
import Desert from './components/Desertification'
import Videos from './components/Videos';

const App = () => {
  return (
    <Provider DataStore={DataStore}>
      <NavBar />
      <EsriMap />
      <UserInputForm />
      <Desert />
      <Hero />
      <About />
      <Videos />
    </Provider>
  );
}

export default App;
