import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import Ingredients from './Ingredients.jsx';
import Favorites from './Favorites.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [favorites, setFavorites] = useState([]);

  const handleFavorite = (e, result) => {
    e.currentTarget.classList.toggle('active');
    if(favorites.indexOf(result) === -1) {
      setFavorites([...favorites, result]);
    } else {
      let favCopy = [...favorites];
      favCopy.splice(favorites.indexOf(result), 1);
      setFavorites(favCopy);
    }
  }

  return (
    <React.Fragment>

      <Router>
      <header className="welcome">
        <Container maxWidth="lg">
          <h2><Link to="/">Vegan On Hand</Link></h2>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
              <li>
                <a href="https://github.com/lesc90/vegan-on-hand" target="_blank">View on Github</a>
              </li>
            </ul>
          </nav>
        </Container>
      </header>
          <Switch>
            <Route path="/favorites">
              <Container maxWidth="lg">
                <Favorites favorites={favorites}/>
              </Container>
            </Route>
            <Route path="/">
              <Container maxWidth="lg">
                <Ingredients handleFavorite={handleFavorite}/>
              </Container>
            </Route>
          </Switch>
      </Router>

    </React.Fragment>
  );
}

export default App;

