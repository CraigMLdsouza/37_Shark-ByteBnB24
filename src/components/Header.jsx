import React, { useState, useEffect } from 'react';
import './header.css'; // Import your CSS file for styling

const AutoImageSlider = ({ images, interval }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [images, interval]);

  return (
    <div className="slider-container">
      <div className="image-slider">
        <img src={images[index]} alt={`Slide ${index}`} />
      </div>
    </div>
  );
};

// Usage example:
const images = [
  'https://via.placeholder.com/800x400?text=Image1',
  'https://via.placeholder.com/800x400?text=Image2',
  'https://via.placeholder.com/800x400?text=Image3',
  // Add more image URLs as needed
];

const Header = () => {
  return (
    <div className="app">
      <AutoImageSlider images={images} interval={3000} />
    </div>
  );
};

export default Header;
