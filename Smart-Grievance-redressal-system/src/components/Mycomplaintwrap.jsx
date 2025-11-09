import { Paper, Typography } from "@mui/material";
import { Mycomplainbox } from "./mycomplaintbox";

export function Mycomplainwrap({
  role,
  issues,
  loading,
  error,
  onDelete,
  onLikeToggle,
  userId,
}) {
  if (loading) {
    return (
      <Typography sx={{ textAlign: "center", p: 3 }}>
        Loading issues...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: "center", p: 3 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Paper
      elevation={1}
      sx={{ borderRadius: "16px", p: "2px", m: 2, overflow: "auto" }}
    >
      <Paper
        elevation={1}
        spacing={2}
        sx={{
          padding: "10px",
          borderRadius: "16px",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {issues.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: "center", p: 3 }}>
            No issues found that match your filters.
          </Typography>
        ) : (
          // Map over the issues
          issues.map((issue) => {
            return (
              // Pass the *entire issue object* and all functions
              <Mycomplainbox
                key={issue._id}
                issue={issue}
                role={role}
                onDelete={onDelete}
                onLikeToggle={onLikeToggle}
                userId={userId}
              />
            );
          })
        )}
      </Paper>
    </Paper>
  );
}