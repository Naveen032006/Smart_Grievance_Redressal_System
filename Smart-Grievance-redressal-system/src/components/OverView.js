import { Issuesview } from "./issueboxfull";
import OverHeader from "./OverHeader";
import { Smallboxview } from "./smallboxfull";

const OverView = ({ user,role }) => {
  console.log("Inside Overview");
  const oStyle = {
    maxHeight: "calc(100vh - 120px)",
    overflowY: "auto",
  };
  return (
    <div style={oStyle}>
      <div
        style={{ display: "flex", justifyContent: "center", fontSize: "20px" }}
      >
        <OverHeader title={user} />
      </div>
      <Smallboxview />
      <Issuesview />
    </div>
  );
};
export default OverView;
