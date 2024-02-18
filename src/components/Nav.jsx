import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './nav.css';

const Nav = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => handleNavigate('/')}>Your Logo</div>
      <ul className="nav-links">
        <li><NavLink to="/" activeClassName="active" end>Home</NavLink></li>
        <li><NavLink to="/esg" activeClassName="active">ESG Ratings</NavLink></li>
        <li><NavLink to="/market" activeClassName="active">Market</NavLink></li>
        <li><NavLink to="/product-listing" activeClassName="active">Product Listing</NavLink></li>
        <li><NavLink to="/company-profile" activeClassName="active">Company Profile</NavLink></li>
        <li><NavLink to="/signup" activeClassName="active">Sign Up</NavLink></li> {/* Add Sign Up link */}
        <li><NavLink to="/login" activeClassName="active">Login</NavLink></li> {/* Add Login link */}
      </ul>
    </nav>
  );
};

export default Nav;
