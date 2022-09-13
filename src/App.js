
import Login from './views/Login';
import Home from './views/Home';
import Partenaire from './views/Partenaire';
import Structure from './views/Structure';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path="/login" element={ <Login/> } />
          <Route path='/partenaire/:email' element={ <Partenaire/> } />
          <Route path='/structure/:email' element={ <Structure/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
