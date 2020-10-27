import React from 'react';
import { Container } from '@material-ui/core';
import Ingredients from './Ingredients.jsx';


function App() {

  return (
    <React.Fragment>
      <Container>
        <h2 className="welcome">Welcome to Vegan On Hand</h2>
        <Ingredients />

      </Container>
    </React.Fragment>
  );
}

export default App;

