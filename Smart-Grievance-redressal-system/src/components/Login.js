import { useState } from "react";
import Sign from "./Sign";
import "./log.css";
import Color from "./Color";
import axios from "axios"; 

function Login({ userdata, loginset, text, role }) {
  const [userid, setuserid] = useState("");
  const [pass, setpass] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();

    const loginUrl =
      role === "user"
        ? "http://localhost:4000/api/user/login"
        : "http://localhost:4000/api/admin/login";

    try {
      const response = await axios.post(loginUrl, {
        userid: userid,
        password: pass,
      });

      if (response.data.success) {
        // Get all data from the successful response
        const { token, userInfo, adminInfo } = response.data;

        // 1. Save the token
        localStorage.setItem("token", token);

        // 2. Save the user's info (whether user or admin)
        // This is the CRITICAL step for the Ward.jsx page to work
        if (userInfo) {
          // If it's a regular user
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          userdata(userInfo.userid); // Set navbar name
        } else if (adminInfo) {
          // If it's an admin
          localStorage.setItem('userInfo', JSON.stringify(adminInfo));
          userdata(adminInfo.name); // Set navbar name
        }

        // 3. Hide the login screen
        loginset(false);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response.data.message);
    }
  };

  const [sign, setsign] = useState(false);

  return sign ? (
    // Pass userdata and loginset to Sign component
    <Sign userdata={userdata} loginset={loginset} />
  ) : (
    <form
      className="container"
      style={{ backgroundColor: Color.primary }}
      onSubmit={handlesubmit}
    >
      <h2>{text}</h2>
      <input
        id="userid"
        type="text"
        placeholder="Enter user id"
        value={userid}
        onChange={(e) => setuserid(e.target.value)}
      />
      <h2>password:</h2>
      <input
        type="password"
        id="password"
        placeholder="Enter password"
        value={pass}
        onChange={(e) => setpass(e.target.value)}
      />
      <br />
      <button
        id="submit"
        style={{
          backgroundColor: Color.secondary,
          color: Color.white,
          opacity: userid ? 1 : 0.4,
        }}
      >
        Submit
      </button>
      {role === "user" && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h4 style={{ color: Color.supreme }}>Don't you have an account?</h4>
          <span
            className="sign"
            onClick={() => {
              setsign(true);
            }}
            style={{ color: Color.secondary }}
          >
            signup
          </span>
        </div>
      )}
    </form>
  );
}

export default Login;