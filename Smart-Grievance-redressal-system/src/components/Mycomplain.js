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
  async function fetchMyIssues() {
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
        const data = await fetchMyIssues();
        setIssues(data);
      } catch (err) {
        setError("Failed to fetch issues");
      } finally {
        setLoading(false);
      }
    }
    loadIssues();
  }, [role]);

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
          backgroundColor: Color.primary,
          height: "100px",
          display: "flex",
          borderRadius: "20px",
          justifyContent: "center",
          maxWidth: "90%",
          overflowX: "auto",
          margin: "20px auto",
        }}
      >
        <input
          id="compid"
          placeholder="Enter complaint id"
          value={complaintId}
          onChange={(e) => setComplaintId(e.target.value)}
        />

        <select
          id="options"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">--All Categories--</option>
          <option value="Water Supply">Water Supply</option>
          <option value="Electricity">Electricity</option>
          <option value="Roads">Roads</option>
          <option value="Corporation">Corporation</option>
          {/* Add all your categories here */}
        </select>

        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">--All Statuses--</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          id="arrange"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="Newest First">Newest First</option>
          <option value="Oldest First">Oldest First</option>
        </select>
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