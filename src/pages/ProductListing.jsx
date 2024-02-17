import React, { useState } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from '../firebase'; // Assuming auth is a custom hook for authentication

const packagingMaterialsOptions = [
  'Cardboard boxes',
  'Corrugated boxes',
  'Glass Containers',
  'Shrink Wrap',
  'Cling Film',
  'Woven Sack',
  'Jute Bags',
  'Intermediate Bulk Containers',
  'Paper Bags',
  'Bubble Wrap',
  'Corrugated Fiber Board',
  'Wooden Containers',
  'Adhesives',
  'Printing Inks',
  'PP Straps',
  'Caps & Closures',
  'Tapes',
  'Labels',
  'Cushioning Material'
];

const ProductListing = () => {
  const auth = auth(); // Replace this with your authentication hook
  const [data, setData] = useState(null);
  const [productId, setProductId] = useState('');
  const [productType, setProductType] = useState('');
  const [origin, setOrigin] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [packagingMaterials, setPackagingMaterials] = useState('');
  const [labourPractices, setLabourPractices] = useState('');
  const [esgScore, setEsgScore] = useState('');
  const [fileUrls, setFileUrls] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [productUrl, setProductUrl] = useState('');

  const handleAutofill = async () => {
    // ... (same as before)
  };

  const handleFileUpload = async (file, index) => {
    const storage = getStorage();
    const storageRef = ref(storage, `product_files/${productId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const fileUrl = await getDownloadURL(storageRef);
    const updatedFileUrls = [...fileUrls];
    updatedFileUrls[index] = fileUrl;
    setFileUrls(updatedFileUrls);
  };

  const handleComponentUpload = (event, index) => {
    const file = event.target.files[0];
    handleFileUpload(file, index);
  };

  const handleSubmit = async () => {
    const productData = {
      productId,
      productType,
      origin,
      name,
      description,
      packagingMaterials,
      labourPractices,
      esgScore,
      fileUrls,
      imageUrl,
      productUrl
    };

    try {
      const user = auth.currentUser;

      if (user) {
        const collectionName = 'YOUR_COLLECTION_NAME'; // Update with your collection name
        const firestore = getFirestore();

        // Create a document reference with a custom ID (productId)
        const productDocRef = doc(firestore, collectionName, productId);

        // Add or set data to the document
        await setDoc(productDocRef, productData);

        console.log("Document written with ID: ", productDocRef.id);
      } else {
        // No user is signed in
        console.log('No user is signed in');
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="productId">Product ID:</label>
        <input
          type="text"
          id="productId"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <button onClick={handleAutofill}>Autofill</button>
      </div>
      <div>
        <label htmlFor="productType">Product Type:</label>
        <select
          id="productType"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="hardware">Hardware</option>
          <option value="food">Food</option>
          <option value="vehicles">Vehicles</option>
          <option value="coffee">Coffee</option>
          <option value="clothing">Clothing</option>
        </select>
      </div>
      <div>
        <label htmlFor="origin">Origin:</label>
        <input
          type="text"
          id="origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="packagingMaterials">Packaging Materials:</label>
        <select
          id="packagingMaterials"
          value={packagingMaterials}
          onChange={(e) => setPackagingMaterials(e.target.value)}
        >
          <option value="">Select Packaging Material</option>
          {packagingMaterialsOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="labourPractices">Labour Practices:</label>
        <input
          type="text"
          id="labourPractices"
          value={labourPractices}
          onChange={(e) => setLabourPractices(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="esgScore">ESG Score:</label>
        <input
          type="text"
          id="esgScore"
          value={esgScore}
          onChange={(e) => setEsgScore(e.target.value)}
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input type="file" onChange={(e) => handleComponentUpload(e, 0)} />
      </div>
      <div>
        <label>Product URL:</label>
        <input
          type="text"
          value={productUrl}
          onChange={(e) => setProductUrl(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="supportingDocuments">Upload supporting documents and videos:</label>
        <input type="file" multiple onChange={(e) => handleComponentUpload(e, 1)} />
      </div>
      <div>
        {fileUrls.map((fileUrl, index) => (
          <div key={index}>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              File {index + 1}
            </a>
          </div>
        ))}
      </div>
      {data ? (
        <pre>{data}</pre>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ProductListing;
