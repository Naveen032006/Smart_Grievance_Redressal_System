import { Paper, Typography } from "@mui/material";
import { SubissueBox } from "./subissuebox"; // Assuming this is the correct path

export function Issuesview({ issues, onLikeToggle, userId }) {
  return (
    <Paper
      elevation={1}
      sx={{ borderRadius: "16px", p: "2px", m: 2, overflow: "auto" }}
    >
      <Paper
        elevation={0}
        spacing={1}
        sx={{
          padding: "10px",
          borderRadius: "16px",
          maxHeight: "calc(100vh - 300px)", // Adjust height as needed
          overflowY: "auto",
        }}
      >
        <Typography variant="subtitle1" sx={{mb: 1}}>All Ward Issues</Typography>
        {issues.length === 0 ? (
          <Typography variant="body1">No issues reported in this ward yet.</Typography>
        ) : (
          // Map over the full 'issues' list
          issues.map((issue) => {
            return (
              <SubissueBox
                key={issue._id}
                issue={issue}
                onLikeToggle={onLikeToggle}
                userId={userId} // Pass userId down
              />
            );
          })
        )}
      </Paper>
    </Paper>
  );
}