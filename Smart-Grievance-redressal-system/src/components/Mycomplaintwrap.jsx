import { Paper, Typography } from "@mui/material";
import { Mycomplainbox } from "./mycomplaintbox";
// import { useState } from "react"; // No longer needed

export function Mycomplainwrap({ role, issues }) {
  // const [status, setstatus] = useState(""); // <-- This state was unused

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
          overflowY: "scroll",
        }}
      >
        {issues.length === 0 ? (
          <Typography variant="body1">No issues reported yet.</Typography>
        ) : (
          // --- FIX: Renamed 'issues' to 'issue' ---
          issues.map((issue) => { 
            return (
              <Mycomplainbox
                key={issue._id} // <-- Add a unique key
                label={issue.issueTitle}
                discription={issue.description}
                catogory={issue.category}
                // setstatus={setstatus} // You probably don't need this
                status={issue.status}
                // priority={issue.priority} // Your issueModel doesn't have this
                date={new Date(issue.updatedAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                location={issue.location}
                // response={issue.response} // Your issueModel doesn't have this
                // update={issue.update} // Your issueModel doesn't have this
                selectedImage={issue.image}
                likeCount={issue.likeCount || 0} // Pass likeCount
                issueId={issue._id} // Pass the ID for liking/updating
                role={role}
              />
            );
          })
        )}
      </Paper>
    </Paper>
  );
}