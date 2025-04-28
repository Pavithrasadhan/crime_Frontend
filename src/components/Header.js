import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUserName("");
    navigate("/");
  };

  return (
<div className="fixed-top">
  <nav className="main-header navbar navbar-expand navbar">
    <ul className='navbar-nav'>
      <li className='nav-item'>
        <a className='nav-link' data-widget='pushmenu' href='#' role='button'>
          <i className='fas fa-bars' />
        </a>
      </li>
      <li className='nav-item d-none d-sm-inline-block'>
        <Link to="/" className='nav-link'>Home</Link>
      </li>
    </ul>
    

    <ul className="navbar-nav ml-auto">
  {userName ? (
    <>
      <li className="nav-item d-none d-sm-inline-block" style={{marginTop: '5px'}}>
        <span className="mb-1 text-black fw-semibold">Welcome, {userName}</span>
      </li>
      <li className="nav-item">
        <button
          className="btn btn-outline-danger"
          onClick={handleLogout}
          style={{
            padding: "5px 12px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            transition: "background-color 0.3s",
            marginLeft: '10px',
          }}
        >
          Sign Out
        </button>
      </li>
    </>
  ) : (
    <li className="nav-item">
      <Link
        to="/login"
        className="btn btn-primary"
        style={{
          padding: "5px 12px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "500",
          transition: "background-color 0.3s",
          textDecoration: "none",
        }}
      >
        Sign In
      </Link>
    </li>
  )}

  <li className="nav-item d-none d-lg-block">
    <a className="nav-link" style={{ fontSize: "18px", color: "#555" }}>
      <i className="mdi mdi-fullscreen" id="fullscreen-button" />
    </a>
  </li>
</ul>

  
  </nav>
</div>

  )
}

export default Header
