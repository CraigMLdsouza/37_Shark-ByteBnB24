import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import firestore from '../firebase';
import './MarketPlace.css'; // Import the CSS file for styles

const MarketPlace = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(firestore, 'products');
        const productsSnapshot = await getDocs(productsCollection);

        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort products based on finalMetric in descending order
        productsData.sort((a, b) => b.finalMetric - a.finalMetric);

        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const getColorClass = (finalMetric) => {
    const metricValue = parseInt(finalMetric, 10);

    if (metricValue >= 60) {
      return 'green-card';
    } else if (metricValue >= 40 && metricValue < 60) {
      return 'orange-card';
    } else {
      return 'red-card';
    }
  };

  return (
    <div className="marketplace-container">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className={`marketplace-card ${getColorClass(product.finalMetric)}`}
        >
          <img src={product.image} alt={product.name} />
          <div className="card-details">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            {/* Additional information here */}
            <p>Final Metric: {product.finalMetric}</p>
            <p>Other Field: {product.otherField}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MarketPlace;
