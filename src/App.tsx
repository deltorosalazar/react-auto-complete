import React from 'react';
import './App.css';
import Autocomplete from './components/autocomplete/autocomplete';
import Header from './components/header/header';

function App() {
  return (
    <div className="App">
      <div className="autocomplete-component">
        <Header />
        <Autocomplete />
      </div>
    </div>
  );
}

export default App;
