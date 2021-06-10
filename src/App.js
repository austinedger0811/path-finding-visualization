import GridContainer from './Components/GridContainer'
import NavBar from './Components/NavBar'

import {OptionsProvider} from './Context/OptionsContext'

import './App.css';

function App() {

  return (
    <OptionsProvider>
      <div className="App">
        <NavBar />
        <GridContainer rows={40} colums={40}/>
      </div>
    </OptionsProvider>
  );
}

export default App;
