import { Stack } from "@mui/material";
import { Smallbox } from "./smallbox";
import React, { useMemo } from "react"; 

export function Smallboxview({ issues = [] }) {
  
  const statsData = useMemo(() => {
    const initialCounts = {
      pending: 0,
      inProgress: 0,
      resolved: 0,
      closed: 0,
    };

    const statusCounts = issues.reduce((acc, complaint) => {
      switch (complaint.status) {
        case "Pending":
          acc.pending++;
          break;
        case "In-Progress":
          acc.inProgress++;
          break;
        case "Resolved":
          acc.resolved++;
          break;
        case "Closed":
          acc.closed++;
          break;
        default:
          break;
      }
      return acc;
    }, initialCounts);

    const totalCount = issues.length;

    return [
      {
        status: "Total Issues",
        nos: totalCount,
      },
      {
        status: "Pending",
        nos: statusCounts.pending,
      },
      {
        status: "In Progress",
        nos: statusCounts.inProgress,
      },
      {
        status: "Resolved",
        nos: statusCounts.resolved,
      },
    ];
  }, [issues]); // Re-run only when 'issues' changes

  return (
    <Stack direction="row" spacing={2} sx={{ m: 2 }}>
      {statsData.map((item) => {
        return (
          <Smallbox
            key={item.status}
            status={item.status}
            nos={item.nos}
          />
        );
      })}
    </Stack>
  );
}