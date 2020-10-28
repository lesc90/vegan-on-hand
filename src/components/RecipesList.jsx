import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton
} from '@material-ui/core';
import { Favorite, ExpandMore, Share } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: '20px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
}));

const RecipesList = (props) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState("");

  const handleExpandClick = (index) => {
    console.log(index)
    if(selectedIndex === index) {
      setSelectedIndex("");
    } else {
      setSelectedIndex(index);
    }
  };

  return (

    <Grid container spacing={3} className="recipe-wrapper">
      { props.recipes.length
        ? props.recipes.map((result, index) => {
          return (
          <Grid item xs={6} sm={4}>

            <Card className={classes.root}>
              <a href={result.recipe.url} target="_blank" className="card-link">
                <CardHeader
                  title={result.recipe.label}
                  subheader={`See full recipe on ${result.recipe.source}`}
                />
              </a>
              <CardMedia
                className={classes.media}
                image={result.recipe.image}
                title={result.recipe.label}
              />
              <CardContent>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <Favorite />
                </IconButton>
                <IconButton aria-label="share">
                  <Share />
                </IconButton>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: index === selectedIndex,
                  })}
                  onClick={() => handleExpandClick(index)}
                  aria-expanded={index === selectedIndex}
                  aria-label="show more"
                >
                  <ExpandMore />
                </IconButton>
              </CardActions>
              <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
                <CardContent className="card-ingredients">
                  <ul>
                    <h4>Ingredients</h4>
                    {result.recipe.ingredientLines.map(ingredient => {
                      return (
                        <li>{ingredient}</li>
                      )
                    })}
                  </ul>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
          );
        })
        : <p>Select ingredients you have on hand to see what you make!</p>
      }
    </Grid>

  );
}

export default RecipesList;