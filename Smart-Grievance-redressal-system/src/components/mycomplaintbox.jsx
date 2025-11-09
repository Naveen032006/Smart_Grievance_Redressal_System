import {
  Box,
  Button,
  Chip,
  Dialog,
  Paper,
  Stack,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Avatar,
} from "@mui/material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { alpha } from "@mui/material/styles";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import Color from "./Color";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { LikeButton } from "./likebotton"; // Import LikeButton

// Accept the 'issue' object and all functions
export function Mycomplainbox({
  issue,
  role,
  onDelete,
  onLikeToggle,
  userId,
}) {
  const [pop, setpop] = useState(false);

  // Destructure all data from the 'issue' prop
  const {
    _id,
    issueTitle,
    description,
    category,
    status,
    updatedAt,
    location,
    actionNotes, // This is the 'response'
    assignedTo,  // This is the 'assigned staff'
    image,
    likeCount,
    likes,       // For checking if user has liked
  } = issue;

  // --- Helper Functions ---
  const getcolor = (SStatus) => {
    switch (SStatus?.toLowerCase()) {
      case "pending": return "warning";
      case "in-progress": return "info"; // Match your database
      case "resolved": return "success";
      case "rejected": return "error";
      default: return "info";
    }
  };

  const getPriorityFromCount = (count = 0) => {
    if (count > 5) return { label: "High", color: "error" };
    if (count > 3) return { label: "Medium", color: "warning" };
    return { label: "Low", color: "info" };
  };

  const getIcon = (SStatus) => {
    switch (SStatus?.toLowerCase()) {
      case "pending": return AccessTimeIcon;
      case "in-progress": return ReportProblemOutlinedIcon;
      case "resolved": return DoneOutlineIcon;
      case "rejected": return CancelIcon;
      default: return AccessTimeIcon;
    }
  };
  
  // --- Calculate values from destructured props ---
  const Icon = getIcon(status);
  const priority = getPriorityFromCount(likeCount);
  const date = new Date(updatedAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  
  // Check if the current user has liked this issue
  const userHasLiked = userId && likes && likes.includes(userId);
  
  // This logic determines if the "Management Response" block shows
  const hasUpdate = actionNotes || assignedTo;

  return (
    <>
      <Paper elevation={1} sx={{ borderRadius: "16px", p: 2, m: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Icon color={getcolor(status)} fontSize="small" />
            <Typography variant="h5" fontWeight="bold">
              {issueTitle}
            </Typography>
          </Stack>
          <Chip
            label={priority.label}
            variant="outlined"
            sx={{
              backgroundColor: (theme) => alpha(theme.palette[priority.color].main, 0.8),
              color: Color.secondary,
            }}
          />
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Stack direction="row" spacing={0.5} alignItems="center">
            <RoomOutlinedIcon color="disabled" fontSize="small" />
            <Typography variant="body2">{location}</Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <CalendarTodayOutlinedIcon color="disabled" fontSize="small" />
            <Typography variant="body2">{date}</Typography>
          </Stack>
          <Chip label={category} variant="outlined" sx={{ textDecoration: "none" }} />
        </Stack>
        <Stack>
          <Typography variant="body1" sx={{ padding: "5px" }}>
            {description}
          </Typography>
        </Stack>
        
        {/* Show update based on new logic */}
        {hasUpdate && (
          <Stack
            spacing={0.5}
            direction="column"
            sx={{
              backgroundColor: "#e3edfcff",
              color: "blue",
              borderRadius: "10px",
              padding: "5px",
              paddingLeft: "10px",
              border: "1px solid #c3b7fcff",
            }}
          >
            <Typography variant="caption" fontWeight="bold" color="info">
              Management Response:
            </Typography>
            <Typography variant="caption" sx={{ paddingLeft: 2 }}>
              {actionNotes || "This issue has been assigned."}
            </Typography>
          </Stack>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px",
          }}
        >
          <Chip
            label={status}
            color={getcolor(status)}
            variant="filled"
          />
          <Stack direction="row" spacing={0.5} alignItems="center">
            
            <Button
              variant="outlined"
              size="medium"
              sx={{ borderRadius: 3, textTransform: "none" }}
              startIcon={<RemoveRedEyeOutlinedIcon />}
              color="info"
              onClick={() => setpop(true)}
            >
              View details
            </Button>
            
            {/* Only show Cancel button if the role is 'user' */}
            {role === 'user' && (
              <Button
                variant="outlined"
                size="medium"
                sx={{ borderRadius: 3, textTransform: "none" }}
                startIcon={<CancelOutlinedIcon />}
                color="error"
                onClick={() => onDelete(_id)} // <-- Call the delete function
                disabled={status !== 'Pending'} // <-- Disable if not pending
              >
                Cancel
              </Button>
            )}
          </Stack>
        </Box>
      </Paper>
      
      {/* --- "View Details" Dialog --- */}
      <Dialog open={pop} onClose={() => setpop(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "black" }}>
              {issueTitle}
            </Typography>
            <Chip
              label={priority.label}
              variant="outlined"
              sx={{
                backgroundColor: (theme) => alpha(theme.palette[priority.color].main, 0.8),
                color: Color.secondary,
              }}
            />
          </Box>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2}>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Chip label={status} color={getcolor(status)} variant="filled" />
              <Chip label={category} variant="outlined" />
            </Box>

            <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" spacing={0.5} alignItems="center">
                <RoomOutlinedIcon color="disabled" fontSize="small" />
                <Typography variant="body2">{location}</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <CalendarTodayOutlinedIcon color="disabled" fontSize="small" />
                <Typography variant="body2">{date}</Typography>
              </Stack>
            </Stack>

            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Description:
              </Typography>
              <Typography variant="body1" sx={{ padding: "10px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
                {description}
              </Typography>
            </Box>
            
            {image && (
              <img
                src={image}
                alt="Complaint attachment"
                style={{
                  maxWidth: "100%",
                  borderRadius: "8px",
                  objectFit: "contain",
                }}
              />
            )}

            {/* --- SHOW ASSIGNED STAFF --- */}
            {assignedTo ? (
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Assigned To:
                </Typography>
                <Stack direction="row" spacing={1} sx={{ 
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    padding: "10px"
                }}>
                  <Avatar sx={{ width: 28, height: 28, fontSize: '0.9rem' }}>
                    {assignedTo.name.split(" ").map((n) => n[0]).join("")}
                  </Avatar>
                  <Typography variant="body2" sx={{fontWeight: 500}}>
                    {assignedTo.name} ({assignedTo.department})
                  </Typography>
                </Stack>
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Not yet assigned to a staff member.
              </Typography>
            )}

            {/* --- SHOW RESPONSE NOTES --- */}
            {actionNotes && (
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Management Response:
                </Typography>
                <Stack
                  spacing={0.5}
                  direction="column"
                  sx={{
                    backgroundColor: "#e3edfcff",
                    borderRadius: "10px",
                    padding: "10px",
                    border: "1px solid #c3b7fcff",
                  }}
                >
                  <Typography variant="body2">{actionNotes}</Typography>
                </Stack>
              </Box>
            )}
            
            {/* --- ADD LIKE BUTTON HERE --- */}
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
               <LikeButton
                count={likeCount || 0}
                liked={userHasLiked}
                onClick={() => onLikeToggle(_id)}
              />
            </Box>

          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setpop(false)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}