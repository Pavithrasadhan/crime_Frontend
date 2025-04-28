import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditFaq = () => {
  const { id } = useParams();
  const [faq, setFaq] = useState({
    question: '',
    answer: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/faq/${id}`);
        if (response.data) {
          setFaq(response.data);
        } else {
          setError('FAQ not found');
        }
      } catch (error) {
        console.error('Error fetching FAQ:', error);
        setError('Failed to load FAQ');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaq();
  }, [id]);

  const handleChange = (e) => {
    setFaq({
      ...faq,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!faq.question || !faq.answer) {
      setError('All fields are required');
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/faq/${id}`, faq);
      navigate('/faq');
    } catch (error) {
      console.error('Error updating FAQ:', error);
      setError('Failed to update FAQ');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="content-wrapper py-4" style={{marginTop: '60px', background:'none'}}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <i className="fas fa-pencil-square me-2"></i> Edit FAQ
              </h3>
            </div>
            
            <div className="card-body">
              {error && (
                <div className="alert alert-danger d-flex align-items-center">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  <div>{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Question</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-question-circle"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="question"
                      value={faq.question}
                      onChange={handleChange}
                      placeholder="Enter the question"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Answer</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-message"></i>
                    </span>
                    <textarea
                      className="form-control"
                      name="answer"
                      value={faq.answer}
                      onChange={handleChange}
                      rows="5"
                      placeholder="Enter the detailed answer"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-2"
                    onClick={() => navigate('/faq')}
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
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-check-circle me-1"></i> Update FAQ
                      </>
                    )}
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

export default EditFaq;