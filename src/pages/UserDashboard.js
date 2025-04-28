import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));

    if (!data) {
      navigate("/login");
    } else {
      setUser(data);
      fetchReports(data.name);
    }
  }, []);

  const fetchReports = async (username) => {
    try {
      console.log("Fetching reports for username:", username);

      const response = await axios.get(
        `${backendUrl}/api/report/user-reports?username=${username}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Reports Data:", response.data);
      setReports(response.data.reports);
    } catch (error) {
      console.error("Error fetching reports", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const getStatusBadge = (status) => {
    let badgeClass = "";
    switch (status.toLowerCase()) {
      case "pending":
        badgeClass = "bg-warning text-dark";
        break;
      case "in progress":
        badgeClass = "bg-info text-white";
        break;
      case "resolved":
        badgeClass = "bg-success text-white";
        break;
      case "rejected":
        badgeClass = "bg-danger text-white";
        break;
      default:
        badgeClass = "bg-secondary text-white";
    }
    return <span className={`badge ${badgeClass}`}>{status}</span>;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard" style={{width: '100vw', overflowX: 'hidden', background:'none', height: '100vh'}}>
      <MainHeader />

      <div className="container" style={{marginTop: '100px'}} >
        <div className="card shadow-sm mb-4">
  <div className="card-body text-center px-4">
    <h2 className="card-title w-100 fw-bold">Welcome, {user?.name} 👋</h2>

    <p className="card-text text-muted mb-1">
      <i className="fas fa-envelope me-2"></i> {user?.email}
    </p>

    <div className="mt-3">
      <Link to="/addreports" className="btn btn-primary me-2">
        <i className="fas fa-plus-circle me-1"></i> Report New Crime
      </Link>
      <button onClick={handleLogout} className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt me-1"></i> Logout
      </button>
    </div>
  </div>
</div>

        <div className="card shadow-sm">
          <div className="card-header bg-light">
            <h3 className="mb-0">
              <i className="fas fa-clipboard me-2"></i> Your Reports
            </h3>
          </div>
          <div className="card-body">
            {reports.length === 0 ? (
              <div className="text-center py-4">
                <i className="fas fa-clipboard-x text-muted" style={{ fontSize: "3rem" }}></i>
                <p className="mt-3">No reports found.</p>
                <Link to="/reports/addreports" className="btn btn-primary">
                  <i className="fas fa-plus-circle me-1"></i> Report Your First Crime
                </Link>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Crime Type</th>
                      <th>Date Reported</th>
                      <th>Status</th>
                      <th>Assigned Officer</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report._id}>
                        <td>
                          <strong>{report.type}</strong>
                          <br />
                          <small className="text-muted">{report.location}</small>
                        </td>
                        <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                        <td>{getStatusBadge(report.status)}</td>
                        <td>
                          {report.assignedOfficer || (
                            <span className="text-muted">Not assigned</span>
                          )}
                        </td>
                
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <MainFooter />
    </div>
  );
};

export default UserDashboard;