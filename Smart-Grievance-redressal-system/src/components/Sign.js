import Color from './Color';
import { useContext, useState } from 'react'; // <-- 1. Import useState
import axios from 'axios'; // <-- 2. Import axios
import { Logincontext } from './logcontext';

const Sign = ({  loginset }) => {
  // 3. Use state for form inputs
   const{setuserid,userid}=useContext(Logincontext)
  
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  // 4. Make handlesubmit async
  const handlesubmit = async (e) => {
    e.preventDefault();
    
    // 5. Check if passwords match
    if (pass1 !== pass2) {
      alert("Passwords do not match!");
      return; // Stop the function
    }

    try {
      // 6. Call your backend register endpoint
      const response = await axios.post('http://localhost:4000/api/user/register', {
        userid: userid,
        password: pass1 
      });

      if (response.data.success) {
        // 7. Registration was successful, now log them in
        alert("Registration Successful! Logging you in...");

        // 8. Get and save the token
        const token = response.data.token;
        localStorage.setItem('token', token);

        // 9. Tell App.js to update the state
        setuserid(userid);
        loginset(false);
      }
    } catch (error) {
      // 10. Handle errors from the backend (like "User ID already exists")
      console.error("Registration failed:", error);
      alert(error.response.data.message);
    }
  };

  return (
    // 11. Connect inputs to state
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
      <br />
      <button id="submit" style={{ color: Color.white, backgroundColor: Color.secondary }}> Submit</button>
    </form>
  );
}
export default Sign;