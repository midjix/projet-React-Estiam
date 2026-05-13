import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateArticle from './pages/CreateArticle';
import EditArticle from './pages/EditArticle';
import MyArticles from './pages/MyArticles';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={
          <ProtectedRoute>
            <CreateArticle />
          </ProtectedRoute>
          } />
        <Route path="/edit/:id" element={
          <ProtectedRoute>
            <EditArticle />
          </ProtectedRoute>
          } />
        <Route path="/my-articles" element={
          <ProtectedRoute>
            <MyArticles />
          </ProtectedRoute>
          } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </>
  )
}

export default App
