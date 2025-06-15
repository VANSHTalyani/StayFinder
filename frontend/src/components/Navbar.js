import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const isLoggedIn = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">StayFinder</Link>
      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            {user.isHost && <Link to="/host">Host Dashboard</Link>}
            <button className="logout-button" onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location = '/'; }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
