import React, { useState, useEffect } from 'react';
import { Grid, Button, Paper, makeStyles } from '@material-ui/core';
import axios from 'axios';
// import { EDAMAM_API_KEY, APP_ID } from '../config/edamam.js';
import ingredients from '../data/ingredients.js';
import RecipesList from './RecipesList.jsx';
require('dotenv').config()
const EDAMAM_API_KEY = process.env.EDAMAM_API_KEY;
const APP_ID = process.env.APP_ID;


const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    outline: '1px solid #fff',
    outlineOffset: '-4px'
  },
  label: {
    textTransform: 'capitalize',
  },
});

const Ingredients = (props) => {

  const [selectedIngredients, setIngredients] = useState([]);
  const [ingredientsList] = useState(ingredients);
  const [recipes, setRecipes] = useState([]);
  let searchString = '';
  const classes = useStyles();

  let updateSearchString = () => {
    selectedIngredients.forEach(item => {
      searchString += `${item.replace(/\s+/g, '-').toLowerCase()}+`
    })
  }

  let handleClick = () => {
    updateSearchString()
    let url = `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${EDAMAM_API_KEY}&health=vegan&to=15`;
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
      <h4 className="ingredients-header">Select the ingredients you have on hand: </h4>
      <Grid container>
        <Grid container md={2} className="ingredients-sidebar">
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
        <Grid container md={10} className="ingredients-grid">
          {ingredientsList.map((ingredient, index) => {
            let imgUrl = `https://vegan-on-hand.s3.us-east-2.amazonaws.com/${ingredient.replace(/\s+/g, '-').toLowerCase()}.jpg`
            return (
              <Grid item md={2} sm={3} xs={4} className='ingredient-wrapper' key={index}>
                {ingredient}
                <div className="paper-wrapper">
                <Paper
                  onClick={toggleSelect}
                  className='ingredient'
                  style={{
                    'background': `url(${imgUrl}) no-repeat center center`,
                    'backgroundSize': 'cover'
                  }}>{ingredient}</Paper>
                </div>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
      <Button
        classes={{
          root: classes.root,
          label: classes.label,
        }}
        variant="contained"
        color="primary"
        onClick={handleClick}
        className="see-recipes">See what you can make!</Button>
      <RecipesList recipes={recipes} handleFavorite={props.handleFavorite}/>
    </React.Fragment>
  )
}

export default Ingredients;