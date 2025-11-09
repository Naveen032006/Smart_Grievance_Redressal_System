import Nav from "./Nav";
import Mycomplain from "./Mycomplain";
import SubComplain from "./SubComplain";
import Analytics from "./Analytics";
import OverView from "./OverView";
import api from "../api"; // Your API client
import { useEffect, useState, useCallback } from "react";
import { jwtDecode } from 'jwt-decode';
import {Box, Typography,CircularProgress } from "@mui/material";

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
  const [issues, setIssues] = useState([]); // <-- This is the MASTER LIST
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch ward-specific issues
  const fetchMyWardIssues = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        setCurrentUserId(decoded.user.id);
      }
      
      // Call the protected route for the user's ward
      const response = await api.get("/user/my-ward-issues");
      setIssues(response.data?.data || []);

    } catch (error) {
      console.error("Server responded with an error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyWardIssues();
  }, [fetchMyWardIssues]);

  // Function to handle liking a post
  const onLikeToggle = async (issueId) => {
    try {
      const response = await api.patch(`/user/issue/${issueId}/like`);
      if (response.data.success) {
        const updatedIssue = response.data.data;
        // Update the MASTER LIST
        setIssues(currentIssues =>
          currentIssues.map(issue =>
            issue._id === issueId ? updatedIssue : issue
          )
        );
      }
    } catch (error) {
      alert("You must be logged in to like an issue.");
    }
  };
  
  // Function to refresh issues after submit
  const handleIssueSubmit = () => {
    fetchMyWardIssues(); // Re-fetch the MASTER LIST
    setSection("overview"); 
  };

  // MASTER DELETE FUNCTION
  const handleDeleteIssue = async (issueId) => {
    if (!window.confirm("Are you sure you want to cancel this complaint? This cannot be undone.")) {
      return;
    }
    
    try {
      await api.delete(`/user/issue/${issueId}`);
      alert("Complaint cancelled successfully.");
      
      // Update the *MASTER* issues list
      setIssues(prevIssues => prevIssues.filter(issue => issue._id !== issueId));

    } catch (error) {
      console.error("Failed to cancel issue:", error);
      alert(error.response?.data?.message || "Failed to cancel issue.");
    }
  };

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
        {loading ? (
          <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: 'calc(100vh - 200px)' // Give it height
        }}>
          <CircularProgress />
        </Box>
        // -------------------------------------
        ) : (
          <>
            {/* Pass all props to OverView */}
            {section === "overview" && (
              <div className="content1">
                <OverView 
                  userid={userId} 
                  role={role} 
                  issues={issues} // Pass master list
                  onLikeToggle={onLikeToggle}
                  currentUserId={currentUserId}
                  onDeleteIssue={handleDeleteIssue} // Pass delete
                />
              </div>
            )}
            {/* Pass all props to SubComplain */}
            {section === "subcomplain" && (
              <div className="content1">
                <SubComplain 
                  issues={issues} 
                  onLikeToggle={onLikeToggle} 
                  currentUserId={currentUserId}
                  onIssueSubmit={handleIssueSubmit}
                  onDeleteIssue={handleDeleteIssue} // Pass delete
                />
              </div>
            )}
            
            {/* --- THIS IS THE FIX --- */}
            {/* Pass all props to Mycomplain */}
            {section === "mycomplain" && (
              <div className="content2">
                <Mycomplain 
                  role={role} 
                  issues={issues} // Pass master list
                  onLikeToggle={onLikeToggle}
                  onDeleteIssue={handleDeleteIssue} // Pass delete
                  currentUserId={currentUserId}
                />
              </div>
            )}
            {/* ----------------------- */}

            {section === "analytics" && (
              <div className="content3">
                <Analytics issues={issues} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UserHome;