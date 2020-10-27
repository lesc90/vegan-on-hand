import React, { useState, useEffect } from 'react';
import { Grid, Button, Paper } from '@material-ui/core';
import axios from 'axios';
import {EDAMAM_API_KEY, APP_ID } from '../config/edamam.js';
let url = `https://api.edamam.com/search?q=tofu&app_id=${APP_ID}&app_key=${EDAMAM_API_KEY}&health=vegan`;

const Ingredients = () => {

  const [selectedIngredients, setIngredients] = useState({});
  const [ingredientsList] = useState(['Beans', 'Tofu', 'Tomatoes', 'Potatoes', 'Sweet Potatoes', 'Rice', 'Pasta', 'Tortillas', 'Bread', 'Bell Pepper', 'Cabbage', 'Broccoli', 'Cauliflower', 'Lettuce', 'Avocado', 'Chickpeas', 'Hummus', 'Squash', 'Carrots', 'Cucumbers', 'Nuts', 'Quinoa']);
  const [recipes, setRecipes] = useState({});

  let handleClick = () => {
    // map over selected ingredients and built URL with queries
    // get data from API
    // axios.get(url)
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })
    console.log('clicked!');
  }

  let toggleSelect = (e) => {
    e.target.classList.toggle('selected');
    if (!selectedIngredients[e.target.innerText]) {
      setIngredients(selectedIngredients, selectedIngredients[e.target.innerText] = true)
    } else {
      setIngredients(selectedIngredients, delete selectedIngredients[e.target.innerText])
    }
  }

  return (
    <React.Fragment>
      <h4>Start by selecting the ingredients you have on hand</h4>
      <Grid container spacing={3}>
        {ingredientsList.map(ingredient => {
          return (
            <Grid item xs={2}>
              <Paper className='ingredient' onClick={toggleSelect}>{ingredient}</Paper>
            </Grid>
          )
        })}
      </Grid>
      <Button color="primary" onClick={(e) => toggleSelect(e)}>See Recipes</Button>
    </React.Fragment>
  )
}

export default Ingredients;