import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div>
  <aside className="main-sidebar sidebar-primary elevation-4" id="sidebar" style={{background: '#E7DBEF'}}>
    <Link to="/" className="brand-link">
      <span className='navbar-brand fw-bold' style={{color: '#A56ABD'}}>
        CRMS
      </span>
      </Link>

      <div className='sidebar'>
        <nav className='mt-2'>
          <ul className='nav nav-pills nav-sidebar flex-column' data-widget="treeview" role="menu" data-accordion="false">
      <li className="nav-item menu-open fw-bold">
        <Link to ="/dashboard" className="nav-link">
          <i className='nav-icon fas fa-tachometer-alt' />
          <p>Dashboard</p>
        </Link>
      </li>
      <li className="nav-item fw-bold">
        <Link to = "/reports" className="nav-link">
          <i className="nav-icon fas fa-clipboard" /> 
          <p>Manage Reports</p>
        </Link>
        
      </li>
      <li className="nav-item fw-bold">
        <Link to ="/user" className="nav-link">
          <i className="nav-icon fas fa-users" /> 
          <p>Manage Users</p>
        </Link>
        </li>
        <li className="nav-item fw-bold">
        <Link to ="/faq" className="nav-link">
          <i className="nav-icon fas fa-circle" />
          <p>Manage Help Center</p>
        </Link>
        </li>
        </ul>
        </nav>
        </div>
  </aside>
</div>

  )
}

export default Sidebar
