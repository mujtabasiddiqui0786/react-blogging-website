import React, { useState, useEffect } from 'react';
import { Typography, Grid, makeStyles, AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
  },
}));

const FavoritesPage = () => {
  const classes = useStyles();
  const [favoritePosts, setFavoritePosts] = useState([]);

  useEffect(() => {
    const storedPosts = localStorage.getItem('favoritePosts');
    if (storedPosts) {
      setFavoritePosts(JSON.parse(storedPosts));
    }
  }, []);

  const handleUnlike = (postId) => {
    const updatedPosts = favoritePosts.filter((post) => post.id !== postId);
    setFavoritePosts(updatedPosts);
    localStorage.setItem('favoritePosts', JSON.stringify(updatedPosts));
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.header}>
          <Typography variant="h6" className={classes.title}>
            My Blog
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" gutterBottom>
        Favorites
      </Typography>
      {favoritePosts.length > 0 ? (
        <Grid container spacing={2}>
          {favoritePosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <div>
                <Typography variant="h5" component="h2">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {post.body}
                </Typography>
                <Button variant="outlined" color="secondary" onClick={() => handleUnlike(post.id)}>
                  Unlike
                </Button>
              </div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">You haven't liked any posts yet.</Typography>
      )}
    </div>
  );
};

export default FavoritesPage;
