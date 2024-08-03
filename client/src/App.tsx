// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import About from './pages/About/About';
import Locations from './pages/Locations/Locations';
import Header from './components/Header/Header';

import { Button } from '@mui/material';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Button variant="contained" color="primary">
        Hello World
      </Button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
