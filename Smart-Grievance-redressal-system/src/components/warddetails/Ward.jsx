import React from "react";
import { Paper, Avatar, Chip } from "@mui/material";
import {
  Phone,
  Email,
  CalendarToday,
  Person,
  BarChart,
  Apartment,
} from "@mui/icons-material";

function Ward() {
  return (
    <div
      style={{
        padding: "20px",
        maxHeight: "calc(100vh - 120px)",
        overflow: "auto",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Ward Details</h1>
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
        }}
      >
        {/* Ward Councilor Card */}
        <Paper
          elevation={2}
          sx={{
            borderRadius: "12px",
            p: 3,
            width: "30%",
            background: "linear-gradient(to bottom right, #ffffff, #f8fafc)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "10px",
            }}
          >
            <Person style={{ color: "#047857" }} />
            <h3 style={{ margin: 0 }}>Ward Councilor</h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <Avatar sx={{ bgcolor: "#059669", width: 60, height: 60 }}>
              RK
            </Avatar>
            <div>
              <h4 style={{ margin: 0 }}>Rajesh Kumar</h4>
              <Chip label="Elected Representative" size="small" />
            </div>
          </div>

          <div style={{ marginTop: "15px", color: "#374151" }}>
            <p>
              <Phone sx={{ fontSize: 16 }} /> +91 98765 43210
            </p>
            <p>
              <Email sx={{ fontSize: 16 }} /> rajesh.kumar@urbaneye.gov
            </p>
            <p>
              <CalendarToday sx={{ fontSize: 16 }} /> Office Hours: Mon–Fri,
              10:00 AM – 5:00 PM
            </p>
          </div>
        </Paper>

        {/* Ward Statistics Card */}
        <Paper
          elevation={2}
          sx={{
            borderRadius: "12px",
            p: 3,
            width: "30%",
            background: "linear-gradient(to bottom right, #ffffff, #f8fafc)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "10px",
            }}
          >
            <BarChart style={{ color: "#047857" }} />
            <h3 style={{ margin: 0 }}>Ward Statistics</h3>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <p>Total Complaints</p>
            <b>142</b>
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <p>Resolved This Month</p>
            <Chip label="38" sx={{ bgcolor: "#22c55e", color: "white" }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <p>Pending Complaints</p>
            <Chip label="15" sx={{ bgcolor: "#e5e7eb", color: "black" }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <p>Avg. Resolution Time</p>
            <b style={{ color: "#059669" }}>4.2 days</b>
          </div>
        </Paper>
      </div>

      {/* --- Row 2: Ward Facilities --- */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: "12px",
          p: 3,
          width: "65%",
          margin: "40px auto",
          background: "linear-gradient(to bottom right, #ffffff, #f8fafc)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "15px",
          }}
        >
          <Apartment style={{ color: "#047857" }} />
          <h3 style={{ margin: 0 }}>Ward Facilities</h3>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          {[
            { count: 5, label: "Parks" },
            { count: 8, label: "Schools" },
            { count: 3, label: "Hospitals" },
            { count: 2, label: "Community Centers" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                width: "20%",
                background: "#f9fafb",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <h2 style={{ color: "#047857", margin: 0 }}>{item.count}</h2>
              <p style={{ margin: 0, color: "#4b5563" }}>{item.label}</p>
            </div>
          ))}
        </div>
      </Paper>
    </div>
  );
}

export default Ward;
