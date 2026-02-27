import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../App.css";

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

// src/components/Register.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/auth/register', formData);

    // If backend sends status 201, this code runs
    if (response.status === 201 || response.data.success) {
      alert("Registration Successful! Please log in.");
      navigate('/login');
    }
  } catch (err) {
    // If the backend fails, this runs instead
    console.log("Error details:", err.response?.data);
    alert(err.response?.data?.error || "Registration failed");
  }
};

  return (
    <div className="glass-card">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <div className="input-group">
          <input type="text" placeholder="Full Name" required 
            onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className="input-group">
          <input type="email" placeholder="Email Address" required 
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" required 
            onChange={(e) => setFormData({...formData, password: e.target.value})} />
        </div>
        <button type="submit" className="main-btn">Sign Up</button>
        <p className="toggle-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;