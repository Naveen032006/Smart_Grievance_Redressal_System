import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import "./log.css"; // Assuming you have this file
import { LikeButton } from "./likebotton";

// Helper function
const getPriorityFromCount = (count = 0) => {
  if (count > 5) return { label: "High", color: "error" };
  if (count > 3) return { label: "Medium", color: "warning" };
  return { label: "Low", color: "info" };
};

export function SubissueBox({ issue, onLikeToggle, userId }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "warning";
      case "in-progress": return "info";
      case "resolved": return "success";
      case "rejected": return "error";
      case "closed": return "default";
      default: return "info";
    }
  };

  const {
    _id,
    issueTitle,
    description,
    category,
    status,
    createdAt,
    location,
    likeCount,
    likes, // <-- Get the 'likes' array
  } = issue;

  // Check if the current user's ID is in the issue's 'likes' array
  const userHasLiked = userId && likes && likes.includes(userId);

  const date = new Date(createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const priority = getPriorityFromCount(likeCount || 0);
  
  return (
    <Paper
      elevation={3}
      sx={{ borderRadius: "12px", p: "12px", mb: 2, maxHeight: 200 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle2" fontWeight="bold">
          {issueTitle}
        </Typography>
        <Chip
          label={priority.label}
          color={priority.color}
          variant="filled"
          size="small"
        />
      </Box>

      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 1 }}>
        <RoomOutlinedIcon color="disabled" fontSize="small" />
        <Typography variant="caption">{location}</Typography>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
        <Chip
          label={status}
          color={getStatusColor(status)}
          variant="filled"
          size="small"
        />
        <CalendarTodayOutlinedIcon color="disabled" fontSize="small" />
        <Typography variant="caption">{date}</Typography>
      </Stack>

      <Stack sx={{ padding: "2px", mt: 1 }}>
        <Typography variant="caption" > 
          {description}
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Chip label={category} variant="outlined" size="small" />

        <LikeButton
          count={likeCount || 0}
          liked={userHasLiked} // Pass the calculated 'liked' status
          onClick={() => onLikeToggle(_id)} // Call parent function
        />
      </Box>
    </Paper>
  );
}