import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, Grid, AppBar, Toolbar, makeStyles, IconButton } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import useStyles from '../styles/style';


function MainPage() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [favoritePosts, setFavoritePosts] = useState([]);
  
  useEffect(() => {
    fetchPosts();
    // Load favorite posts from local storage
    const storedFavoritePosts = localStorage.getItem('favoritePosts');
    if (storedFavoritePosts) {
      setFavoritePosts(JSON.parse(storedFavoritePosts));
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const postsData = response.data;

      const userIds = postsData.map((post) => post.userId);
      const uniqueUserIds = [...new Set(userIds)];
      const authorPromises = uniqueUserIds.map((userId) =>
        axios.get(`https://jsonplaceholder.typicode.com/users?id=${userId}`)
      );

      const authorResponses = await Promise.all(authorPromises);
      const authorsData = authorResponses.map((response) => response.data[0]);

      const postsWithAuthor = postsData.map((post) => {
        const author = authorsData.find((author) => author.id === post.userId);
        return { ...post, author };
      });

      setPosts(postsWithAuthor);
    } catch (error) {
      console.log('Error fetching posts:', error);
    }
  };

  const addToFavorites = (post) => {
    // Check if the post already exists in favoritePosts
    const postExists = favoritePosts.some((favoritePost) => favoritePost.id === post.id);
  
    let updatedFavoritePosts;
  
    if (postExists) {
      // Remove the post from favoritePosts
      updatedFavoritePosts = favoritePosts.filter((favoritePost) => favoritePost.id !== post.id);
      setFavoritePosts(updatedFavoritePosts);
    } else {
      // Add the post to favoritePosts
      updatedFavoritePosts = [...favoritePosts, post];
      setFavoritePosts(updatedFavoritePosts);
    }
  
    // Store favoritePosts in local storage
    localStorage.setItem('favoritePosts', JSON.stringify(updatedFavoritePosts));
  };

  const isPostLiked = (post) => {
    return favoritePosts.some((favoritePost) => favoritePost.id === post.id);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.header}>
          <Typography variant="h6" component={Link} to="/" className={classes.title}>
            My Blog
          </Typography>
          <Typography variant="h6" component={Link} to="/favorites" className={classes.title}>
            Favorites
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" gutterBottom>
        Blog Posts
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="h2" className={classes.postTitle}>
                  <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {post.title}
                  </Link>
                </Typography>
                <Typography variant="subtitle2" className={classes.author}>
                  Author: {post.author?.name}
                </Typography>
                <Typography variant="body2" className={classes.postBody}>
                  {post.body}
                </Typography>
              </CardContent>
              <IconButton onClick={() => addToFavorites(post)} aria-label="Add to favorites">
                {isPostLiked(post) ? <Favorite color="secondary" /> : <FavoriteBorder />}
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default MainPage;