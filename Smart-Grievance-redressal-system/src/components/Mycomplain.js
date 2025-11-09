import { Box, Typography } from "@mui/material";
import Color from "./Color";
import { Header } from "./heading";
import "./Mycomplain.css";
import { Mycomplainwrap } from "./Mycomplaintwrap";
import { useState, useMemo } from "react"; // 1. Removed useEffect, useCallback, api
import { jwtDecode } from "jwt-decode"; // 2. Import jwt-decode

// 3. Accept all props from UserHome
const Mycomplain = ({
  role,
  issues,
  onDeleteIssue,
  onLikeToggle,
  currentUserId,
}) => {
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

  // --- 4. REMOVED all data fetching (fetchMyIssues, useEffect) ---
  // --- 4. REMOVED all handlers (handleDeleteIssue, onLikeToggle) ---

  // --- 5. Filtering logic (now uses useMemo) ---
  const filteredIssues = useMemo(() => {
    // This logic is now simpler. It just filters the 'issues' prop
    // which is *already* the correct list (either 'my-issues' or 'admin-issues')
    return issues
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
  }, [issues, complaintId, category, status, order]); // Re-filters when props or filters change

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
        style={
          {
            /* ... styles ... */
          }
        }
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
          <option value="Sanitation">Sanitation</option>
          <option value="Infrastructure">Infrastructure</option>
        </select>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">--All Statuses--</option>
          <option value="Pending">Pending</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
          <option value="Closed">Closed</option>
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
        {/* --- 6. Pass all props down to the wrapper --- */}
        <Mycomplainwrap
          role={role}
          issues={filteredIssues}
          loading={false} // Loading is handled by parent
          error={null} // Error is handled by parent
          onDelete={onDeleteIssue}
          onLikeToggle={onLikeToggle}
          userId={currentUserId}
        />
      </Box>
    </div>
  );
};
export default Mycomplain;
