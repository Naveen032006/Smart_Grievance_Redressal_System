import Color from './Color';
import { Header } from './heading';
import './subcomp.css';
import { Subissue } from './subissues';
import React, { useState, useRef } from 'react'; // <-- 1. Import useState and useRef
import api from '../api'; // <-- 2. Import your api client

const SubComplain = () => {
  const sStyle = { maxHeight: "82vh", overflowY: "scroll" };

  // --- 3. Create state for every input ---
  const [issueTitle, setIssueTitle] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null); // To help reset the file input

  // --- 4. Create the submit handler ---
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from refreshing

    if (!image) {
      alert('Please upload an image.');
      return;
    }

    // Use FormData because you're uploading a file
    const formData = new FormData();
    formData.append('issueTitle', issueTitle);
    formData.append('category', category);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('image', image);

    try {
      // api.js automatically adds your auth token
      const response = await api.post('/user/add-issue', formData);

      if (response.data.success) {
        alert('Complaint submitted successfully!');
        // Clear the form
        setIssueTitle('');
        setCategory('');
        setLocation('');
        setDescription('');
        setImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = null; // Reset the file input
        }
      }
    } catch (error) {
      alert('Error submitting complaint: ' + error.response.data.message);
    }
  };

  return (
    // --- 5. Add onSubmit to the main form ---
    <form style={sStyle} onSubmit={handleSubmit}>
      <Header title="Submit Complaints" subtitle="Report an Issue in your Community" showicon={false} />
      <div id='subcol'>
        <div id="reccomp" style={{ backgroundColor: Color.primary }}>
          <h3 style={{ color: "white" }}>Recent community Issues</h3>
          <Subissue />
        </div>
        
        {/* --- 6. Changed this from <form> to <div> --- */}
        <div id="complaintinput" style={{ backgroundColor: Color.primary }}>
          <div id="compdet"> {/* <-- Changed from <form> */}
            <h3>Issue details</h3>
            <h4>Issue title*</h4>
            {/* --- 7. Connect all inputs to state --- */}
            <input 
              id="title" 
              type="text" 
              required 
              placeholder='Brief title'
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
            />
            <h4>Select a Category*</h4>
            <select 
              id="category" 
              required 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>-- Select a category --</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Electricity">Electricity</option>
              <option value="Roads">Roads</option>
            </select>
            <h4>Location</h4>
            <input 
              id="location" 
              type="text" 
              required 
              placeholder='Enter Location'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div> {/* <-- Changed from <form> */}
            <h3>Description</h3>
            <textarea 
              id="message" 
              type="text" 
              name="message" 
              rows="5" 
              cols="40" 
              placeholder='Brief description here'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div id="imageupl" style={{ backgroundColor: Color.primary, borderRadius: "20px" }}>
          <h3 style={{ color: "white" }}>Photo Upload</h3>
          <div id="image">
            <input 
              type="file" 
              style={{ border: `dotted 2px ${Color.secondary}` }} 
              id="img" 
              name="img" 
              accept='image/*' 
              required
              ref={fileInputRef}
              onChange={(e) => setImage(e.target.files[0])} // Get the file object
            />
            <div id="imgtips" style={{ border: `dotted 2px ${Color.secondary}`, color: Color.secondary }}>
              {/* ... photo tips ... */}
            </div>
          </div>
        </div>
      </div>
      <button id="submitComplaint" type='Submit' style={{ backgroundColor: Color.primary, color: Color.secondary }}>Submit Complaint</button>
    </form>
  );
}
export default SubComplain;