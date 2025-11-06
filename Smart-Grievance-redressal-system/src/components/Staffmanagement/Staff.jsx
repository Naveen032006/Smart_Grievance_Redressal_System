import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Header } from "../heading"; // Assuming 'heading' is in the parent folder
import {
  Cancel,
  CheckCircle,
  Close,
  Edit as EditOutlinedIcon,
  PersonAddAlt as PersonAddAltIcon,
  PersonRemove as PersonRemoveIcon,
  RemoveRedEyeOutlined as RemoveRedEyeOutlinedIcon,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";
import api from "../../api"; // Path is two levels up to 'src/api.js'

export function Staff() {
  const [staffList, setStaffList] = useState([]); // State for real data from API
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Staff");
  const [openDialog, setOpenDialog] = useState(false);

  // State for the "Add New Staff" form
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    department: "",
  });

  const [selectedStaff, setSelectedStaff] = useState(null);
  const [openView, setOpenView] = useState(false);

  // --- Fetch employee data from backend when component loads ---
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await api.get("/admin/employees"); // API call
        if (response.data.success) {
          setStaffList(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
      setLoading(false);
    };
    fetchEmployees();
  }, []); // Empty array runs this once on mount

  // --- Dialog "View" Handlers ---
  const handleOpenView = (staff) => {
    setSelectedStaff(staff);
    setOpenView(true);
  };
  const handleCloseView = () => setOpenView(false);

  // --- Dialog "Add" Handlers ---
  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => {
    setOpenDialog(false);
    // Reset form
    setNewStaff({
      name: "",
      email: "",
      phone: "",
      jobTitle: "",
      department: "",
    });
  };

  // Update state as admin types in the form
  const handleChange = (e) => {
    setNewStaff({ ...newStaff, [e.target.name]: e.target.value });
  };

  // --- Handle "Add Staff" button click ---
  const handleAddStaff = async () => {
    try {
      // Send the newStaff state to the backend
      const response = await api.post("/admin/employee", newStaff);

      if (response.data.success) {
        // Add the new employee (from response) to the top of the list
        setStaffList([response.data.data, ...staffList]);

        // --- Show the temporary password to the admin ---
        alert(
          `Employee created successfully!\n\nTemporary Password: ${response.data.tempPassword}\n\nPlease give this password to the new employee.`
        );
        handleClose();
      }
    } catch (error) {
      console.error("Failed to create employee:", error);
      alert(error.response?.data?.message || "Error creating employee.");
    }
  };

  // --- Handle "Activate/Deactivate" button click ---
  const handleStatusChange = async (employeeId, newStatus) => {
    // Confirm the action
    if (
      !window.confirm(
        `Are you sure you want to set this employee to "${newStatus}"?`
      )
    ) {
      return;
    }

    try {
      // Call the new API endpoint
      const response = await api.patch(`/admin/employee/${employeeId}/status`, {
        status: newStatus,
      });

      if (response.data.success) {
        alert(response.data.message);

        // Update the staffList state to show the change immediately
        setStaffList((currentList) =>
          currentList.map((staff) =>
            staff._id === employeeId ? response.data.data : staff
          )
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert(error.response?.data?.message || "Error updating status.");
    }
  };

  // --- Filter the real 'staffList' state ---
  const filteredStaff = staffList.filter(
    (staff) =>
      staff.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All Staff" || staff.status === filter)
  );

  return (
    <>
      <Header
        title="Staff Management"
        subtitle="Manage team members and assignments"
        addbutton={true}
        setOpenDialog={setOpenDialog}
      />

      {/* --- Search and Filter Bar --- */}
      <Paper sx={{ maxWidth: "70rem", ml: "10rem" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          mb={3}
          sx={{ p: 2 }}
        >
          <TextField
            label="Search staff members..."
            variant="outlined"
            size="small"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TextField
            select
            label="Filter"
            variant="outlined"
            size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="All Staff">All Staff</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </Stack>
      </Paper>

      {/* --- Staff Card Grid --- */}
      <Grid container spacing={3}>
        {loading ? (
          <Typography sx={{ p: 3, ml: "10rem" }}>
            Loading staff...
          </Typography>
        ) : (
          filteredStaff.map((staff) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={staff._id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: green[500] }}>
                      {staff.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>
                    <Box>
                      <Stack>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {staff.name}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                          <Typography variant="body2" color="text.secondary">
                            {staff.jobTitle}
                          </Typography>
                          <Chip
                            icon={
                              staff.status === "Active" ? (
                                <PersonAddAltIcon />
                              ) : (
                                <PersonRemoveIcon />
                              )
                            }
                            label={staff.status}
                            color={
                              staff.status === "Active" ? "success" : "default"
                            }
                            size="small"
                            sx={{ mt: 2, p: 1 }}
                          />
                        </Stack>
                      </Stack>
                      <Chip
                        label={staff.department}
                        variant="outlined"
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </Stack>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Typography variant="caption">
                      Email: {staff.email}
                    </Typography>
                    <Typography variant="caption">
                      Phone: {staff.phone}
                    </Typography>
                    <Typography variant="caption">
                      Ward: {staff.wardNumber}
                    </Typography>
                    <Typography variant="caption">
                      Assigned Complaints: {staff.assignedComplaintsCount}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} mt={2}>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      startIcon={<RemoveRedEyeOutlinedIcon />}
                      sx={{ borderRadius: 2, textTransform: "none" }}
                      onClick={() => handleOpenView(staff)}
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      startIcon={<EditOutlinedIcon />}
                      sx={{ borderRadius: 2, textTransform: "none" }}
                    >
                      Edit
                    </Button>
                    {staff.status === "Active" ? (
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        sx={{ borderRadius: 2, textTransform: "none" }}
                        startIcon={<Cancel />}
                        onClick={() => handleStatusChange(staff._id, "Inactive")}
                      >
                        Deactivate
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="outlined"
                        color="success"
                        sx={{ borderRadius: 2, textTransform: "none" }}
                        startIcon={<CheckCircle />}
                        onClick={() => handleStatusChange(staff._id, "Active")}
                      >
                        Activate
                      </Button>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* --- "Add New Staff" Dialog --- */}
      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: "black" }}>Add New Staff Member</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={newStaff.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={newStaff.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={newStaff.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                name="jobTitle"
                value={newStaff.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Field Officer"
                required
              />
            </Grid>

            {/* Password and WardNumber fields are removed */}

            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Department"
                name="department"
                value={newStaff.department}
                onChange={handleChange}
                required
              >
                <MenuItem value="Infrastructure">Infrastructure</MenuItem>
                <MenuItem value="Sanitation">Sanitation</MenuItem>
                <MenuItem value="Transportation">Transportation</MenuItem>
                <MenuItem value="Environment">Environment</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleAddStaff}
            variant="contained"
            color="success"
            sx={{ textTransform: "none" }}
          >
            Add Staff Member
          </Button>
        </DialogActions>
      </Dialog>

      {/* --- "View Staff Details" Dialog --- */}
      <Dialog open={openView} onClose={handleCloseView} maxWidth="sm" fullWidth>
        {selectedStaff && (
          <>
            <DialogTitle
              sx={{
                color: "black",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Staff Member Details
              <Button
                onClick={handleCloseView}
                color="inherit"
                size="small"
                sx={{ minWidth: "auto" }}
              >
                <Close />
              </Button>
            </DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2} alignItems="center" textAlign="center">
                <Avatar
                  sx={{ bgcolor: "teal", width: 70, height: 70, fontSize: 24 }}
                >
                  {selectedStaff.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar>
                <Typography variant="h6">{selectedStaff.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedStaff.jobTitle}
                </Typography>
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Chip label={selectedStaff.department} color="primary" />
                  
                  {/* --- THIS IS THE FIXED BLOCK --- */}
                  <Chip
                    label={selectedStaff.status}
                    color={
                      selectedStaff.status === "Active" ? "success" : "default"
                    }
                  />
                  {/* --- END OF FIX --- */}

                </Stack>
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography fontWeight="bold">Contact Information</Typography>
                  <Typography variant="body2" mt={1}>
                    <strong>Email:</strong> {selectedStaff.email}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    <strong>Phone:</strong> {selectedStaff.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography fontWeight="bold">Work Details</Typography>
                  <Typography variant="body2" mt={1}>
                    <strong>Assigned Ward:</strong> {selectedStaff.wardNumber}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    <strong>Assigned Complaints:</strong>{" "}
                    {selectedStaff.assignedComplaintsCount}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
}