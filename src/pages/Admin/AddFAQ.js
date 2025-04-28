import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddFAQ = () => {
  const [faq, setFaq] = useState({
    question: '',
    answer: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFaq({
      ...faq,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!faq.question || !faq.answer) {
      setError('All fields are required');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/faq', faq);
      navigate('/faq');
    } catch (error) {
      console.error('Error adding FAQ:', error);
      setError('Failed to add FAQ');
    }
  };

  return (
    <div className="content-wrapper" style={{ marginTop: '60px', background: 'none' }}>
       
      <div className='row justify-content-center'>
        <div className='col-lg-8'>
      <div className="card shadow-sm" style={{marginTop: '40px'}}>
        <div className='card-header bg-primary text-white'>
          <h4 className='mb-0'>
            <i className='fas fa-plus' />Add New FAQ</h4>
          </div>
          <div className='card-body'>
        <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group">
          <label>Question</label>
          <input
            type="text"
            className="form-control"
            name="question"
            value={faq.question}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Answer</label>
          <textarea
            className="form-control"
            name="answer"
            value={faq.answer}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-end mt-4">
        <button type="submit" className="btn btn-success" style={{marginRight: '6px'}}>
          <i className="fas fa-check" /> Add FAQ
        </button>
        <button
              type="button"
              onClick={() => navigate('/faq')}
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

export default AddFAQ;
