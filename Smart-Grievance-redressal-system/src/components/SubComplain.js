import Color from "./Color";
import { Header } from "./heading";
import "./subcomp.css";
import { Subissue } from "./subissues";
import React, { useState, useRef, useMemo } from "react"; // <-- 1. Import useMemo
import api from "../api";

const SubComplain = ({ issues }) => {
  const sStyle = {
    maxHeight: "calc(100vh - 120px)",
    overflowY: "auto",
    padding: "1rem",
  };

  const [issueTitle, setIssueTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("issueTitle", issueTitle);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await api.post("/user/add-issue", formData);

      if (response.data.success) {
        alert("Complaint submitted successfully!");
        setIssueTitle("");
        setCategory("");
        setLocation("");
        setDescription("");
        setImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      }
    } catch (error) {
      alert("Error submitting complaint: " + error.response.data.message);
    }
  };

  // --- 2. Filter the issues list based on the 'category' state ---
  const filteredIssues = useMemo(() => {
    if (!category) {
      // If category is "" (the "Select a category" default)
      return issues; // Return the full, unfiltered list
    }
    // Otherwise, return only the issues that match the selected category
    return issues.filter((issue) => issue.category === category);
  }, [category, issues]); // Re-filter when category or issues change

  return (
    <form style={sStyle} onSubmit={handleSubmit}>
      <Header
        title="Submit Complaints"
        subtitle="Report an Issue in your Community"
        showicon={false}
      />
      <div id="subcol">
        <div id="reccomp" style={{ backgroundColor: Color.primary }}>
          <h3 style={{ color: "white" }}>Recent community Issues</h3>

          {/* --- 3. Pass the new 'filteredIssues' list --- */}
          <Subissue issues={filteredIssues} />
        </div>

        <div id="complaintinput" style={{ backgroundColor: Color.primary }}>
          <div id="compdet">
            <h3>Issue details</h3>
            <h4>Issue title*</h4>
            <input
              id="title"
              type="text"
              required
              placeholder="Brief title"
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
            />
            <h4>Select a Category*</h4>
            {/* This dropdown now controls both the form and the filter */}
            <select
              id="category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">-- Select a category --</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Electricity">Electricity</option>
              <option value="Roads">Roads</option>
              <option value="Corporation">Corporation</option>
            </select>
            <h4>Location</h4>
            <input
              id="location"
              type="text"
              required
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div>
            <h3>Description</h3>
            <textarea
              id="message"
              type="text"
              name="message"
              rows="5"
              cols="40"
              placeholder="Brief description here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div
          id="imageupl"
          style={{ backgroundColor: Color.primary, borderRadius: "20px" }}
        >
          <h3 style={{ color: "white" }}>Photo Upload</h3>
          <div id="image">
            <input
              type="file"
              style={{ border: `dotted 2px ${Color.secondary}` }}
              id="img"
              name="img"
              accept="image/*"
              required
              ref={fileInputRef}
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div
              id="imgtips"
              style={{
                border: `dotted 2px ${Color.secondary}`,
                color: Color.secondary,
              }}
            >
              {/* ... photo tips ... */}
            </div>
          </div>
        </div>
      </div>
      <button
        id="submitComplaint"
        type="Submit"
        style={{ backgroundColor: Color.primary, color: Color.secondary }}
      >
        Submit Complaint
      </button>
    </form>
  );
};
export default SubComplain;
