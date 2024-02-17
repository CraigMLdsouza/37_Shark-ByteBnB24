import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import firestore from '../firebase';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('user');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const collectionName = accountType === 'user' ? 'users' : 'companies';
      const usersCollection = collection(firestore, collectionName);
      const userDocRef = doc(usersCollection, user.uid);

      const userData = {
        userId: user.uid,
        email: user.email,
        displayName: user.displayName || null,
        createdAt: serverTimestamp(),
        accountType,
      };

      await setDoc(userDocRef, userData);

      // Redirect to the appropriate profile based on the account type
      navigate(`/${accountType}-profile`);

      // Clear form and error on successful signup
      setEmail('');
      setPassword('');
      setAccountType('user');
      setError(null);

      console.log('User signed up successfully!');
    } catch (error) {
      setError(error.message);
      console.error('Error signing up:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto', padding: '20px', backgroundColor: '#f7f7f7', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Sign Up</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <div style={{ marginBottom: '20px' }}>
          <input style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <input style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <select style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} value={accountType} onChange={(e) => setAccountType(e.target.value)}>
            <option value="user">User</option>
            <option value="company">Company</option>
          </select>
        </div>
        <button style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s ease' }} type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
