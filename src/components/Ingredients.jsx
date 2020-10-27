import React, { useState, useEffect } from 'react';
import { Grid, Button, Paper } from '@material-ui/core';
import axios from 'axios';
import {EDAMAM_API_KEY, APP_ID } from '../config/edamam.js';
import "../data/dummyData.js";
import RecipesList from './RecipesList.jsx';

const Ingredients = () => {

  const [selectedIngredients, setIngredients] = useState({});
  const [ingredientsList] = useState(['Beans', 'Tofu', 'Tomatoes', 'Potatoes', 'Sweet Potatoes', 'Rice', 'Pasta', 'Tortillas', 'Bread', 'Bell Pepper', 'Cabbage', 'Broccoli', 'Cauliflower', 'Lettuce', 'Avocado', 'Chickpeas', 'Hummus', 'Squash', 'Carrots', 'Cucumbers', 'Nuts', 'Quinoa', 'Lentils', 'Plant Milk', 'Onions', 'Garlic']);
  const [recipes, setRecipes] = useState(data.hits);

  let searchString = ''
  let updateSearchString = () => {
    let ingredients = Object.keys(selectedIngredients);
    ingredients.forEach(item => {
      searchString += `${item.replace(/\s+/g, '-').toLowerCase()},`
    })
  }

  let handleClick = () => {
    updateSearchString()
    let url = `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${EDAMAM_API_KEY}&health=vegan`;
    axios.get(url)
      .then(result => {
        console.log(result.data.hits)
        setRecipes(result.data.hits)
      })
      .catch(err => {
        console.error(err)
      })
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        className="see-recipes">See Recipes</Button>
      <RecipesList recipes={recipes} />
    </React.Fragment>
  )
}

export default Ingredients;