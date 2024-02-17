import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CompanyProfile from './pages/CompanyProfile'; // Import the CompanyProfile component

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/" element={<div>Home Page Content</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
