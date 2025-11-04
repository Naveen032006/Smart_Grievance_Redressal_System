import { Paper, Stack } from "@mui/material";
import { AnalyticsBox } from "./analyticsbox";
import {
  CartesianGrid,
  Legend,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { useState } from "react";
export function Alayticswrap() {
  const [animateKey, setAnimatekey] = useState(0);
  const [animateKey2, setAnimatekey2] = useState(0);
  const data = [
    { month: "Jan", complaints: 10, resolved: 8 },
    { month: "Feb", complaints: 15, resolved: 10 },
    { month: "Mar", complaints: 12, resolved: 9 },
    { month: "Apr", complaints: 18, resolved: 15 },
    { month: "May", complaints: 9, resolved: 8 },
  ];
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f", "#8dd1e1"];
  const categoryData = [
    { category: "Road", count: 18 },
    { category: "Water", count: 14 },
    { category: "Electricity", count: 22 },
    { category: "Garbage", count: 10 },
    { category: "Others", count: 8 },
  ];
  const report = [
    { title: "Resolution Rate" },
    { title: "Total Submitted" },
    { title: "Avg Resolution" },
    { title: "Impact Score" },
  ];
  const triggerAnimation = (setAnimatekey) => {
    setAnimatekey((prev) => prev + 1);
  };
  return (
    <Paper
      elevation={0}
      sx={{ padding: "10px", textAlign: "center", justifyContent: "center" }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        {report.map((data) => (
          <AnalyticsBox title={data.title} />
        ))}
      </Stack>
      <Paper sx={{ p: 2, borderRadius: 5, boxShadow: 2 }}>
        <div
          style={{
            width: "100%",
            height: "20rem",
            margin: "20px",
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",

            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1", width: "50%", margin: "10px" }}>
            <h3 style={{ textAlign: "center" }}>Monthly complaint Analytics</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                onClick={() => {
                  triggerAnimation(setAnimatekey);
                }}
                key={animateKey}
              >
                <defs>
                  <linearGradient
                    id="colorComplaints"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorResolved"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="complaints"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorComplaints)"
                  isAnimationActive={true}
                  animationDuration={1000}
                />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorResolved)"
                  isAnimationActive={true}
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ flex: "1", width: "50%", margin: "10px" }}>
            <h3>Issues per category</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                onClick={() => {
                  triggerAnimation(setAnimatekey2);
                }}
                key={animateKey2}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" height={60} />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="count"
                  name="Number of issues"
                  radius={[8, 8, 0, 0]}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Paper>
    </Paper>
  );
}
