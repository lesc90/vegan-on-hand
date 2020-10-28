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

const RecipeCard = (props) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState("");

  const handleExpandClick = (index) => {
    if(selectedIndex === index) {
      setSelectedIndex("");
    } else {
      setSelectedIndex(index);
    }
  };
  return (
    <Card className={classes.root}>
      <a href={props.result.recipe.url} target="_blank" className="card-link">
        <CardHeader
          title={props.result.recipe.label}
          subheader={`See full recipe on ${props.result.recipe.source}`}
        />
      </a>
      <CardMedia
        className={classes.media}
        image={props.result.recipe.image}
        title={props.result.recipe.label}
      />
      <CardContent>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"
          onClick={props.handleFavorite ? (e) => props.handleFavorite(e, props.result) : ''}
        >
          <Favorite />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: props.index === selectedIndex,
          })}
          onClick={() => handleExpandClick(props.index)}
          aria-expanded={props.index === selectedIndex}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={props.index === selectedIndex} timeout="auto" unmountOnExit>
        <CardContent className="card-ingredients">
          <ul>
            <h4>Ingredients</h4>
            {props.result.recipe.ingredientLines.map(ingredient => {
              return (
                <li>{ingredient}</li>
              )
            })}
          </ul>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default RecipeCard;