import React, { useRef } from 'react'
import GridContainer from './Components/GridContainer'
import NavBar from './Components/NavBar'

import {OptionsProvider} from './Context/OptionsContext'

import './App.css';

function App() {

  const containerRef = useRef(null);

  const handleRunVisualizationClick = () => {
    if (containerRef?.current) containerRef.current.animateAlgorithm();
  };

  const handleResetClick = () => {
    if (containerRef?.current) containerRef.current.reset();
  };

  return (
    <OptionsProvider>
      <div className="App">
        <NavBar handleRunVisualizationClick={handleRunVisualizationClick} handleResetClick={handleResetClick} />
        <GridContainer ref={containerRef} rows={40} colums={40} />
      </div>
    </OptionsProvider>
  );
}

export default App;
