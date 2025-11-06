import { Box } from "@mui/material";
import Color from "./Color";
import { Header } from "./heading";
import "./Mycomplain.css";
import { Mycomplainwrap } from "./Mycomplaintwrap";
import { useState, useEffect } from "react";
import axios from "axios";

const Mycomplain = ({ role }) => {
  const mStyle = {
    maxHeight: "calc(100vh - 120px)",
    overflowY: "auto",
    padding: "1rem",
  };

  // --- 1. Add state for your filters ---
  const [complaintId, setComplaintId] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [order, setOrder] = useState("Newest First");
  // Inside your Mycomplain component, before rendering Mycomplainwrap

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch *logged-in* user's issues
  async function fetchIssues() {
    try {
      if (role === "user") {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not authenticated.");

        const res = await axios.get(
          "http://localhost:4000/api/user/my-issues",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return res.data?.data ?? [];
      } else {
        const res = await axios.get("http://localhost:4000/api/user/issues");
        console.log("Admin fetched:", res.data);
        return res.data?.data ?? [];
      }
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


  const filteredIssues = issues
    .filter((issue) => {
      // Filter by complaintId (partial match)
      if (complaintId && !issue._id.includes(complaintId)) return false;

      // Filter by category
      if (category && issue.category !== category) return false;

      // Filter by status
      if (status && issue.status !== status) return false;

      return true;
    })
    .sort((a, b) => {
      // Sort by date
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (order === "Newest First") return dateB - dateA;
      else return dateA - dateB; // Oldest First
    });

  console.log(issues);

  return (
    <div style={mStyle}>
      <Header
        title="My Complaints"
        subtitle="Track your Submited Issue"
        showicon={true}
        role={role}
      />

      {/* 2. Connect inputs to state with onChange */}
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
          <option value="Road">Road</option>
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
        {/* 3. Pass filter state down as props */}
        <Mycomplainwrap
          role={role}
          complaintId={complaintId}
          category={category}
          status={status}
          order={order}
          issues={filteredIssues}
        />
      </Box>
    </div>
  );
};
export default Mycomplain;
