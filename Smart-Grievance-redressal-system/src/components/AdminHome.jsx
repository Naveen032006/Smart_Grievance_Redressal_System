import Nav from "./Nav";
import Mycomplain from "./Mycomplain";
import Analytics from "./Analytics";
import OverView from "./OverView";
import axios from "axios";
import Resolve from "./Resolve";

import { useEffect, useState } from "react";
import { Staff } from "./Staffmanagement/Staff";

function AdminHome({
  role,
  AdminId,
  login,
  setLogin,
  title,
  navOpen,
  setNavOpen,
}) {
  const [section, setSection] = useState("overview"); // 'overview' | 'subcomplain' | 'mycomplain' | 'analytics'
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchAdminIssues() {
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
  useEffect(() => {
    async function loadIssues() {
      const data = await fetchAdminIssues();
      setIssues(data);
    }
    loadIssues();
  }, []);

  return (
    <div className="AdminBody">
      {navOpen && (
        <Nav
          section={section}
          setSection={setSection}
          setnavi={setNavOpen}
          login={login}
          loginset={setLogin}
          role={role}
        />
      )}

      <div
        className="BodyBody11"
        style={{ opacity: navOpen ? 0.5 : 1 }}
        onClick={() => setNavOpen(false)}
      >
        {section === "overview" && (
          <div className="content1">
            <OverView userid={AdminId} role={role} issues={issues} />
          </div>
        )}

        {section === "resolve" && (
          <div className="content1">
            <Resolve AdminId={AdminId} issues={issues} />
          </div>
        )}

        {section === "mycomplain" && (
          <div className="content2">
            <Mycomplain role={role} issues={issues} />
          </div>
        )}
        {section === "analytics" && (
          <div className="content3">
            <Analytics issues={issues} />
          </div>
        )}
        {section === "staff" && (
          <div className="content3">
            <Staff />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminHome;
