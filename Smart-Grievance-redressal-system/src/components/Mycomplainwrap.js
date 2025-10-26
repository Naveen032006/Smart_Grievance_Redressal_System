// components/Mycomplainwrap.js

import React, { useState, useEffect, useMemo } from 'react'; // <-- Add useMemo
import api from '../api';
import Color from './Color';

// 1. Accept the new filter props
export const Mycomplainwrap = ({ user, complaintId, category, status, order }) => { 
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const url = user ? '/user/my-issues' : '/admin/issues';

    // This is the full async function
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const response = await api.get(url); // api.js adds the token
        if (response.data.success) {
          setComplaints(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
        alert(error.response?.data?.message || "Error fetching data");
      }
      setLoading(false);
    };

    fetchComplaints();
  }, [user]); // Re-fetch if the user type changes

  // 2. Filter the data *before* rendering
  // useMemo ensures this only re-runs when data or filters change
  const filteredComplaints = useMemo(() => {
    let items = [...complaints];

    // Filter by ID
    if (complaintId) {
      // Assuming ID is part of _id
      items = items.filter(item => 
        item._id.toLowerCase().includes(complaintId.toLowerCase())
      );
    }

    // Filter by Category
    if (category) {
      items = items.filter(item => item.category === category);
    }

    // Filter by Status
    if (status) {
      items = items.filter(item => item.status === status);
    }

    // Sort by Order
    if (order === 'Newest First') {
      items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return items;
  }, [complaints, complaintId, category, status, order]); // Dependency array

  
  if (loading) {
    return <div>Loading...</div>;
  }

  // 3. Render the *filtered* list
  return (
    <div>
      {filteredComplaints.length === 0 ? (
        <div>No complaints match your filters.</div>
      ) : (
        filteredComplaints.map((issue) => (
          <div key={issue._id} style={styles.complaintBox}>
            <img src={issue.image} alt={issue.issueTitle} style={styles.image} />
            <div style={styles.details}>
              <h4>{issue.issueTitle} (Status: {issue.status})</h4>
              <p>Category: {issue.category}</p>
              <p>Location: {issue.location}</p>
              {!user && <p>Submitted by: {issue.user.userid}</p>}
              <p>Submitted on: {new Date(issue.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// ... (styles object)
const styles = {
  complaintBox: {
    border: `1px solid ${Color.primary || '#ccc'}`,
    borderRadius: '10px',
    margin: '15px auto',
    maxWidth: '90%',
    display: 'flex',
    padding: '10px'
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '5px',
    marginRight: '15px'
  },
  details: {
    flex: 1
  }
}