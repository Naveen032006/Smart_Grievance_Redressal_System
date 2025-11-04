import { Paper, Stack, Typography } from "@mui/material";
import { IssueBox } from "./issuebox";

export function Issuesview({ issues }) {
  return (
    <Paper elevation={1} sx={{ borderRadius: "16px", p: 2, m: 2 }}>
      <Typography variant="subtitle1"> Recent Issue</Typography>
      <Stack spacing={2}>
        {issues.length === 0 ? (
          <Typography variant="body1">No issues reported yet.</Typography>
        ) : (
          issues.map((issue) => {
            return (
              <IssueBox
                label={issue.issueTitle}
                discription={issue.description}
                catogory={issue.category}
                status={issue.status}
                priority={issue.priority}
                date={new Date(issue.updatedAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                location={issue.location}
              />
            );
          })
        )}
      </Stack>
    </Paper>
  );
}
