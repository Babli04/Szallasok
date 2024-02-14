// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import MainContent from './MainContent';
import Admin from './Admin';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        {isLoggedIn ? <Route path="/admin" element={<Admin />} /> : null}
      </Routes>
    </Router>
  );
}

export default App;
