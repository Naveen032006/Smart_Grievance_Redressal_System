import { Paper, Typography } from "@mui/material";
import { Mycomplainbox } from "./mycomplaintbox";
import download from "./download.jpeg";
import { useState } from "react";

export function Mycomplainwrap({ role, issues }) {
  const [status, setstatus] = useState("");

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
          issues.map((issues) => {
            return (
              <Mycomplainbox
                label={issues.issueTitle}
                discription={issues.description}
                catogory={issues.category}
                setstatus={setstatus}
                status={issues.status}
                priority={issues.priority}
                date={new Date(issues.updatedAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                location={issues.location}
                response={issues.response}
                update={issues.update}
                selectedImage={issues.image}
                role={role}
              />
            );
          })
        )}
      </Paper>
    </Paper>
  );
}
