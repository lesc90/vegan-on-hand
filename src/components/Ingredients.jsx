import React, { useState, useEffect } from 'react';
import { Grid, Button, Paper } from '@material-ui/core';
import axios from 'axios';
import { EDAMAM_API_KEY, APP_ID } from '../config/edamam.js';
import ingredients from '../data/ingredients.js';
import RecipesList from './RecipesList.jsx';

const Ingredients = () => {

  const [selectedIngredients, setIngredients] = useState([]);
  const [ingredientsList] = useState(ingredients);
  const [recipes, setRecipes] = useState([]);
  let searchString = '';

  let updateSearchString = () => {
    selectedIngredients.forEach(item => {
      searchString += `${item.replace(/\s+/g, '-').toLowerCase()},`
    })
  }

  let handleClick = () => {
    updateSearchString()
    let url = `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${EDAMAM_API_KEY}&health=vegan`;
    axios.get(url)
      .then(result => {
        setRecipes(result.data.hits)
      })
      .catch(err => {
        console.error(err)
      })
  }

  let toggleSelect = (e) => {
    e.target.classList.toggle('selected');
    if (selectedIngredients.indexOf(e.target.innerText) === -1) {
      setIngredients([...selectedIngredients, e.target.innerText])
    } else {
      let ingredientsCopy = [...selectedIngredients];
      ingredientsCopy.splice(selectedIngredients.indexOf(e.target.innerText), 1);
      setIngredients(ingredientsCopy)
    }
  }

  let handleClose = (e, index) => {
    let ingredientsCopy = [...selectedIngredients];
    ingredientsCopy.splice(index, 1);
    setIngredients(ingredientsCopy);
    let ingredients = document.querySelectorAll('.ingredient');
    ingredients.forEach(item => {
      if(item.innerText === selectedIngredients[index]) {
        item.classList.toggle('selected');
      }
    })
  }

  return (
    <React.Fragment>
      <h4>Start by selecting the ingredients you have on hand: </h4>
      <Grid container>
        <Grid container sm={2} className="ingredients-sidebar">
          <Grid item>
          <h4>Your selected ingredients</h4>
            { selectedIngredients.length
              ? <ul>
                  {selectedIngredients.map((ingredient, index) => {
                    return <li>{ingredient}<span className="close" onClick={(e) => handleClose(e, index)}>X</span></li>;
                  })}
                </ul>
              : <p>No ingredients selected</p>
            }
          </Grid>
        </Grid>
        <Grid container sm={10} className="ingredients-grid">
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
                  }}>{ingredient}</Paper>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        className="see-recipes">See what you can make!</Button>
      <RecipesList recipes={recipes} />
    </React.Fragment>
  )
}

export default Ingredients;