import React, { useState, useEffect } from "react"; // <-- Import hooks
import { Paper, Button, Typography, Divider, Avatar } from "@mui/material"; // <-- Import Typography, Divider, Avatar
import {
  WaterDrop,
  Bolt,
  Delete,
  Apartment,
  Phone,
  Email,
  AccessTime,
  Person,
} from "@mui/icons-material";
import api from "../../api"; // <-- 1. Import your API client (adjust path if needed)

// Helper to get the correct icon for staff
const getDeptIcon = (dept) => {
  switch (dept) {
    case 'Water Supply':
      return <WaterDrop sx={{ color: "#0ea5e9", fontSize: 35 }} />;
    case 'Electricity':
      return <Bolt sx={{ color: "#facc15", fontSize: 35 }} />;
    case 'Sanitation':
      return <Delete sx={{ color: "#10b981", fontSize: 35 }} />;
    case 'Infrastructure':
      return <Apartment sx={{ color: "#a855f7", fontSize: 35 }} />;
    default:
      return <Person sx={{ color: "#6b7280", fontSize: 35 }} />;
  }
};

function Contact() {
  // --- 2. Create state for employees ---
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 3. Fetch data when component loads ---
  useEffect(() => {
    const fetchWardEmployees = async () => {
      try {
        setLoading(true);
        // This gets all "Active" employees for the logged-in user's ward
        const response = await api.get("/user/my-ward-employees");
        if (response.data.success) {
          setEmployees(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch ward employees:", error);
      }
      setLoading(false);
    };

    fetchWardEmployees();
  }, []); // Run once on mount

  return (
    <div
      style={{
        padding: "20px",
        maxHeight: "calc(100vh - 120px)",
        overflow: "auto",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Contact Information</h1>
      <p style={{ textAlign: "center", color: "gray" }}>
        Get in touch with your local ward staff
      </p>

      {/* --- Department Cards (Now Live Data) --- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          justifyContent: "center",
          marginTop: "30px",
          padding: "0 10%",
        }}
      >
        {loading ? (
          <Typography>Loading contacts...</Typography>
        ) : employees.length === 0 ? (
          <Typography>No active staff found for your ward.</Typography>
        ) : (
          // --- 4. Map over the 'employees' state ---
          employees.map((staff) => (
            <Paper
              key={staff._id}
              elevation={2}
              sx={{
                borderRadius: "12px",
                p: 3,
                background: "linear-gradient(to bottom right, #ffffff, #f8fafc)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    borderRadius: "8px",
                    padding: "8px",
                  }}
                >
                  {getDeptIcon(staff.department)}
                </div>
                <div>
                  <h3 style={{ margin: 0 }}>{staff.name}</h3>
                  <p style={{ margin: 0, color: "gray", fontSize: "14px" }}>
                    {staff.jobTitle} - {staff.department}
                  </p>
                </div>
              </div>
              
              <Divider sx={{my: 1}} />

              <div style={{ marginTop: "15px", color: "#374151" }}>
                <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Phone sx={{ fontSize: 16 }} /> {staff.phone}
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Email sx={{ fontSize: 16 }} /> {staff.email}
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <AccessTime sx={{ fontSize: 16 }} /> Mon–Fri, 9:00 AM – 5:00 PM
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#10b981",
                    "&:hover": { bgcolor: "#059669" },
                    borderRadius: "20px",
                  }}
                  onClick={() => (window.location.href = `tel:${staff.phone}`)}
                >
                  Call
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "20px",
                    color: "#374151",
                    borderColor: "#d1d5db",
                    "&:hover": { borderColor: "#9ca3af" },
                  }}
                  onClick={() => (window.location.href = `mailto:${staff.email}`)}
                >
                  Email
                </Button>
              </div>
            </Paper>
          ))
        )}
      </div>

      {/* --- Municipal Office Location (Static Card) --- */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "40px",
        }}
      >
        
      </div>
    </div>
  );
}

export default Contact;