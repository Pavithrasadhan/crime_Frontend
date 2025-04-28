import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
    const [Pagination, setPagination] = useState({
      page: 1,
      limit: 3,
      total: 0,
      totalPages: 1,
    });
  
  useEffect(() => {
      if (searchTerm.trim() === '') {
        fetchReports();
      } else {
        searchReport();
      }
    }, [Pagination.page, searchTerm]);
  
  const fetchReports = async () => {
    try {
      const { page, limit } = Pagination;
      const params = { page, limit };

      const response = await axios.get(`http://localhost:5000/api/report`, { params });
      setReports(response.data.report || []);
      setPagination((prev) => ({
        ...prev,
        total: response.data.total || 0,
        totalPages: response.data.totalPages || 1,
      }));
    } catch (error) {
      console.log("Error fetching CrimeReports:", error);
    }
  };

  const searchReport = async () => {
    try {
      const params = { search: searchTerm };
      const response = await axios.get('http://localhost:5000/api/search/report', { params });
      setReports(response.data.report || []);
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



  const deleteReports = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/report/${id}`);
      setReports(reports.filter(r => r._id !== id));
      fetchReports();
    } catch (err) {
      console.log("Error deleting crimereports:", err);
    }
  };



  return (
    <div className="content-wrapper" style={{background:'none'}}>
      <div className="content-header" style={{ marginTop: "60px"}}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <h3 style={{ margin: "0"}}>Reports List:</h3>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <div className="form-inline">
              <div className="input-group" data-widget="sidebar-search">
                <input
                  className="form-control form-control-sidebar"
                  type="search"
                  placeholder="Search Reports"
                  aria-label="Search"
                  style={{ borderRadius: "20px", width: "300px" }}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <div className="input-group-append">
                  <button className="btn btn-sidebar">
                    <i className="mdi mdi-magnify" style={{color: 'white'}}/>
                  </button>
                </div>
              </div>
            </div>
          </div>
      
        </div>
      </div>

      <table className="table" style={{ marginTop: "5px", borderCollapse: "separate" }}>
        <thead >
          <tr >
            <th style={{ padding: "15px" }}>No</th>
            <th style={{ padding: "15px" }}>User Name</th>
            <th style={{ padding: "15px" }}>Type</th>
            <th style={{ padding: "15px" }}>Location</th>
            <th style={{ padding: "15px" }}>Status</th>
            <th style={{ padding: "15px" }}>Assigned Officer</th>
            <th style={{ padding: "15px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, index) => (
            <tr key={r._id}>
              <td style={{ padding: "20px" }}>{(Pagination.page - 1) * Pagination.limit + index + 1}</td>
              <td style={{ padding: "20px" }}>{r.userName}</td>
              <td style={{ padding: "20px" }}>{r.type}</td>
              <td style={{ padding: "20px" }}>{r.location}</td>
              <td style={{ padding: "20px" }}>{r.status}</td>
              <td style={{ padding: "20px" }}>{r.assignedOfficer}</td>
              <td style={{ padding: "20px" }}>
                <Link to={`/reports/editreports/${r.userName}`} className="btn btn-info btn-sm" style={{ marginRight: '10px', marginTop: '2px' }}>
                  <i className="fas fa-edit" />
                </Link>
                <button
                  onClick={() => deleteReports(r._id)}
                  className="btn btn-danger btn-sm"
                >
                  <i className="fas fa-trash" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", textAlign: "center", color: 'white' }}>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => handlePageChange(Pagination.page - 1)}
          disabled={Pagination.page === 1}
          style={{backgroundColor: 'white'}}
        >
          «
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {Pagination.page} of {Pagination.totalPages}
        </span>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => handlePageChange(Pagination.page + 1)}
          disabled={Pagination.page === Pagination.totalPages}
          style={{backgroundColor: 'white'}}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Reports;
