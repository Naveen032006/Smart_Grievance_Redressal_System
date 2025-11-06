import { useState } from "react";
import Sign from "./Sign";
import "./log.css";


import Color from "./Color";
import axios from "axios"; // <-- 1. Import axios

function Login({ userdata, loginset, text, role }) {
  const [userid,setuserid]=useState("")
  const [pass, setpass] = useState("");

  // 2. Make this function async to use 'await'
  const handlesubmit = async (e) => {
    e.preventDefault();

    // 3. Determine which backend URL to call
    const loginUrl =
      role === "user"
        ? "http://localhost:4000/api/user/login"
        : "http://localhost:4000/api/admin/login";

    try {
      // 4. Call your backend API
      const response = await axios.post(loginUrl, {
        userid: userid,
        password: pass, // Your state is 'pass', backend expects 'password'
      });

      if (response.data.success) {
        // 5. Get and save the token
        const token = response.data.token;
        localStorage.setItem("token", token);

        // 6. Tell App.js to update the state (your code already does this)
        userdata(userid);
        loginset(false);
      }
    } catch (error) {
      // 7. Show a real error message from the backend
      console.error("Login failed:", error);
      alert(error.response.data.message);
    }
  };

  console.log("userdata prop:", setuserid);
 

  const [sign, setsign] = useState(false);

  return sign ? (
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
        onChange={(e) => setuserid(e.target.value)}
      />
      <h2>password:</h2>
      <input
        type="password"
        id="password"
        placeholder="Enter password"
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
        {" "}
        Submit
      </button>
      {console.log(role)}
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
