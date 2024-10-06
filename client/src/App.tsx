// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import About from './pages/About/About';
import Locations from './pages/Locations/Locations';
import Header from './components/Header/Header';
import Authentication from './pages/Authentification/Authentication';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import GalleryAdminForm from './pages/GalleryAdminForm/GalleryAdminForm';
import AdminUsers from './pages/AdminUsers/AdminUsers';
import ThumbnailGalleryItem from './components/ThumbnailGalleryItem/ThumbnailGalleryItem';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gallery" element={<GalleryAdminForm />} />
          <Route path="/gallery/:id" element={<ThumbnailGalleryItem />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
