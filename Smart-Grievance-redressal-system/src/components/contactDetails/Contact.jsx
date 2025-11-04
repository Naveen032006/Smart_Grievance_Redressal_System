import React from "react";
import { Paper, Button } from "@mui/material";
import {
  WaterDrop,
  Bolt,
  Delete,
  Apartment,
  Phone,
  Email,
  AccessTime,
} from "@mui/icons-material";

function Contact() {
  const contacts = [
    {
      icon: <WaterDrop sx={{ color: "#0ea5e9", fontSize: 35 }} />,
      title: "Water Supply",
      dept: "Water Department",
      phone: "+91 98765 11111",
      email: "water@urbaneye.gov",
      time: "Mon–Sat, 9:00 AM – 6:00 PM",
      bg: "#e0f2fe",
    },
    {
      icon: <Bolt sx={{ color: "#facc15", fontSize: 35 }} />,
      title: "Electricity",
      dept: "Power Distribution",
      phone: "+91 98765 22222",
      email: "electricity@urbaneye.gov",
      time: "24/7",
      bg: "#fef9c3",
    },
    {
      icon: <Delete sx={{ color: "#10b981", fontSize: 35 }} />,
      title: "Waste Management",
      dept: "Sanitation Department",
      phone: "+91 98765 33333",
      email: "waste@urbaneye.gov",
      time: "Mon–Sun, 6:00 AM – 8:00 PM",
      bg: "#dcfce7",
    },
    {
      icon: <Apartment sx={{ color: "#a855f7", fontSize: 35 }} />,
      title: "Municipal Office",
      dept: "Administration",
      phone: "+91 98765 44444",
      email: "admin@urbaneye.gov",
      time: "Mon–Fri, 10:00 AM – 5:00 PM",
      bg: "#f3e8ff",
    },
  ];

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
        Get in touch with local departments and offices
      </p>

      {/* --- Department Cards --- */}
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
        {contacts.map((dept, index) => (
          <Paper
            key={index}
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
                  background: dept.bg,
                  borderRadius: "8px",
                  padding: "8px",
                }}
              >
                {dept.icon}
              </div>
              <div>
                <h3 style={{ margin: 0 }}>{dept.title}</h3>
                <p style={{ margin: 0, color: "gray", fontSize: "14px" }}>
                  {dept.dept}
                </p>
              </div>
            </div>

            <div style={{ marginTop: "15px", color: "#374151" }}>
              <p>
                <Phone sx={{ fontSize: 16, verticalAlign: "middle" }} />{" "}
                {dept.phone}
              </p>
              <p>
                <Email sx={{ fontSize: 16, verticalAlign: "middle" }} />{" "}
                {dept.email}
              </p>
              <p>
                <AccessTime sx={{ fontSize: 16, verticalAlign: "middle" }} />{" "}
                {dept.time}
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
                onClick={() => (window.location.href = `tel:${dept.phone}`)}
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
                onClick={() => (window.location.href = `mailto:${dept.email}`)}
              >
                Email
              </Button>
            </div>
          </Paper>
        ))}
      </div>

      {/* --- Municipal Office Location --- */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "40px",
        }}
      >
        <Paper
          elevation={1}
          sx={{
            borderRadius: "12px",
            p: 3,
            width: "65%",
            border: "1px solid #A7F3D0",
            background: "linear-gradient(to bottom right, #ffffff, #f8fafc)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#047857"
              style={{ width: 22, height: 22 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21c-4.97 0-9-4.03-9-9a9 9 0 1 1 18 0c0 4.97-4.03 9-9 9Zm0-9.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
              />
            </svg>
            <h3 style={{ margin: 0, color: "#047857" }}>
              Municipal Office Location
            </h3>
          </div>

          <div
            style={{ marginTop: "15px", color: "#374151", lineHeight: "1.6" }}
          >
            <p style={{ margin: 0 }}>UrbanEye Municipal Corporation</p>
            <p style={{ margin: 0 }}>123 Civic Center Road</p>
            <p style={{ margin: 0 }}>Central District, City - 400001</p>

            <p style={{ marginTop: "10px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#4b5563"
                style={{
                  width: 18,
                  height: 18,
                  verticalAlign: "middle",
                  marginRight: "5px",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Office Hours: Monday to Friday, 10:00 AM – 5:00 PM
            </p>
          </div>

          <div style={{ marginTop: "15px" }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#f9fafb",
                color: "#047857",
                border: "1px solid #A7F3D0",
                borderRadius: "20px",
                padding: "6px 16px",
                cursor: "pointer",
                fontWeight: 500,
              }}
              onClick={() =>
                window.open(
                  "https://maps.google.com?q=123+Civic+Center+Road,+Central+District,+City+400001",
                  "_blank"
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#047857"
                style={{ width: 18, height: 18 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 20.25v-6.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v6.75M3 9.75l9-6 9 6M4.5 10.5v9.75A1.5 1.5 0 0 0 6 21.75h12a1.5 1.5 0 0 0 1.5-1.5V10.5"
                />
              </svg>
              View on Map
            </button>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default Contact;
