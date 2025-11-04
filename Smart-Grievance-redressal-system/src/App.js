import "./App.css";
import color from "./components/Color";
import Hnav from "./components/Hnav";
import Contact from "./components/contactDetails/Contact";
import UserHome from "./components/userHome";
import AdminHome from "./components/AdminHome";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Ward from "./components/warddetails/Ward";

function Header(props) {
  const hStyle = {
    color: color.white,
    textAlign: "center",
    margin: "0",
  };
  return <h1 style={hStyle}>Hi! {props.title}</h1>;
}

function App() {
  const [login, setLogin] = useState(true);
  const [userId, setUserId] = useState("Login");
  const [role, setRole] = useState("user");
  const [navOpen, setNavOpen] = useState(false);
  const title = role === "Admin" ? "Welcome, Resolver" : "Welcome Citizen";
  const buttonStyle = {
    background: color.secondary,
    color: color.primary,
    width: "5%",
    marginTop: ".5%",
    height: "50px",
    flex: "0 1 auto",
    borderRadius: "25px",
    borderWidth: "0",
    cursor: "pointer",
    fontSize: "100%",
    marginLeft: "auto",
  };
  return login ? (
    <>
      <div id="toggle">
        <label
          className={`user${role === "user" ? "" : " closed"}`}
          style={{ backgroundColor: color.primary, color: color.secondary }}
          onClick={() => setRole("user")}
        >
          User
        </label>
        <label
          className={`admin${role === "user" ? " closed" : ""}`}
          style={{ backgroundColor: color.primary, color: color.secondary }}
          onClick={() => setRole("Admin")}
        >
          Admin
        </label>
      </div>

      <Login
        key={role === "user" ? "user" : "admin"}
        userdata={setUserId}
        loginset={setLogin}
        text={role === "user" ? "User ID" : "Admin ID"}
        role={role}
      />
    </>
  ) : (
    <div>
      <Header title={title} />
      <nav
        id="topbar"
        style={{
          background: color.primary,
          maxWidth: "100vw",
        }}
      >
        <div
          className={`hamburger ${navOpen ? "navi" : ""}`}
          onClick={() => setNavOpen(!navOpen)}
        >
          <div className="line" style={{ background: color.secondary }}></div>
          <div className="line" style={{ background: color.secondary }}></div>
          <div className="line" style={{ background: color.secondary }}></div>
        </div>

        <Hnav />

        <button
          style={buttonStyle}
          className="Submit"
          onClick={() => setLogin(!login)}
        >
          {userId}
        </button>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            role === "user" ? (
              <UserHome
                role={role}
                userId={userId}
                login={login}
                setLogin={setLogin}
                title={title}
                navOpen={navOpen}
                setNavOpen={setNavOpen}
              />
            ) : (
              <AdminHome
                role={role}
                AdminId={userId}
                login={login}
                setLogin={setLogin}
                title={title}
                navOpen={navOpen}
                setNavOpen={setNavOpen}
              />
            )
          }
        />
        <Route path="/ward-details" element={<Ward />} />
        <Route path="/Contacts" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
