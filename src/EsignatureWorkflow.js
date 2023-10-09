import React, { Component } from 'react';
// import DocumDetails from './DocumDetails';
import axios from 'axios';

class EsignatureWorkflow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      selectedDocument: null,
      candidateName: '',
      candidateEmail: '',
      isSigning: false,
      signatureUrl: '',
    };
  }

  handleDocumentSelect = (event) => {
    const selectedDocument = event.target.value;
    this.setState({ selectedDocument });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  initiateSignature = async () => {
    const { selectedDocument, candidateName, candidateEmail } = this.state;
    const response =  await axios.post('https://cute-halva-229db0.netlify.app/.netlify/functions/api/sign',{email:candidateEmail,name:candidateName});
    
    //  API request to initiate e-signature
    // Replace with actual API integration code
    

      const data = await response.json();

      // In a real implementation, you would receive a signature URL from the e-signature service.
      // For demonstration purposes, we simulate a URL here.
      //this.setState({ signatureUrl: 'https://example.com/signature-url' });
      this.setState({ step:3 });

   
  };

  render() {
    const { step, selectedDocument, candidateName, candidateEmail, isSigning, signatureUrl } = this.state;

    return (
      <div className="e-signature-workflow">
        {step === 1 && (
          <div>
            <h2>Step 1: Select Document</h2>
            <label>Select Document Type:</label>
            <select name="selectedDocument" value={selectedDocument} onChange={this.handleDocumentSelect}>
              <option value="">Select Document</option>
              <option value="NDA">Non-Disclosure Agreement (NDA)</option>
              <option value="ConsentForm">Consent Form</option>
            </select>
           
            <button className='btn btn-info' onClick={() => this.setState({ step: 2 })}>Next</button>
            {/* <DocumDetails /> */}
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>Step 2: Enter Candidate Information</h2>
            <label>Candidate Name:</label>
            <input type="text" name="candidateName" value={candidateName} onChange={this.handleInputChange} />
            <label>Candidate Email:</label>
            <input type="email" name="candidateEmail" value={candidateEmail} onChange={this.handleInputChange} />
            <br/>
            <button className='btn btn-info' onClick={this.initiateSignature} disabled={isSigning}>
              {isSigning ? 'Signing...' : 'Initiate Signature'}
            </button><span></span>
            <button className='btn btn-secondary'  onClick={() => this.setState({ step: 3 })}>Next</button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2>Step 3: Sign Document</h2>
            <p>Please check your email for the e-signature link.</p>
            <a href={signatureUrl} target="_blank" rel="noopener noreferrer">
              Open E-Signature Link
            </a>
          </div>
        )}
      </div>
    );
  }
}

export default EsignatureWorkflow;
