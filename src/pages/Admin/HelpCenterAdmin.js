import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const HelpCenterAdmin = () => {
  const [faq, setFaq] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 3,
    total: 0,
    totalPages: 1,
  });

  // Fetch FAQ data
  const fetchFaq = useCallback(async () => {
    try {
      const { page, limit } = pagination;
      const params = { page, limit };

      const response = await axios.get(`${backendUrl}/api/faq`, { params });

      setFaq(response.data.faqs || []);
      setPagination((prev) => ({
        ...prev,
        total: response.data.total || 0,
        totalPages: response.data.totalPages || 1,
      }));
    } catch (error) {
      console.error("Error fetching FAQ:", error);
    }
  }, [pagination]);

  // Search FAQ data
  const searchFaq = useCallback(async () => {
    try {
      const params = { search: searchTerm };
      const response = await axios.get(`${backendUrl}/api/search/faq`, { params });

      setFaq(response.data.faqs || []);
      setPagination((prev) => ({
        ...prev,
        total: response.data.total || 0,
        totalPages: response.data.totalPages || 1,
      }));
    } catch (error) {
      console.error('Error searching FAQ:', error);
    }
  }, [searchTerm]);

  // useEffect with memoized dependencies
  useEffect(() => {
    if (searchTerm.trim() === '') {
      fetchFaq();
    } else {
      searchFaq();
    }
  }, [fetchFaq, searchFaq]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  // Delete FAQ
  const deleteFaq = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/faq/${id}`);
      setFaq((prev) => prev.filter((f) => f._id !== id));
      fetchFaq();
    } catch (err) {
      console.error("Error deleting FAQ:", err);
    }
  };

  return (
    <div className="content-wrapper" style={{background: 'none'}}>
      
      <div className="content-header" style={{ marginTop: "60px" }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: "0", color: 'white'}}>FAQ List</h3>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            
            <input
              type="text"
              className="form-control"
              placeholder="Search FAQs"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: '250px', borderRadius: '20px', marginRight: '10px' }}
            />
            
            <Link to="/faq/addfaq" className="btn btn-primary btn-sm">
              <i className="fas fa-plus" /> Add FAQ
            </Link>
          </div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ marginTop: "5px", borderCollapse: "separate", width: '100%' }}>
          <thead>
            <tr>
              <th style={{ padding: "15px", width: '10%' }}>Id</th>
              <th style={{ padding: "15px", width: '30%' }}>Question</th>
              <th style={{ padding: "15px", width: '40%' }}>Answer</th>
              <th style={{ padding: "15px", width: '20%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faq?.map((f, index) => (
              <tr key={f._id}>
                <td style={{ padding: "20px" }}>
                  {(pagination.page - 1) * pagination.limit + index + 1}
                </td>
                <td style={{ padding: "20px" }}>{f.question}</td>
                <td
                  style={{
                    padding: "20px",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                    maxWidth: "300px",
                  }}
                >
                  {f.answer}
                </td>
                <td style={{ padding: "20px" }}>
                  <Link to={`/faq/editfaq/${f._id}`} className="btn btn-info btn-sm" style={{ marginRight: '10px' }}>
                    <i className="fas fa-edit" />
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteFaq(f._id)}
                  >
                    <i className="fas fa-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
          style={{ backgroundColor: 'white' }}
        >
          «
        </button>
        <span style={{ margin: "0 10px", color: 'white' }}>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page === pagination.totalPages}
          style={{ backgroundColor: 'white' }}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default HelpCenterAdmin;
