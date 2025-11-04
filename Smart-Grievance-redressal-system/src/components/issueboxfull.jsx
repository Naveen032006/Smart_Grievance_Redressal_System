import { Paper, Stack, Typography } from "@mui/material";
import { IssueBox } from "./issuebox";

import axios from "axios";
import { useEffect, useState } from "react";

async function fetchAllIssues() {
  try {
    const response = await axios.get("http://localhost:4000/api/user/issues");

    // Check if the data structure is as expected
    console.log("Full API response:", response.data);

    const issues = response.data?.data || [];
    console.log("Fetched issues:", issues);

    return issues; // ✅ return so you can use it elsewhere
  } catch (error) {
    // More detailed error logging
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
    } else if (error.request) {
      console.error("No response received from server:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
  }
}

export function Issuesview() {
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    async function loadIssues() {
      const data = await fetchAllIssues();
      setIssues(data);
    }
    loadIssues();
  }, []);
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
