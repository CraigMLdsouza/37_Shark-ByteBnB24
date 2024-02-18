import React from 'react';
import './esg.css';
import jsonData from './output2.json';

function ESG() {
  const data = jsonData;

  return (
    <table>
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Sector Classification</th>
          <th>Environment Score</th>
          <th>Social Score</th>
          <th>Governance Score</th>
          <th>ESG Score</th>
          <th>Category</th>
          <th>Scoring Period</th>
        </tr>
      </thead>
      <tbody>
        {data.map((company, index) => (
          <tr key={index}>
            <td>{company.CompanyName}</td>
            <td>{company.Sector}</td>
            <td>{company.EnvScore}</td>
            <td>{company.SocScore}</td>
            <td>{company.GovScore}</td>
            <td>{company.ESGScore}</td>
            <td>{company.Cat}</td>
            <td>{company.Scoring_period}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ESG;
