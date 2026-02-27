import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    // 2. You send that data to the server
    const res = await axios.post('http://localhost:5000/auth/login', 
      { email, password }, // This is the data being sent TO the backend
      { withCredentials: true }
    );

    // 3. 'res.data' is the data coming back FROM the backend
    // If your backend sends res.json({ success: true }), then res.data.success is true.
    if (res.data.success) {
      navigate('/profile');
    }
  } catch (err) {
    // 4. If there's an error, the error data is inside err.response.data
    console.log(err.response.data); 
  }
};

  return (
    <div className="glass-card">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Welcome Back</h2>
        <div className="input-group">
          <input type="email" placeholder="Email Address" required 
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" required 
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="main-btn">Login</button>

        <div className="social-divider"><span>Or connect with</span></div>
        <div className="social-links">
          <a href="http://localhost:5000/auth/github" className="social-btn github">GitHub</a>
          <a href="http://localhost:5000/auth/linkedin" className="social-btn linkedin">LinkedIn</a>
        </div>
        <p className="toggle-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;