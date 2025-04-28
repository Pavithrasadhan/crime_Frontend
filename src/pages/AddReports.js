import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AddReports = () => {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user"));
  const userName = userData ? userData.name : "";
  const userRole = userData ? userData.role : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!type || !location) {
      setError("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }

    const newReport = {
      userName,
      type,
      location,
    };

    try {
      await axios.post(`${backendUrl}/api/report`, newReport);
      navigate("/userdashboard");
    } catch (error) {
      console.error("Error submitting report:", error);
      setError("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/userdashboard");
  };

  return (
    <div className="report-form-container" style={{ background: 'none', height: '100vh' }}>
      <MainHeader />
      <div className="container py-4" style={{width:'50vw'}}>
        <div className="card shadow-lg" style={{ marginTop: '150px' }}>
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">
              <i className="fas fa-file me-2"></i> New Crime Report
            </h3>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
            
              {error && (
                <div className="alert alert-danger d-flex align-items-center">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{error}</div>
                </div>
              )}

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Reporter Name</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-person"></i>
                      </span>
                      <input
                        className="form-control"
                        type="text"
                        value={userName}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Crime Type *</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-shield"></i>
                      </span>
                      <select
                        className="form-select"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                      >
                        <option value="">Select Crime Type</option>
                        <option value="Theft">Theft</option>
                        <option value="Assault">Assault</option>
                        <option value="Fraud">Fraud</option>
                        <option value="Cybercrime">Cyber Crime</option>
                        <option value="Homicide">Homicide</option>
                        <option value="Domestic Violence">Domestic Violence</option>
                        <option value="Drug Offense">Drug Offense</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Location *</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-location"></i>
                      </span>
                      <input
                        className="form-control"
                        type="text"
                        value={location}
                        placeholder="Enter exact location"
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card mt-4 summary-card">
                    <div className="card-header bg-light">
                      <h5 className="mb-0">
                        <i className="fas fa-file-text me-2"></i> Report Summary
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <p><strong>Reporter:</strong> {userName || "Not specified"}</p>
                          <p><strong>Crime Type:</strong> {type || "Not specified"}</p>
                        </div>
                        <div className="col-md-6">
                          <p><strong>Location:</strong> {location || "Not specified"}</p>                        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end mt-4">
                <button
                  type="button"
                  className="btn btn-outline-danger me-2"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  <i className="fas fa-cancel me-1"></i> Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check-circle me-1"></i> Submit Report
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default AddReports;
