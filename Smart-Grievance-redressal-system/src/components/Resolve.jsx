import React, { useState, useEffect } from "react";
import api from "../api"; // Your central API client (e.g., axios instance)

// --- MUI Imports ---
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
  Container, // Added Container for proper centering and max-width
  CardMedia,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import {
  Assignment as AssignmentIcon,
  LocationOn as LocationOnIcon,
  Person as PersonIcon,
  CalendarToday as CalendarTodayIcon,
  ThumbUp as ThumbUpIcon,
  Upgrade as UpgradeIcon,
  Close as CloseIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

// --- Component 1: ComplaintList ---
// (No changes, this component is good)
function ComplaintList({ complaints, selectedId, onComplaintSelect }) {
  return (
    <Paper
      elevation={2}
      sx={{
        maxHeight: "calc(100vh - 220px)",
        overflow: "auto",
        borderRadius: 4,
      }}
    >
      <Box sx={{ p: 2, borderBottom: "1px solid #ddd" }}>
        <Typography variant="h6">Complaints Queue</Typography>
      </Box>
      <List disablePadding>
        {(complaints || []).map((complaint) => (
          <ListItemButton
            key={complaint._id}
            selected={selectedId === complaint._id}
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
                {new Date(complaint.createdAt).toLocaleDateString()}
              </Typography>
              <Chip
                label={complaint.category}
                color="primary"
                variant="outlined"
                size="small"
              />
            </Box>
            <ListItemText
              primary={complaint.issueTitle}
              primaryTypographyProps={{ fontWeight: "600", mb: 0.5 }}
              secondary={
                <Typography variant="body2" color="text.secondary">
                  {complaint.location}
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
                label={complaint.status}
                variant="outlined"
                size="small"
                color={
                  complaint.status === "Pending"
                    ? "warning"
                    : complaint.status === "Resolved"
                    ? "success"
                    : "info"
                }
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ThumbUpIcon
                  sx={{ fontSize: 14, color: "text.secondary", mr: 0.5 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {complaint.likeCount || 0} community support
                </Typography>
              </Box>
            </Box>
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
}

// --- Component 2: TakeActionForm ---
// (No changes, this component is good)
function TakeActionForm({ complaint, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    status: complaint.status || "Pending",
    assignTo: "Unassigned",
    resolutionTime: "",
    actionTaken: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // We only send the status, as that's what handleUpdateComplaint expects
    const newStatus = formData.status;

    // Call the onUpdate function (which is handleUpdateComplaint)
    const success = await onUpdate(complaint._id, newStatus);

    if (success) {
      onClose(); // Only close the modal if the API call was successful
    }
  };

  return (
    <>
      <DialogTitle>
        Take Action: {complaint.issueTitle}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ pt: 1 }}>
          {/* Update Status */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="status-select-label">Update Status</InputLabel>
              <Select
                labelId="status-select-label"
                name="status"
                value={formData.status}
                label="Update Status"
                onChange={handleChange}
              >
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"In-Progress"}>In-Progress</MenuItem>
                <MenuItem value={"Resolved"}>Resolved</MenuItem>
                <MenuItem value={"Closed"}>Closed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* ... (Rest of your form fields are unchanged) ... */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="staff-select-label">Assign to Staff</InputLabel>
              <Select
                labelId="staff-select-label"
                name="assignTo"
                value={formData.assignTo}
                label="Assign to Staff"
                onChange={handleChange}
              >
                <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
                <MenuItem value={"Team Alpha (Roads)"}>
                  Team Alpha (Roads)
                </MenuItem>
                <MenuItem value={"Team Bravo (Sanitation)"}>
                  Team Bravo (Sanitation)
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="resolutionTime"
              label="Estimated Resolution Time"
              value={formData.resolutionTime}
              onChange={handleChange}
              placeholder="e.g., 2-3 days, 1 week"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="actionTaken"
              label="Action Taken"
              multiline
              rows={4}
              value={formData.actionTaken}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="notes"
              label="Additional Notes (Optional)"
              multiline
              rows={3}
              value={formData.notes}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="success"
          startIcon={<UpgradeIcon />}
        >
          Update Complaint
        </Button>
      </DialogActions>
    </>
  );
}

// --- Component 3: ComplaintDetail ---
// (No changes, this component is good)
function ComplaintDetail({ complaint, onUpdate }) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  if (!complaint) {
    // Empty state view
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

  // Selected complaint view
  return (
    <Box
      sx={{
        maxHeight: "calc(100vh - 220px)",
      }}
    >
      {/* Card 1: Complaint Details */}
      <Card sx={{ mb: 2, borderRadius: 4 }}>
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
                    {/* Use populated user data if available */}
                    {complaint.user?.userid || "N/A"}
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

      {/* Card 2: Take Action Button */}
      <Card sx={{ mb: 2, borderRadius: 4 }}>
        <CardContent>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<EditIcon />}
            onClick={handleOpenModal}
          >
            Take Action
          </Button>
        </CardContent>
      </Card>

      {/* Card 3: Activity Timeline (Stub) */}
      <Card sx={{ borderRadius: 4 }}>
        <CardContent></CardContent>
      </Card>

      {/* --- THE MODAL (DIALOG) --- */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
      >
        <TakeActionForm
          complaint={complaint}
          onClose={handleCloseModal}
          onUpdate={onUpdate}
        />
      </Dialog>
    </Box>
  );
}

// --- Component 4: The Main Resolve Component (REBUILT) ---
// This is now the clean "Single Source of Truth" version
export default function Resolve({ AdminId, issues, onUpdateSuccess }) {
  // This is the only state this component needs to manage
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // REMOVED: const [complaints, setComplaints] = useState([])
  // We will use the 'issues' prop directly.

  /**
   * This effect keeps the detail view in sync with the master list.
   * When 'issues' re-fetches from the parent, this finds the new
   * version of the selected complaint and updates the detail view.
   */
  useEffect(() => {
    if (selectedComplaint) {
      const newSelected = issues.find((c) => c._id === selectedComplaint._id);
      setSelectedComplaint(newSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issues]); // This intentionally runs ONLY when 'issues' prop changes

  /**
   * This function is passed to the modal.
   * It handles the API call and then tells the parent (AdminHome)
   * to re-fetch all data.
   */
  const handleUpdateComplaint = async (complaintId, newStatus) => {
    try {
      const response = await api.patch(`/admin/issue/${complaintId}`, {
        status: newStatus,
      });

      if (response.data.success) {
        // SUCCESS!
        // 1. Tell AdminHome to re-fetch all issues
        onUpdateSuccess();

        // 2. Alert the user
        alert("Status updated!");
        return true; // Tell the form it was a success (so it can close)
      } else {
        alert(response.data.message || "Update failed.");
        return false;
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert(error.response?.data?.message || "Update failed");
      return false; // Tell the form it failed (so it stays open)
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f4f6f8",
        height: "calc(100vh - 120px)", // Adjusted height
        overflow: "auto",
      }}
    >
      {/* Container provides max-width and centering, no more 'marginLeft' */}
      <Container maxWidth="xl" sx={{ marginLeft: "10%" }}>
        <Typography variant="h4" gutterBottom fontWeight="600">
          Resolve Complaints
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Review complaint details and take action to resolve citizen issues
        </Typography>

        {/* This is the responsive layout grid */}
        <Grid container spacing={3}>
          {/* Column 1: Complaint List */}
          {/* On mobile (xs), it's 12 cols. On small screens (sm) and up, it's 5. */}
          <Grid item xs={12} sm={5} md={4} sx={{ minWidth: "30rem" }}>
            <ComplaintList
              complaints={issues} // Use the 'issues' prop directly
              selectedId={selectedComplaint?._id}
              onComplaintSelect={setSelectedComplaint}
            />
          </Grid>

          {/* Column 2: Complaint Detail (and modal) */}
          {/* On mobile (xs), it's 12 cols. On small screens (sm) and up, it's 7. */}
          <Grid item xs={12} sm={7} md={8} sx={{ minWidth: "40rem" }}>
            <ComplaintDetail
              complaint={selectedComplaint}
              onUpdate={handleUpdateComplaint} // Pass down the update function
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
