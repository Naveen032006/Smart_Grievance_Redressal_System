import { Paper, Typography } from "@mui/material";
import { SubissueBox } from "./subissuebox";

export function Subissue({ issues }) {
  const recentIssues = issues.slice(0, 3);
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
          maxHeight: "calc(100vh - 170px)",
          overflowY: "auto",
        }}
      >
        <Typography variant="subtitle1"> Recent Sub-Issue</Typography>
        {issues.length === 0 ? (
          <Typography variant="body1">No issues reported yet.</Typography>
        ) : (
          recentIssues.map((issues) => {
            return (
              <SubissueBox
                label={issues.issueTitle}
                discription={issues.description}
                catogory={issues.category}
                status={issues.status}
                priority={issues.priority}
                date={new Date(issues.updatedAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                location={issues.location}
              />
            );
          })
        )}
      </Paper>
    </Paper>
  );
}
