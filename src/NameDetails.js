// src/NameDetails.js
import React, { useState, useEffect } from 'react';
import nameDetails from './data';
import axios from 'axios';
import Skills from './Skills'

function NameDetails() {
  const [selectedName, setSelectedName] = useState('');
  const [details, setDetails] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedName(selectedValue);

    // Find the details corresponding to the selected name
    const selectedDetails = nameDetails.find((entry) => entry.name === selectedValue);

    // Update the state with the selected details
    setDetails(selectedDetails);
  };

  const handleSignDocument = async (e) => {
    await axios.post('https://cute-halva-229db0.netlify.app/.netlify/functions/api/sign',{email:"hi"});
    
  }
  
  useEffect(() => {
    if (selectedName) {
      setLoading(true);
      axios.get(`/textfiles/${selectedName.toLowerCase()}.txt`) // Assumes filenames match names in lowercase
        .then((response) => {
          setFileContent(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Failed to load file:', error);
          setFileContent('Failed to load file.');
          setLoading(false);
        });
    }
  }, [selectedName]);

  return (
    <div>
      <h2>Select a Name</h2>
      <select value={selectedName} onChange={handleChange}>
        <option value="">Select a name</option>
        {nameDetails.map((entry, index) => (
          <option key={index} value={entry.name}>
            {entry.name}
          </option>
        ))}
      </select>
      {details && (
        <div>
            <ul>
                <li>
                <h3>Details for {selectedName}</h3>
          <p>Name: {details.name}</p>
          <p>Age: {details.age}</p>
          <p>City: {details.city}</p>
          <p>Resume: </p>
          
           {/* <button onClick={() => handleSignDocument(details.id)}>Sign</button> */}
                </li>
            </ul>
         
        </div>
      )}
      
        
        
      {selectedName && (
       <ul><li>
          <h3>Click to Sign for {selectedName}</h3> <button className='btn btn-info' onClick={() => handleSignDocument(details.id)}>Sign</button>
          {loading ? (
            <p>Loading file...</p>
          ) : (
            <Skills fileContent={fileContent} />
            
          )}
        </li></ul>
      )}
      
    </div>
  );
}

export default NameDetails;
