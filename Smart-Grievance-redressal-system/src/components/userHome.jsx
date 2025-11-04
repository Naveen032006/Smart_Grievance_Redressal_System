import Nav from "./Nav";
import Mycomplain from "./Mycomplain";
import SubComplain from "./SubComplain";
import Analytics from "./Analytics";
import OverView from "./OverView";
import axios from "axios";
import { useEffect, useState } from "react";

function UserHome({
  role,
  userId,
  login,
  setLogin,
  title,
  navOpen,
  setNavOpen,
}) {
  const [section, setSection] = useState("overview");

  async function fetchAllIssues() {
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
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    async function loadIssues() {
      const data = await fetchAllIssues();
      setIssues(data);
    }
    loadIssues();
  }, []);

  return (
    <div className="UserBody">
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
            <OverView userid={userId} role={role} issues={issues} />
          </div>
        )}
        {section === "subcomplain" && (
          <div className="content1">
            <SubComplain issues={issues} />
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
      </div>
    </div>
  );
}

export default UserHome;
