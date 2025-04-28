import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const User = () => {
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [Pagination, setPagination] = useState({
    page: 1,
    limit: 3,
    total: 0,
    totalPages: 1,
  });

  useEffect(() => {
    if (searchTerm.trim() === '') {
      fetchUser();
    } else {
      searchUser();
    }
  }, [Pagination.page, searchTerm]);

  const fetchUser = async () => {
    try {
      const { page, limit } = Pagination;
      const params = { page, limit };

      const response = await axios.get("http://localhost:5000/api/user", { params });
      setUser(response.data.users|| []);
      setPagination((prev) => ({
        ...prev,
        total: response.data.total || 0,
        totalPages: response.data.totalPages || 1,
      }));
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const searchUser = async () => {
    try {
      const params = { search: searchTerm };
      const response = await axios.get('http://localhost:5000/api/search/user', { params });
      setUser(response.data.users || []);
      setPagination({
        ...Pagination,
        total: response.data.total || 0,
        totalPages: response.data.totalPages || 1,
      });
    } catch (error) {
      console.error('Error searching user:', error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/${id}`);
      setUser(user.filter((u) => u._id !== id ));
      fetchUser();
    } catch (err) {
      console.log("Error deleting user:", err);
    }
  };

  return (
    <div className="content-wrapper" style={{background: 'none'}}>
    
      <div className="content-header" style={{ marginTop: "60px"}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: "0"}}>Users List</h3>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            
            <input
              type="text"
              className="form-control"
              placeholder="Search Users"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: '250px', borderRadius: '20px', marginRight: '10px' }}
            />
          
            <Link to="/user/adduser" className="btn btn-primary btn-sm">
              <i className="fas fa-plus" /> Add User
            </Link>
          </div>
        </div>
      </div>

      <table className="table" style={{ marginTop: "5px", borderCollapse: "separate" }}>
        <thead>
          <tr>
            <th style={{ padding: "15px" }}>Id</th>
            <th style={{ padding: "15px" }}>Name</th>
            <th style={{ padding: "15px" }}>Email</th>
            <th style={{ padding: "15px" }}>Phone</th>
            <th style={{ padding: "15px" }}>Aadhar No</th>
            <th style={{ padding: "15px" }}>Role</th>
            <th style={{ padding: "15px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.map((u, index) => (
            <tr key={u._id}>
              <td style={{ padding: "20px" }}>{(Pagination.page - 1) * Pagination.limit + index + 1}</td>
              <td style={{ padding: "20px" }}>{u.name}</td>
              <td style={{ padding: "20px" }}>{u.email}</td>
              <td style={{ padding: "20px" }}>{u.phone}</td>
              <td style={{ padding: "20px" }}>{u.aadharNo}</td>
              <td style={{ padding: "20px" }}>{u.role}</td>
              <td style={{ padding: "20px" }}>
                
                <Link to={`/user/edituser/${u._id}`} className="btn btn-info btn-sm" style={{ marginRight: '10px' }}>
                  <i className="fas fa-edit" />
                </Link>
                {u.role !== 'admin' && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(u._id)}
                  >
                    <i className="fas fa-trash" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => handlePageChange(Pagination.page - 1)}
          disabled={Pagination.page === 1}
          style={{ backgroundColor: 'white' }}
        >
          «
        </button>
        <span style={{ margin: "0 10px", color: 'white' }}>
          Page {Pagination.page} of {Pagination.totalPages}
        </span>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => handlePageChange(Pagination.page + 1)}
          disabled={Pagination.page === Pagination.totalPages}
          style={{ backgroundColor: 'white' }}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default User;
