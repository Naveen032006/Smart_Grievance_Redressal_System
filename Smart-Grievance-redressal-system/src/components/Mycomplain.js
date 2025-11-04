import { Box } from "@mui/material";
import Color from "./Color";
import { Header } from "./heading";
import "./Mycomplain.css";
import { Mycomplainwrap } from "./Mycomplaintwrap";
import { useState } from "react"; // <-- Import useState

const Mycomplain = ({ role, issues }) => {
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
          issues={issues}
        />
      </Box>
    </div>
  );
};
export default Mycomplain;
