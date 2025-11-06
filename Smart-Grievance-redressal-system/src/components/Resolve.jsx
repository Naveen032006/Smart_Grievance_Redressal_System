import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Chip,
  Card,
  CardContent,
  Avatar,
  Divider,
  Container, // Import Container for centered layout
  CardMedia, // Import CardMedia for the image
} from "@mui/material";
import {
  Assignment as AssignmentIcon,
  LocationOn as LocationOnIcon,
  Person as PersonIcon,
  CalendarToday as CalendarTodayIcon,
  ThumbUp as ThumbUpIcon,
} from "@mui/icons-material";

// --- UPDATED Mock Data (matching your JSON structure) ---
const complaintsData = [
  {
    _id: "690a1ec1a490f42e8b6fbaa7",
    issueTitle: "Mosquito",
    description: "Due to heavy rain there is lot of mosquito",
    location: "Tindivanam",
    status: "Pending",
    category: "Electricity",
    likeCount: 0,
    image:
      "https://res.cloudinary.com/dthyvjza8/image/upload/v1762270912/fbyl7bnnraifnnjen3pk.jpg",
    user: { name: "Rohan Gupta" }, // Simulating populated user data
    createdAt: "2025-11-04T15:41:53.076Z",
  },
  {
    _id: "690a1ec1a490f42e8b6fbaa8",
    issueTitle: "Noisy construction site at night",
    description:
      "Constant noise after 10 PM from the new building site. It is violating city ordinances.",
    location: "Ward 5",
    status: "Pending",
    category: "Noise",
    likeCount: 3,
    image: "", // Example with no image
    user: { name: "Anita Sharma" },
    createdAt: "2025-11-03T08:15:00.000Z",
  },
  {
    _id: "690a1ec1a490f42e8b6fbaa9",
    issueTitle: "Park playground equipment damaged",
    description:
      "The main swing set is broken and the slide has sharp edges. It is unsafe for children.",
    location: "Sunrise Park, Ward 2",
    status: "In-Progress",
    category: "Parks",
    likeCount: 3,
    image:
      "https://res.cloudinary.com/dthyvjza8/image/upload/v1762270912/fbyl7bnnraifnnjen3pk.jpg", // Re-using image for demo
    user: { name: "Priya Patel" },
    createdAt: "2025-11-01T14:00:00.000Z",
  },
];

// --- 1. The Left-Side List Component (UPDATED) ---
function ComplaintList({ complaints, selectedId, onComplaintSelect }) {
  return (
    <Paper
      elevation={2}
      sx={{
        maxHeight: "calc(100vh - 120px)",
        overflow: "auto",
        borderRadius: 4,
      }}
    >
      <Box sx={{ p: 2, borderBottom: "1px solid #ddd" }}>
        <Typography variant="h6">Complaints Queue</Typography>
      </Box>
      <List disablePadding>
        {complaints.map((complaint) => (
          <ListItemButton
            key={complaint._id} // Use _id
            selected={selectedId === complaint._id} // Use _id
            onClick={() => onComplaintSelect(complaint)}
            sx={{
              borderBottom: "1px solid #eee",
              flexDirection: "column",
              alignItems: "flex-start",
              py: 1.5,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {/* Format createdAt date */}
                {new Date(complaint.createdAt).toLocaleDateString()}
              </Typography>
              <Chip
                label={complaint.category} // Use category
                color="primary"
                variant="outlined"
                size="small"
              />
            </Box>
            <ListItemText
              primary={complaint.issueTitle} // Use issueTitle
              primaryTypographyProps={{ fontWeight: "600", mb: 0.5 }}
              secondary={
                <Typography variant="body2" color="text.secondary">
                  {complaint.location} {/* Use location */}
                </Typography>
              }
            />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Chip
                label={complaint.status} // Use status
                variant="outlined"
                size="small"
                color={complaint.status === "Pending" ? "warning" : "info"}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ThumbUpIcon
                  sx={{ fontSize: 14, color: "text.secondary", mr: 0.5 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {complaint.likeCount} community support {/* Use likeCount */}
                </Typography>
              </Box>
            </Box>
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
}

// --- 2. The Right-Side Detail Component (UPDATED) ---
function ComplaintDetail({ complaint }) {
  // --- This is the Empty State View ---
  if (!complaint) {
    return (
      <Paper
        sx={{
          height: "calc(100vh - 120px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "text.secondary",
          borderRadius: 4,
        }}
      >
        <AssignmentIcon sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Select a Complaint
        </Typography>
        <Typography variant="body1">
          Choose a complaint from the list to view details and take action
        </Typography>
      </Paper>
    );
  }

  // --- This is the Selected Complaint Detail View ---
  return (
    <Box
      sx={{
        height: "calc(100vh - 120px)",
        overflow: "auto",
      }}
    >
      {/* Card 1: Complaint Details (UPDATED) */}
      <Card sx={{ mb: 2, borderRadius: 4 }}>
        {/* Show image if it exists */}
        {complaint.image && (
          <CardMedia
            component="img"
            height="240"
            image={complaint.image}
            alt={complaint.issueTitle}
          />
        )}
        <CardContent>
          <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
            <Chip label={complaint.category} color="error" size="small" />
          </Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {complaint.issueTitle}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {complaint.description}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ bgcolor: "primary.light", mr: 1.5 }}>
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Reported By
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="600">
                    {complaint.user.name} {/* Accessing simulated user name */}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ bgcolor: "secondary.light", mr: 1.5 }}>
                  <CalendarTodayIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Reported On
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="600">
                    {/* Format createdAt to full date/time */}
                    {new Date(complaint.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ bgcolor: "success.light", mr: 1.5 }}>
                  <LocationOnIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="600">
                    {complaint.location}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Card 2: Take Action (STUB) */}
      <Card sx={{ mb: 2, borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Take Action
          </Typography>
          <Typography color="text.secondary">
            (Your form fields like Assign Team, Resolution Time, etc. would go
            here)
          </Typography>
        </CardContent>
      </Card>

      {/* Card 3: Activity Timeline (STUB) */}
      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Activity Timeline
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

// --- 3. The Main Dashboard Component (UPDATED with <Container>) ---
export default function Resolve({ AdminId, issues }) {
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  return (
    // This Box provides the overall background color
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f4f6f8",
        maxHeight: "calc(100vh - 140px)",
        overflow: "auto",
      }}
    >
      {/* This Container centers the content and adds max-width */}
      <Container maxWidth="xxl">
        <Typography variant="h4" gutterBottom fontWeight="600">
          Resolve Complaints
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Review complaint details and take action to resolve citizen issues
        </Typography>

        <Grid container width={1000} spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={4}>
            <ComplaintList
              complaints={issues}
              selectedId={selectedComplaint?.id}
              onComplaintSelect={setSelectedComplaint}
            />
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={8}>
            <ComplaintDetail complaint={selectedComplaint} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
