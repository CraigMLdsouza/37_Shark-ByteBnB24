import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import firestore from '../firebase';
import { collection, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import './companyprofile.css';

const CompanyProfile = () => {
  const [displayName, setDisplayName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [esgScore, setEsgScore] = useState(0);
  const [envScore, setEnvScore] = useState(0);
  const [govScore, setGovScore] = useState(0);
  const [socScore, setSocScore] = useState(0);
  const [sector, setSector] = useState('');
  const [scoringPeriod, setScoringPeriod] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = auth.currentUser;
  
        if (user) {
          const collectionName = user.accountType === 'user' ? 'users' : 'companies';
          const usersCollection = collection(firestore, collectionName);
          const userDocRef = doc(usersCollection, user.uid);
  
          const userDocSnapshot = await getDoc(userDocRef);
  
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
  
            setDisplayName(userData.displayName || '');
  
            if (userData.companyInfo) {
              setCompanyName(userData.companyInfo.companyName || '');
              setEsgScore(userData.companyInfo.esgScore || 0);
              setEnvScore(userData.companyInfo.envScore || 0);
              setGovScore(userData.companyInfo.govScore || 0);
              setSocScore(userData.companyInfo.socScore || 0);
              setSector(userData.companyInfo.sector || '');
              setScoringPeriod(userData.companyInfo.scoringPeriod.toDate() || new Date());
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
  
    fetchUserProfile();
  }, []); 
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;

      if (user) {
        const collectionName = user.accountType === 'user' ? 'users' : 'companies';
        const usersCollection = collection(firestore, collectionName);
        const userDocRef = doc(usersCollection, user.uid);

        await updateDoc(userDocRef, {
          displayName,
          companyInfo: {
            companyName,
            esgScore,
            envScore,
            govScore,
            socScore,
            sector,
            scoringPeriod: serverTimestamp(),
          },
        });

        setIsEditing(false);

        console.log('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div className="container-box">
      <h1>Company Profile</h1>
      {isEditing ? (
        <form onSubmit={handleUpdateProfile}>
          <label>
            Display Name:
            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          </label>
          <br />
          <label>
            Company Name:
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </label>
          <br />
          <label>
            ESG Score:
            <input type="number" value={esgScore} onChange={(e) => setEsgScore(parseInt(e.target.value, 10))} />
          </label>
          <br />
          <label>
            Environment Score:
            <input type="number" value={envScore} onChange={(e) => setEnvScore(parseInt(e.target.value, 10))} />
          </label>
          <br />
          <label>
            Governance Score:
            <input type="number" value={govScore} onChange={(e) => setGovScore(parseInt(e.target.value, 10))} />
          </label>
          <br />
          <label>
            Social Score:
            <input type="number" value={socScore} onChange={(e) => setSocScore(parseInt(e.target.value, 10))} />
          </label>
          <br />
          <label>
            Scoring Period:
            <input type="datetime-local" value={scoringPeriod.toISOString().slice(0, -8)} onChange={(e) => setScoringPeriod(new Date(e.target.value))} />
          </label>
          <br />
          <label>
            Sector:
            <input type="text" value={sector} onChange={(e) => setSector(e.target.value)} />
          </label>
          <br />
          <button type="submit">Update Profile</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <p>Display Name: {displayName}</p>
          <p>Company Name: {companyName}</p>
          <p>ESG Score: {esgScore}</p>
          <p>Environment Score: {envScore}</p>
          <p>Governance Score: {govScore}</p>
          <p>Social Score: {socScore}</p>
          <p>Scoring Period: {scoringPeriod.toString()}</p>
          <p>Sector: {sector}</p>
          <button type="button" onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
