
import Login from './views/Login';
import Home from './views/Home';
import Partenaire from './views/Partenaire';
import Structure from './views/Structure';
import Structures from './views/Structures';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

/*
  On utilise les mêmes vues que ce soit pour un utilisateur admin ou non-admin.
  Les vues sont accédées avec en props des droits spécifiques : full pour admin et read pour partenaire/structure
  qui ne peuvent que lire les données (read-only)
*/

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={ <Home rights="full"/> } />
          <Route path="/login" element={ <Login/> } />
          <Route path='/partenaire/:email' element={ <Partenaire rights="full"/> } /> 
          <Route path='/structure/:email' element={ <Structure rights="full"/> } />
          <Route path='/structures' element={ <Structures/>} />
          <Route path='/partenaire-notadmin' element={ <Partenaire rights="read"/> } />
          <Route path='/structure-notadmin/:email' element={ <Structure rights="read"/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
