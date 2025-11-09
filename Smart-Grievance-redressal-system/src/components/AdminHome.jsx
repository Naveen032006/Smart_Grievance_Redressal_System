import Nav from "./Nav";
import Mycomplain from "./Mycomplain";
import Analytics from "./Analytics";
import OverView from "./OverView";
// import axios from "axios"; // We won't use axios directly
import api from "../api"; // <-- 1. Import your API client (path may need adjusting)
import Resolve from "./Resolve";

import { useEffect, useState } from "react";
import { Staff } from "./Staffmanagement/Staff";
import { useCallback } from "react";

function AdminHome({
  role,
  AdminId,
  login,
  setLogin,
  title,
  navOpen,
  setNavOpen,
}) {
  const [section, setSection] = useState("overview");
  const [issues, setIssues] = useState([]);
  const [employees, setEmployees] = useState([]); // <-- 2. Add state for employees
  const [loading, setLoading] = useState(true);

  // 3. Renamed to 'fetchData' and updated to fetch everything
  const fetchData = useCallback(async () => {
    console.log("Re-fetching all admin data...");
    setLoading(true);
    try {
      // 4. Use Promise.all to fetch issues and employees in parallel
      const [issuesRes, employeesRes] = await Promise.all([
        api.get("/admin/issues"),    // <-- Use protected admin endpoint
        api.get("/admin/employees") // <-- Fetch employees
      ]);

      if (issuesRes.data.success) {
        setIssues(issuesRes.data.data || []);
      }
      if (employeesRes.data.success) {
        setEmployees(employeesRes.data.data || []);
      }

    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        console.error("No response received from server:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array is correct

  // 5. useEffect now calls fetchData
  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
            <Resolve
              AdminId={AdminId}
              issues={issues}
              employees={employees} // <-- 6. Pass employees to Resolve
              onUpdateSuccess={fetchData} // <-- Pass the correct function name
            />
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