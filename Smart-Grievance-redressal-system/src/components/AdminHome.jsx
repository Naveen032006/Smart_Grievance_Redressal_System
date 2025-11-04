import { useState } from "react";
import Nav from "./Nav";
import Mycomplain from "./Mycomplain";
import Analytics from "./Analytics";
import OverView from "./OverView";

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
            <OverView userid={AdminId} role={role} />
          </div>
        )}
        {section === "mycomplain" && (
          <div className="content2">
            <Mycomplain role={role} />
          </div>
        )}
        {section === "analytics" && (
          <div className="content3">
            <Analytics />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminHome;
