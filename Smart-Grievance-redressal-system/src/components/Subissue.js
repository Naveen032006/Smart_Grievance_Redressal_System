import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Use regular axios for this public route
import Color from './Color';

export const Subissue = () => {
  const [recentIssues, setRecentIssues] = useState([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user/issues');
        // Get just the 3 most recent issues
        setRecentIssues(response.data.data.slice(0, 3));
      } catch (error) {
        console.error("Couldn't fetch recent issues", error);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div style={{ color: 'white', padding: '10px' }}>
      {recentIssues.length === 0 ? (
        <p>No recent issues.</p>
      ) : (
        recentIssues.map(issue => (
          <div key={issue._id} style={{ borderBottom: '1px solid #555', marginBottom: '10px' }}>
            <p style={{ fontWeight: 'bold' }}>{issue.issueTitle}</p>
            <p style={{ fontSize: '0.9em' }}>{issue.location} - ({issue.status})</p>
          </div>
        ))
      )}
    </div>
  );
};