import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import "./log.css";

import { LikeButton } from "./likebotton"; // Corrected spelling

// Helper function
const getPriorityFromCount = (count = 0) => {
  if (count > 5) return { label: "High", color: "error" };
  if (count > 3) return { label: "Medium", color: "warning" };
  return { label: "Low", color: "info" };
};

// It now accepts an 'issue' object and a function
export function SubissueBox({ issue, onLikeToggle }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "warning";
      case "in progress":
        return "info";
      case "resolved":
        return "success";
      case "rejected":
        return "error";
      default:
        return "info";
    }
  };
  console.log(issue);
  // Get all values from the 'issue' prop
  const {
    issueTitle,
    description,
    category,
    status,
    date,
    location,
    likeCount,
    userHasLiked, // We need this for the LikeButton
  } = issue;

  const priority = getPriorityFromCount(likeCount);

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "12px",
        p: "12px",
        mb: 2,
        maxHeight: 200,
      }}
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
        <Typography variant="caption" Wrap>
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

        {/* Pass the props down to the LikeButton.
            The button is now fully "controlled" by the parent.
          */}
        <LikeButton
          count={issue.likeCount}
          liked={issue.userHasLiked}
          onClick={() => onLikeToggle(issue._id, issue.userHasLiked)}
        />
      </Box>
    </Paper>
  );
}