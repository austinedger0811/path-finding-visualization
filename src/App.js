import GridContainer from './Components/GridContainer'
import NavBar from './Components/NavBar'
import './App.css';

function App() {

  return (
    <div className="App">
      <NavBar />
      <GridContainer rows={40} colums={40}/>
    </div>
  );
}

export default App;
