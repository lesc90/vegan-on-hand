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
    setFavorites([...favorites, result])
  }

  return (
    <React.Fragment>

      <Router>
      <header className="welcome">
        <Container maxWidth="lg">
          <h2><a href="/">Vegan On Hand</a></h2>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
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

