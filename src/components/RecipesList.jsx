import React from 'react';
import { Grid } from '@material-ui/core';
import RecipeCard from './RecipeCard.jsx';

const RecipesList = (props) => {

  return (
    <Grid container spacing={3} className="recipe-wrapper">
      { props.recipes.length
        ? props.recipes.map((result, index) => {
          return (
          <Grid item xs={6} sm={4}>
            <RecipeCard handleFavorite={props.handleFavorite} result={result} index={index}/>
          </Grid>
          );
        })
        : <p>Select ingredients you have on hand to see what you make!</p>
      }
    </Grid>

  );
}

export default RecipesList;