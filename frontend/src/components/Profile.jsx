import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/auth/current_user', { 
          withCredentials: true // MUST match backend CORS
        });
        
        if (res.data) {
          setUser(res.data);
          setLoading(false);
        } else {
          navigate('/login'); // Redirect if not logged in
        }
      } catch (err) {
        console.error("Fetch error:", err);
        navigate('/login');
      }
    };
    fetchUser();
}, [navigate]);

  if (loading) return <div className="loading-screen"><h1>Loading...</h1></div>;

  return (
    <div className="glass-card profile-dashboard">
      <div className="profile-header">
        <img 
          src={user.avatar || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`} 
          alt="profile" 
          className="avatar" 
          onError={(e) => { e.target.src = 'https://api.dicebear.com/7.x/initials/svg?seed=' + user.displayName }}
        />
        <h2>{user.displayName}</h2>
        <p className="email-tag">{user.email || 'No email provided'}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <span>Source</span>
          <strong>{user.githubId ? 'GitHub' : user.linkedinId ? 'LinkedIn' : 'Local'}</strong>
        </div>
        <div className="stat-item">
          <span>Status</span>
          <strong style={{color: '#00ff88'}}>Active</strong>
        </div>
      </div>

      <div className="dashboard-actions">
        <button className="main-btn secondary">Edit Profile</button>
        <a href="http://localhost:5000/auth/logout" className="logout-link">Logout</a>
      </div>
    </div>
  );
};

export default Profile;