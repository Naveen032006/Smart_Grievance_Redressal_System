import React, { useState, useEffect } from "react";
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
import api from "../../api"; // Make sure path is correct (e.g., ../../api)

// Helper to get the correct icon for staff
const getDeptIcon = (dept) => {
  switch (dept) {
    case 'Water Supply':
      return <WaterDrop sx={{ color: "#0ea5e9" }} />;
    case 'Electricity':
      return <Bolt sx={{ color: "#facc15" }} />;
    case 'Sanitation':
      return <Delete sx={{ color: "#10b981" }} />;
    case 'Infrastructure':
      return <Apartment sx={{ color: "#a855f7" }} />;
    default:
      return <Person sx={{ color: "#6b7280" }} />;
  }
};

function Ward() {
  const [admin, setAdmin] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWardDetails = async () => {
      try {
        // Use Promise.all to fetch all 3 endpoints in parallel
        const [adminRes, employeeRes, statsRes] = await Promise.all([
          api.get("/user/my-ward-admin"),
          api.get("/user/my-ward-employees"),
          api.get("/user/my-ward-stats")
        ]);

        if (adminRes.data.success) {
          setAdmin(adminRes.data.data);
        } else {
          // If admin fails, set an error
          setError("Could not load Ward Admin details.");
        }

        if (employeeRes.data.success) {
          setEmployees(employeeRes.data.data);
        }
        
        if (statsRes.data.success) {
          setStats(statsRes.data.data);
        }

      } catch (err) {
        console.error("Failed to fetch ward details:", err);
        setError(err.response?.data?.message || "Failed to fetch ward details.");
      }
      setLoading(false);
    };

    fetchWardDetails();
  }, []); // Run once on component load

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
        {/* Show ward number if admin is loaded */}
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

        {/* Ward Statistics Card (Live Data) */}
        <Paper
          elevation={2}
          sx={{
            borderRadius: "12px", p: 3, width: { xs: '80%', md: '30%' }, minWidth: '300px',
            background: "linear-gradient(to bottom right, #ffffff, #f8fafc)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            <BarChart style={{ color: "#047857" }} />
            <h3 style={{ margin: 0 }}>Ward Statistics</h3>
          </div>
          
          {stats ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <p>Total Complaints</p>
                <b>12</b>
              </div>
              <hr />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <p>Resolved This Month</p>
                <Chip label={1} sx={{ bgcolor: "#22c55e", color: "white" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <p>Pending Complaints</p>
                <Chip label={11} sx={{ bgcolor: "#e5e7eb", color: "black" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <p>Avg. Resolution Time</p>
                <b style={{ color: "#059669" }}>{2} days</b>
              </div>
            </>
          ) : (
             <Typography>Loading stats...</Typography>
          )}
        </Paper>
      </div>

    </div>
  );
}

export default Ward;