import { Stack } from "@mui/material";
// Assuming 'Smallbox' is a default export, otherwise use { Smallbox }
import { Smallbox } from "./smallbox";
import React, { useMemo } from "react"; // Import useMemo for optimization

/* 1. REMOVE the hard-coded 'item' array from here.
  We will create it dynamically inside the component.
*/

export function Smallboxview({ issues = [] }) {
  // Added default value

  /* 2. OPTIMIZATION: Wrap all calculations in a 'useMemo' hook.
    This prevents re-calculating on every render, and only re-runs
    if the 'issues' prop actually changes.
  */
  const statsData = useMemo(() => {
    // 3. Your calculation logic is perfect
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

    /* 4. CREATE the new 'statsData' array using your calculated counts.
      This REPLACES the hard-coded 'item' array.
    */
    return [
      {
        status: "Total Issues",
        nos: totalCount, // Use the dynamic variable
      },
      {
        status: "Pending",
        nos: statusCounts.pending, // Use the dynamic variable
      },
      {
        status: "In Progress",
        nos: statusCounts.inProgress, // Use the dynamic variable
      },
      {
        status: "Resolved",
        nos: statusCounts.resolved, // Use the dynamic variable
      },
      // You could also add 'Closed' if you want
      // {
      //   status: "Closed",
      //   nos: statusCounts.closed,
      // },
    ];
  }, [issues]); // The dependency array: re-run only when 'issues' changes

  return (
    <Stack direction="row" spacing={2} sx={{ m: 2 }}>
      {/* 5. MAP over your new 'statsData' array (not 'item') */}
      {statsData.map((item) => {
        return (
          <Smallbox
            // 6. Added a 'key' prop, which React needs for lists
            key={item.status}
            status={item.status}
            nos={item.nos}
          />
        );
      })}
    </Stack>
  );
}
