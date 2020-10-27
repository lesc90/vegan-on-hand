import React from 'react';
import { Container } from '@material-ui/core';
import Ingredients from './Ingredients.jsx';


function App() {

  return (
    <React.Fragment>
      <h2 className="welcome">Welcome to Vegan On Hand</h2>
      <Container maxWidth="md">
        <Ingredients />
      </Container>
    </React.Fragment>
  );
}

export default App;

