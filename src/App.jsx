import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import MarketPlace from './pages/MarketPlace';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CompanyProfile from './pages/CompanyProfile';
import ProductDetails from './pages/ProductDetails'; // Import the ProductDetails component
import ProductListing from './pages/ProductListing';

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/market" element={<MarketPlace />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/product-listing" element={<ProductListing />} />
          {/* Add the new route for product details */}
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/" element={<div>Home Page Content</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
