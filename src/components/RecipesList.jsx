import React from 'react';

const RecipesList = (props) => {

  return (
    <React.Fragment>
      {props.recipes.length
        ? props.recipes.map(result => {
            return <p>{result.recipe.label}</p>
          })
        : <p>Select Ingredients to begin</p>
      }
    </React.Fragment>
  );
}

export default RecipesList;


