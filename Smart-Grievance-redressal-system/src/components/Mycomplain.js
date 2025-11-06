import { Box } from "@mui/material";
import Color from "./Color";
import { Header } from "./heading";
import "./Mycomplain.css";
import { Mycomplainwrap } from "./Mycomplaintwrap";
import { useState, useEffect } from "react";
// import axios from "axios"; // We don't need axios directly
import api from "../api"; // <-- 1. Import your API client

const Mycomplain = ({ role }) => {
  const mStyle = {
    maxHeight: "calc(100vh - 120px)",
    overflowY: "auto",
    padding: "1rem",
  };

  // --- States for filters (This is all correct) ---
  const [complaintId, setComplaintId] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [order, setOrder] = useState("Newest First");

  // --- States for data (This is all correct) ---
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 2. This fetchIssues function is now fixed ---
  async function fetchIssues() {
    try {
      let res;
      if (role === "user") {
        // api.js automatically adds the token
        res = await api.get("/user/my-issues");
      } else {
        // api.js adds the token AND calls the correct admin route
        res = await api.get("/admin/issues");
      }
      return res.data?.data ?? [];
    } catch (err) {
      console.error(err.response?.data || err.message);
      throw err;
    }
  }

  useEffect(() => {
    async function loadIssues() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchIssues();
        setIssues(data);
      } catch (err) {
        setError("Failed to fetch issues");
      } finally {
        setLoading(false);
      }
    }
    loadIssues();
  }, [role]);

  // --- 3. Your filtering logic is perfect (no change needed) ---
  const filteredIssues = issues
    .filter((issue) => {
      if (complaintId && !issue._id.includes(complaintId)) return false;
      if (category && issue.category !== category) return false;
      if (status && issue.status !== status) return false;
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      if (order === "Newest First") return dateB - dateA;
      else return dateA - dateB;
    });

  // --- 4. Your render is perfect (no change needed) ---
  return (
    <div style={mStyle}>
      <Header
        title="My Complaints"
        subtitle="Track your Submited Issue"
        showicon={true}
        role={role}
      />
      
      {/* --- Filter Bar (all correct) --- */}
      <form
        className="sbar"
        style={{
          /* ... styles */
        }}
      >
        {/* ... all your inputs ... */}
      </form>

      <Box sx={{ overflowY: "auto" }}>
        <Mycomplainwrap
          role={role}
          // Pass the filtered list to the child
          issues={filteredIssues} 
        />
      </Box>
    </div>
  );
};
export default Mycomplain;