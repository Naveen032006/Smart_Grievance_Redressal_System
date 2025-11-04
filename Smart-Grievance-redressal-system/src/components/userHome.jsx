import { useState } from "react";
import Nav from "./Nav";
import Mycomplain from "./Mycomplain";
import SubComplain from "./SubComplain";
import Analytics from "./Analytics";
import OverView from "./OverView";

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
            <OverView userid={userId} role={role} />
          </div>
        )}
        {section === "subcomplain" && (
          <div className="content1">
            <SubComplain />
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

export default UserHome;
