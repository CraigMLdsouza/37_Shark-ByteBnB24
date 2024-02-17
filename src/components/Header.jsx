import React, { useState, useEffect, useRef } from 'react';
import './header.css';

const Header = () => {
  const images = [
    'https://via.placeholder.com/800x400?text=Image1',
    'https://via.placeholder.com/800x400?text=Image2',
    'https://via.placeholder.com/800x400?text=Image3',
    // Add more image URLs as needed
  ];

  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 3000);
    };

    const stopAutoPlay = () => {
      clearInterval(intervalRef.current);
    };

    startAutoPlay();

    return () => {
      stopAutoPlay();
    };
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollLeft = slider.clientWidth * index;
    }
  }, [index]);

  return (
    <div className="header">
      <div className="slider-container" ref={sliderRef}>
        <button className="nav-btn prev-btn" onClick={prevSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="image-slider">
          {images.map((image, i) => (
            <img
              key={i}
              src={image}
              alt={`Slide ${i}`}
              className={i === index ? 'active' : ''}
            />
          ))}
        </div>
        <button className="nav-btn next-btn" onClick={nextSlide}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      <div className="card-container">
        {[1, 2, 3, 4, 5].map((cardNumber) => (
          <div key={cardNumber} className="card">
            <h3>Card {cardNumber}</h3>
            <p>This is a stationary card.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
