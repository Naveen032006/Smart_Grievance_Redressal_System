import React, { useState, useEffect, useMemo } from "react";
import { Paper, Avatar, Chip, Typography, Divider } from "@mui/material";
import {
  Phone,
  Email,
  Person,
  BarChart,
  Apartment,
  AccessTime,
  Bolt,
  WaterDrop,
  Delete,
} from "@mui/icons-material";
import api from "../../api"; // Your protected API client
import axios from "axios"; // Plain axios for public routes

// Helper to get the correct icon for staff
const getDeptIcon = (dept) => {
  switch (dept) {
    case 'Water Supply': return <WaterDrop sx={{ color: "#0ea5e9" }} />;
    case 'Electricity': return <Bolt sx={{ color: "#facc15" }} />;
    case 'Sanitation': return <Delete sx={{ color: "#10b981" }} />;
    case 'Infrastructure': return <Apartment sx={{ color: "#a855f7" }} />;
    default: return <Person sx={{ color: "#6b7280" }} />;
  }
};

function Ward() {
  const [admin, setAdmin] = useState(null); // For the user's specific ward admin
  const [allIssues, setAllIssues] = useState([]); // For global stats
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWardDetails = async () => {
      try {
        // Fetch the user's specific admin (protected) and all issues (public)
        const [adminRes, allIssuesRes] = await Promise.all([
          api.get("/user/my-ward-admin"), // Protected route
          axios.get("http://localhost:4000/api/user/issues") // Public route
        ]);

        if (adminRes.data.success) {
          setAdmin(adminRes.data.data);
        } else {
          setError("Could not load Ward Admin details.");
        }

        if (allIssuesRes.data.success) {
          setAllIssues(allIssuesRes.data.data);
        }

      } catch (err) {
        console.error("Failed to fetch ward details:", err);
        setError(err.response?.data?.message || "Failed to fetch details.");
      }
      setLoading(false);
    };

    fetchWardDetails();
  }, []); // Run once on component load

  // Calculate global stats from the 'allIssues' state
  const stats = useMemo(() => {
    const initialCounts = {
      pending: 0,
      inProgress: 0,
      resolved: 0,
    };

    // Tally counts
    const statusCounts = allIssues.reduce((acc, complaint) => {
      switch (complaint.status) {
        case "Pending":
          acc.pending++;
          break;
        case "In-Progress":
          acc.inProgress++;
          break;
        case "Resolved":
        case "Closed": // Group Resolved and Closed together
          acc.resolved++;
          break;
        default:
          break;
      }
      return acc;
    }, initialCounts);

    // Calculate average resolution time
    const resolvedIssues = allIssues.filter(
      (c) => c.status === "Resolved" || c.status === "Closed"
    );
    let avgResolutionTime = 0;
    if (resolvedIssues.length > 0) {
        const totalTime = resolvedIssues.reduce((acc, c) => {
            const created = new Date(c.createdAt).getTime();
            const updated = new Date(c.updatedAt).getTime();
            return acc + (updated - created);
        }, 0);
        const avgMs = totalTime / resolvedIssues.length;
        avgResolutionTime = (avgMs / (1000 * 60 * 60 * 24)).toFixed(1); // In days
    }

    return {
      totalComplaints: allIssues.length,
      pendingComplaints: statusCounts.pending,
      resolvedTotal: statusCounts.resolved,
      avgResolutionTime: avgResolutionTime,
    };
  }, [allIssues]);


  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h4">Loading Ward Details...</Typography>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        maxHeight: "calc(100vh - 120px)",
        overflow: "auto",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        {admin ? `Ward ${admin.wardNumber} Details` : "Ward Details"}
      </h1>
      <p style={{ textAlign: "center", color: "gray" }}>
        Information about your ward and local administration
      </p>

      {/* --- Row 1: Councilor + Stats --- */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        {/* Ward Councilor Card (Live Data) */}
        {admin ? (
          <Paper
            elevation={2}
            sx={{
              borderRadius: "12px", p: 3, width: { xs: '80%', md: '30%' }, minWidth: '300px',
              background: "linear-gradient(to bottom right, #ffffff, #f8fafc)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <Person style={{ color: "#047857" }} />
              <h3 style={{ margin: 0 }}>Ward Administrator</h3>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <Avatar sx={{ bgcolor: "#059669", width: 60, height: 60 }}>
                {admin.name.split(" ").map((n) => n[0]).join("")}
              </Avatar>
              <div>
                <h4 style={{ margin: 0 }}>{admin.name}</h4>
                <Chip label="Elected Representative" size="small" />
              </div>
            </div>
            <div style={{ marginTop: "15px", color: "#374151" }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Phone sx={{ fontSize: 16 }} /> {admin.phone}
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Email sx={{ fontSize: 16 }} /> {admin.email}
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Apartment sx={{ fontSize: 16 }} /> {admin.address}, {admin.city}
              </p>
            </div>
          </Paper>
        ) : (
          <Paper sx={{ borderRadius: "12px", p: 3, width: { xs: '80%', md: '30%' }, minWidth: '300px' }}>
             <Typography color="error">{error || "Could not load Ward Admin details."}</Typography>
          </Paper>
        )}

        {/* Global Statistics Card (Live Data) */}
        <Paper
          elevation={2}
          sx={{
            borderRadius: "12px", p: 3, width: { xs: '80%', md: '30%' }, minWidth: '300px',
            background: "linear-gradient(to bottom right, #ffffff, #f8fafc)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            <BarChart style={{ color: "#047857" }} />
            <h3 style={{ margin: 0 }}>Global Statistics (All Wards)</h3>
          </div>
          
          {stats ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <p>Total Complaints</p>
                <b>{stats.totalComplaints}</b>
              </div>
              <hr />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <p>Total Resolved</p>
                <Chip label={stats.resolvedTotal} sx={{ bgcolor: "#22c55e", color: "white" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <p>Total Pending</p>
                <Chip label={stats.pendingComplaints} sx={{ bgcolor: "#e5e7eb", color: "black" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <p>Avg. Resolution Time</p>
                <b style={{ color: "#059669" }}>{stats.avgResolutionTime} days</b>
              </div>
            </>
          ) : (
             <Typography>Loading stats...</Typography>
          )}
        </Paper>
      </div>

      {/* --- Row 2: Ward Facilities (Mock Data) --- */}
     
    </div>
  );
}

export default Ward;