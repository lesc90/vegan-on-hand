import React, { useState, useEffect } from 'react';
import { Grid, Button, Paper } from '@material-ui/core';
import axios from 'axios';
import { EDAMAM_API_KEY, APP_ID } from '../config/edamam.js';
import data from '../data/dummyData.js';
import ingredients from '../data/ingredients.js';
import RecipesList from './RecipesList.jsx';

const Ingredients = () => {

  const [selectedIngredients, setIngredients] = useState({});
  const [ingredientsList] = useState(ingredients);
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
      <h4>Start by selecting the ingredients you have on hand: </h4>
      <Grid container spacing={3}>
        {ingredientsList.map(ingredient => {
          let imgUrl = `https://vegan-on-hand.s3.us-east-2.amazonaws.com/${ingredient.replace(/\s+/g, '-').toLowerCase()}.jpg`
          return (
            <Grid item xs={2} className='ingredient-wrapper'>
              {ingredient}
              <Paper
                className='ingredient'
                onClick={toggleSelect}
                style={{
                  'background': `url(${imgUrl}) no-repeat center center`,
                  'background-size': 'cover'
                }}></Paper>
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