import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, Grid, AppBar, Toolbar, makeStyles, IconButton } from '@material-ui/core';

import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

function BlogPost() {
    const { postId } = useParams(); // <-- Add this line to use the useParams hook
    const [post, setPost] = useState(null);
  
    useEffect(() => {
      fetchPost();
    }, []);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.log('Error fetching post:', error);
    }
  };

  if (!post) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {post.body}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default BlogPost;