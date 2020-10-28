import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import RecipeCard from './RecipeCard.jsx';

const Favorites = (props) => {

  return (
    <React.Fragment>
      <h2>Your Favorites</h2>
      <Grid container spacing={3} className="recipe-wrapper">

        { props.favorites.length
          ? props.favorites.map((result, index) => {
            return (
            <Grid item xs={6} sm={4}>
              <RecipeCard result={result} index={index} />
            </Grid>
            );
          })
          : <p>Select ingredients you have on hand to see what you make!</p>
        }
      </Grid>
    </React.Fragment>
  )
}

export default Favorites;