import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton
} from '@material-ui/core';
import { Favorite, ExpandMore} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: '20px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
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

    <React.Fragment>
      { props.recipes.length
        ? props.recipes.map((result, index) => {
          return (
          <Card className={classes.root}>
            <CardHeader
              title={result.recipe.label}
              subheader={result.recipe.source}
            />
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
          );
        })
        : <p>Select ingredients</p>
      }
    </React.Fragment>

  );
}

export default RecipesList;