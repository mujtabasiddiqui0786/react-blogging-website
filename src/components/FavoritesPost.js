import React, { useEffect, useState } from 'react';
import { Typography, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // Styles for the page
}));

const FavoritesPost = () => {
  const classes = useStyles();
  const [favoritePosts, setFavoritePosts] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoritePosts')) || [];
    setFavoritePosts(storedFavorites);
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Favorite Blog Posts
      </Typography>
      {favoritePosts.length === 0 ? (
        <Typography variant="body1">No favorite posts found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {favoritePosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              {/* Render your favorite blog post component */}
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default FavoritesPost;