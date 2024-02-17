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
    <div>
      <h1>Sign Up</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Account Type:
          <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
            <option value="user">User</option>
            <option value="company">Company</option>
          </select>
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
