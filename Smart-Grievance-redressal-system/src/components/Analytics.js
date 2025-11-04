import { Header } from "./heading";
import { Alayticswrap } from "./analyticswrap";

const Analytics = ({ issues }) => {
  const aStyle = {
    maxHeight: "calc(100vh - 120px)",
    overflowY: "auto",
    padding: "1rem",
  };
  console.log("inside Analytics");

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = issues.reduce((acc, issue) => {
    // ✅ Safely handle missing or invalid createdAt
    if (!issue.createdAt) return acc; // skip if no date

    const date = new Date(issue.createdAt);
    if (isNaN(date)) return acc; // skip invalid dates

    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];

    // ✅ Find or create entry for that month
    let monthData = acc.find((d) => d.month === monthName);
    if (!monthData) {
      monthData = { month: monthName, complaints: 0, resolved: 0 };
      acc.push(monthData);
    }

    // ✅ Increment counts
    monthData.complaints += 1;
    if (issue.status?.toLowerCase() === "resolved") {
      monthData.resolved += 1;
    }

    return acc;
  }, []);

  console.log(data);
  const categoryCounts = issues.reduce((acc, issue) => {
    const cat = issue.category || "Unknown";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});
  const categoryArray = Object.entries(categoryCounts).map(
    ([category, count]) => ({
      category,
      count,
    })
  );

  return (
    <div style={aStyle}>
      <Header title="Analytics" subtitle="Your complaint submission insights" />
      <Alayticswrap categorydata={categoryArray} data={data} />
    </div>
  );
};
export default Analytics;
