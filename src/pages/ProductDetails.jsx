import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import firestore from '../firebase'; // Make sure to import your Firestore configuration

const ProductDetails = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDocRef = doc(firestore, 'products', productId); // 'products' is the collection name

        const productDocSnapshot = await getDoc(productDocRef);

        if (productDocSnapshot.exists()) {
          const data = productDocSnapshot.data();
          setProductDetails(data);
        } else {
          console.log('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!productDetails) {
    // Render loading state or handle the case where details are not loaded yet
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Product Details</h2>
      <p>Product ID: {productId}</p>
      <p>Origin: {productDetails.origin}</p>
      <p>Labor Practices: {productDetails.laborPractices}</p>
      <p>Environmental Footprint: {productDetails.environmentalFootprint}</p>
    </div>
  );
};

export default ProductDetails;
