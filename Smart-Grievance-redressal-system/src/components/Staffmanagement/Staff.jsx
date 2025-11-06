import { Avatar, Box, Button, Card, CardContent, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { Header } from "../heading";
import { useState } from "react";
import { Cancel, CheckCircle, Close } from "@mui/icons-material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { green } from "@mui/material/colors";
const staffData = [
    {
        name: 'Sarah Johnson',
        role: 'Senior Field Officer',
        department: 'Infrastructure',
        email: 'sarah.johnson@urbaneye.com',
        complaints: 12,
        status: 'Active',
         successRate: "94%",
    avgResolution: "2.3 days",
    },
    {
        name: 'Mike Chen',
        role: 'Sanitation Coordinator',
        department: 'Sanitation',
        email: 'mike.chen@urbaneye.com',
        complaints: 8,
        status: 'Active',
         successRate: "94%",
    avgResolution: "2.3 days",
    },
    {
        name: 'Emily Rodriguez',
        role: 'Traffic Management',
        department: 'Transportation',
        email: 'emily.rodriguez@urbaneye.com',
        complaints: 0,
        status: 'Inactive',
         successRate: "94%",
    avgResolution: "2.3 days",
    },
    {
        name: 'David Thompson',
        role: 'Environmental Specialist',
        department: 'Environment',
        email: 'david.thompson@urbaneye.com',
        complaints: 15,
        status: 'Active',
         successRate: "94%",
    avgResolution: "2.3 days",
    },
];
export function Staff() {

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All Staff');
    const [openDialog, setOpenDialog] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
  });
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [openView, setOpenView] = useState(false);
   const handleOpenView = (staff) => {
    setSelectedStaff(staff);
    setOpenView(true);
  };
  const handleCloseView = () => setOpenView(false);

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  const handleChange = (e) => {
    setNewStaff({ ...newStaff, [e.target.name]: e.target.value });
  };

  const handleAddStaff = () => {
    console.log("New Staff:", newStaff);
    handleClose();
  };
    const filteredStaff = staffData.filter((staff) =>
        staff.name.toLowerCase().includes(search.toLowerCase()) &&
        (filter === 'All Staff' || staff.status === filter)
    );
    return (
        <>
            <Header title="Staff Management" subtitle="Manage team members and assignments" addbutton={true} setOpenDialog={setOpenDialog} />
            <Paper sx={{ maxWidth: "70rem", ml: "10rem" }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3} sx={{ p: 2 }}>
                    <TextField
                        label="Search staff members..."
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />


                    <TextField
                        select
                        label="Filter"
                        variant="outlined"
                        size="small"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}>
                        <MenuItem value="All Staff">All Staff</MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </TextField>
                </Stack >
            </Paper>
            <Grid container spacing={3}>
                {filteredStaff.map((staff) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={staff.email}>
                        <Card sx={{ borderRadius: 3, boxShadow: 3 ,p:2}}>
                            <CardContent>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar sx={{bgcolor:green[500]}}>{staff.name.split(' ').map((n) => n[0]).join('')}</Avatar>
                                    <Box>
                                        <Stack >
                                            
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {staff.name}
                                        </Typography>
                                        <Stack direction="row" spacing={2}>
                                        <Typography variant="body2" color="text.secondary">
                                            {staff.role}
                                        </Typography>
                                        
                                        <Chip 
                                    icon={staff.status === 'Active'?<PersonAddAltIcon/>:<PersonRemoveIcon/>}
                                    label={staff.status}
                                    color={staff.status === 'Active' ? 'success' : 'default'}
                                    size="small"
                                    sx={{ mt: 2,p:1 }}
                                    
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


                                <Stack  spacing={1} sx={{p:1}}>
                                    <Typography variant="caption">Email: {staff.email}</Typography>
                                    <Typography variant="caption">
                                        Assigned Complaints: {staff.complaints}
                                    </Typography>
                                </Stack>


                                <Stack direction="row" spacing={1} mt={2}>
                                    <Button size="small" variant="outlined"  color="diabled" startIcon={<RemoveRedEyeOutlinedIcon />} sx={{borderRadius: 2, textTransform: "none"}} onClick={()=>handleOpenView(staff)}>View</Button>
                                    <Button size="small" variant="outlined" color="diabled" startIcon={<EditOutlinedIcon />} sx={{borderRadius: 2, textTransform: "none"}}>Edit</Button>
                                    {staff.status === 'Active' ? (
                                        <Button size="small" variant="outlined" color="error"  sx={{borderRadius: 2, textTransform: "none"}} startIcon={<Cancel />}>
                                            Deactivate
                                        </Button>
                                    ) : (
                                        <Button size="small" variant="outlined" color="success"   sx={{borderRadius: 2, textTransform: "none"}} startIcon={<CheckCircle />}>
                                            Activate
                                        </Button>
                                    )}
                                </Stack>


                               
                            </CardContent>
                        </Card>
                    </Grid>
                    
                ))}
            </Grid>
             <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{color:"black"}}>Add New Staff Member</DialogTitle>
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
                helperText="enter name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={newStaff.email}
                onChange={handleChange}
                placeholder="Enter email address"
                helperText="enter email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Role"
                name="role"
                value={newStaff.role}
                onChange={handleChange}
                placeholder="e.g. Field Officer"
                helperText="enter role"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Department"
                name="department"
                value={newStaff.department}
                onChange={handleChange}
                placeholder="Select department"
                helperText="select department"
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
       <Dialog open={openView} onClose={handleCloseView} maxWidth="sm" fullWidth >
        {selectedStaff && (
          <>
            <DialogTitle sx={{color:"black", display: "flex", justifyContent: "space-between" }}>
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
                  sx={{
                    bgcolor: "teal",
                    width: 70,
                    height: 70,
                    fontSize: 24,
                  }}
                >
                  {selectedStaff.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar>

                <Typography variant="h6">{selectedStaff.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedStaff.role}
                </Typography>

                <Stack direction="row" spacing={1} justifyContent="center">
                  <Chip label={selectedStaff.department} color="primary" />
                  <Chip
                    label={selectedStaff.status}
                    color={
                      selectedStaff.status === "Active" ? "success" : "default"
                    }
                  />
                </Stack>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography fontWeight="bold">Contact Information</Typography>
                  <Typography variant="body2" mt={1}>
                    <strong>Email:</strong> {selectedStaff.email}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography fontWeight="bold">Work Statistics</Typography>
                  <Typography variant="body2" mt={1}>
                    <strong>Assigned Complaints:</strong>{" "}
                    {selectedStaff.complaints}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Success Rate:</strong> {selectedStaff.successRate}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Avg. Resolution Time:</strong>{" "}
                    {selectedStaff.avgResolution}
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