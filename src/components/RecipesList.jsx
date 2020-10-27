import React from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button } from '@material-ui/core';

const RecipesList = (props) => {

  return (
    <React.Fragment>
      {props.recipes.length
        ? props.recipes.map(result => {
            return (
              <Card className="recipe-card">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={result.recipe.image}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <h4>
                      {result.recipe.label}
                    </h4>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    See Recipe
                  </Button>
                </CardActions>
              </Card>
            )
          })
        : <p>Select Ingredients to begin</p>
      }
    </React.Fragment>
  );
}

export default RecipesList;


