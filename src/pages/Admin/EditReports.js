import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const EditReport = () => {
  const { userName } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState({
    type: '',
    location: '',
    status: '',
    assignedOfficer: '',
  });

  const [officers, setOfficers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetchReport();
  }, [userName]);

  const fetchReport = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/report/${userName}`);
      if (response.data.report) {
        setReport(response.data.report);
      } else {
        console.error('No reports found for this user');
      }
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  const fetchOfficers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user`, {
        params: { role: 'Officer' }
      });
      setOfficers(response.data.users || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching officers:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'assignedOfficer') {
      if (value.length > 0) {
        fetchOfficers(value);
      } else {
        setOfficers([]);
        setShowSuggestions(false);
      }
    }
  };

  const handleSuggestionClick = (name) => {
    setReport((prev) => ({
      ...prev,
      assignedOfficer: name,
    }));
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/report/username/${userName}`, report);
      navigate('/reports');
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  return (
    <div className='content-wrapper' style={{ marginTop: '60px', background: 'none'}}>
    <div
      className="row justify-content-center">
        <div className='col-lg-8'>
        <div className="card shadow-sm" style={{marginTop: '40px'}}>
      <div
        className="card-header bg-primary text-white">
        <h3 className="mb-0">
          <i className='fas fa-pencil-square me-2' />Edit Report for {userName}</h3>
          </div>
          <div className='card-body'>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Type</label>
            <input
              type="text"
              name="type"
              value={report.type}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={report.location}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Status</label>
            <select
              name="status"
              value={report.status}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="form-group mb-3">
            <label>Assigned Officer</label>
            <input
              type="text"
              name="assignedOfficer"
              value={report.assignedOfficer}
              onChange={handleChange}
              className="form-control"
              required
            />
            {showSuggestions && officers.length > 0 && (
              <ul
                className="list-group mt-1"
                style={{
                  position: 'absolute',
                  zIndex: 10,
                  width: '100%',
                  backgroundColor: '#1c1e22',
                  color: 'white',
                  border: '1px solid #444',
                }}
              >
                {officers.map((user, index) => (
                  <li
                    key={index}
                    className="list-group-item"
                    onClick={() => handleSuggestionClick(user.name)}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: '#2c2f33',
                      color: 'white',
                    }}
                  >
                    {user.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              style={{marginRight: '6px'}}
            >
              <i className='fas fa-check-circle me-1' />
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate('/reports')}
              className="btn btn-outline-danger me-2"
            >
              <i className='fas fa-cancel me-1' />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default EditReport;
