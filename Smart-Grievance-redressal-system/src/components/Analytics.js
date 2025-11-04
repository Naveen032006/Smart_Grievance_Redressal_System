import { Header } from "./heading";
import { Alayticswrap } from "./analyticswrap";

const Analytics = () => {
  const aStyle = {
    maxHeight: "calc(100vh - 120px)",
    overflowY: "auto",
    padding: "1rem",
  };
  console.log("inside Analytics");
  return (
    <div style={aStyle}>
      <Header title="Analytics" subtitle="Your complaint submission insights" />
      <Alayticswrap />
    </div>
  );
};
export default Analytics;
