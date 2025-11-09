import Color from "./Color";
import { Header } from "./heading";
import "./subcomp.css";
import { Subissue } from "./subissues";
import React, { useState, useRef, useMemo } from "react";
import api from "../api";
import { CircularProgress } from "@mui/material"; // Import spinner

// 1. Accept all props from UserHome
const SubComplain = ({
  issues,
  onLikeToggle,
  currentUserId,
  onIssueSubmit,
  onDeleteIssue,
}) => {
  const sStyle = {
    maxHeight: "calc(100vh - 120px)",
    overflowY: "auto",
    padding: "1rem",
  };

  // --- State for the form ---
  const [issueTitle, setIssueTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // For loading spinner

  // --- 2. REMOVED all data fetching and 'like' logic ---
  // (This is now handled by UserHome)

  // --- Handle form submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    setIsSubmitting(true); // <-- 3. Start loading spinner

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
        // Clear the form
        setIssueTitle("");
        setCategory("");
        setLocation("");
        setDescription("");
        setImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }

        // 4. Call the function from UserHome to refresh all data
        onIssueSubmit();
      }
    } catch (error) {
      alert("Error submitting complaint: " + error.response.data.message);
    } finally {
      setIsSubmitting(false); // <-- 5. Stop loading spinner
    }
  };

  // --- Filter the 'issues' prop based on the 'category' state ---
  const filteredIssues = useMemo(() => {
    if (!category) {
      return issues;
    }
    return issues.filter((issue) => issue.category === category);
  }, [category, issues]);

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

          {/* --- 6. Pass all props down to Subissue --- */}
          <Subissue
            issues={filteredIssues}
            onLikeToggle={onLikeToggle}
            userId={currentUserId}
            onDeleteIssue={onDeleteIssue} // <-- Pass this down
          />
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
              disabled={isSubmitting} // Disable when loading
            />
            <h4>Select a Category*</h4>
            <select
              id="category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isSubmitting} // Disable when loading
            >
              <option value="">-- Select a category --</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Electricity">Electricity</option>
              <option value="Roads">Roads</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Infrastructure">Infrastructure</option>
            </select>
            <h4>Location</h4>
            <input
              id="location"
              type="text"
              required
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isSubmitting} // Disable when loading
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
              disabled={isSubmitting} // Disable when loading
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
              disabled={isSubmitting} // Disable when loading
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

      {/* --- 7. Update Submit Button --- */}
      <button
        id="submitComplaint"
        type="Submit"
        style={{
          backgroundColor: Color.primary,
          color: Color.secondary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        disabled={isSubmitting} // Disable when loading
      >
        {isSubmitting ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Submit Complaint"
        )}
      </button>
    </form>
  );
};
export default SubComplain;
