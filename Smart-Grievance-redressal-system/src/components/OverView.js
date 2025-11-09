import { Issuesview } from "./issueboxfull";
import OverHeader from "./OverHeader";
import { Smallboxview } from "./smallboxfull";

const OverView = ({ user, role, issues, onLikeToggle, currentUserId }) => {
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
      {/* Smallboxview just needs the issues to calculate stats */}
      <Smallboxview issues={issues} />

      {/* Issuesview needs all props to handle likes */}
      <Issuesview
        issues={issues}
        onLikeToggle={onLikeToggle}
        userId={currentUserId}
      />
    </div>
  );
};
export default OverView;
