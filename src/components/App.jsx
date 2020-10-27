import React from 'react';
import { Button, Container } from '@material-ui/core';
import Ingredients from './Ingredients.jsx';

function App() {
  return (
    <React.Fragment>
      <Container>
        <h2>Welcome to Vegan On Hand</h2>
        <Ingredients />
        <Button color="primary">See Recipes</Button>
      </Container>
    </React.Fragment>
  );
}

export default App;

