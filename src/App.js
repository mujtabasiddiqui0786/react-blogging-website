import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import BlogPost from './components/blogPost';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/post/:postId" element={<BlogPost />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        {/* Add more routes for other pages */}
      </Routes>
    </Router> 
  );
}

export default App;
