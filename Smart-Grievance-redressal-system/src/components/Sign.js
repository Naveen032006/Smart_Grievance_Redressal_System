import Color from './Color';
import { useContext, useState } from 'react';
import axios from 'axios';
import { Logincontext } from './logcontext';

const Sign = ({ loginset }) => {
  // Use context for userid
  const { setuserid, userid } = useContext(Logincontext);
  
  // Use local state for passwords and ward number
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [wardNumber, setWardNumber] = useState(""); // <-- 1. ADDED WARD STATE

  const handlesubmit = async (e) => {
    e.preventDefault();
    
    if (pass1 !== pass2) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // 2. SEND wardNumber TO THE BACKEND
      const response = await axios.post('http://localhost:4000/api/user/register', {
        userid: userid,
        password: pass1,
        wardNumber: wardNumber // <-- ADDED
      });

      if (response.data.success) {
        alert("Registration Successful! Logging you in...");

        // 3. GET BOTH token and userInfo from response
        const { token, userInfo } = response.data;
        
        // 4. SAVE BOTH to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo)); // <-- CRITICAL FIX

        // 5. Tell App.js to update the state
        setuserid(userInfo.userid); // Use the data from the response
        loginset(false);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <form className="container" onSubmit={handlesubmit} style={{ backgroundColor: Color.primary }}>
      <h2>User id:</h2>
      <input 
        id="userid" 
        type="text" 
        placeholder="Enter new user id" 
        value={userid}
        onChange={(e) => setuserid(e.target.value)}
        required 
      />
      <h2>Password:</h2>
      <input 
        type="password" 
        id="password1" 
        placeholder="Enter new password" 
        value={pass1}
        onChange={(e) => setPass1(e.target.value)}
        required 
      />
      <h2>Confirm password:</h2>
      <input 
        type="password" 
        id="password2" 
        placeholder="Re-enter password" 
        value={pass2}
        onChange={(e) => setPass2(e.target.value)}
        required 
      />

      {/* --- 6. ADDED WARD NUMBER INPUT --- */}
      <h2>Ward Number:</h2>
      <input 
        id="wardNumber"
        type="number" 
        placeholder="Enter your ward number" 
        value={wardNumber}
        onChange={(e) => setWardNumber(e.target.value)}
        required 
      />
      {/* --------------------------------- */}

      <br />
      <button id="submit" style={{ color: Color.white, backgroundColor: Color.secondary }}> Submit</button>
    </form>
  );
}
export default Sign;