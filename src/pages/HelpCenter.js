import { useState, useEffect } from "react";
import axios from "axios";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";

const HelpCenter = () => {
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/faq");
        setFaqs(response.data.faqs || []);
        setFilteredFaqs(response.data.faqs || []);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSeeMore = () => {
    setVisibleCount(filteredFaqs.length);
  };

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredFaqs(faqs);
      setVisibleCount(3);
    } else {
      try {
        const response = await axios.get(`http://localhost:5000/api/search/faq`, {
          params: { search: term }
        });
        setFilteredFaqs(response.data.faqs || []);
        setVisibleCount(3);
      } catch (error) {
        console.error("Error searching FAQs:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="help-center-page" style={{background: 'none', height: '100vh'}}>
      <MainHeader />
      
      <div className="container py-5">
    
        <div className="text-center mb-5" style={{marginTop: '30px'}}>
          <h1 className="display-5 fw-bold mb-3" style={{color: 'white'}}>Help Center</h1>
          <p className="lead text fw-bold" style={{color: 'white'}}>
            Find answers to common questions about our services
          </p>
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-md-8 col-lg-6">
            <div className="input-group search-bar">
              <span className="input-group-text bg-white border-end-0">
                <i className="fas fa-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-5">
                <i className="fas fa-question-circle text-muted mb-3" style={{ fontSize: "3rem" }}></i>
                <h4>No FAQs found</h4>
                <p className="text-muted">Try a different search term</p>
              </div>
            ) : (
              <div className="accordion faq-accordion" id="faqAccordion">
                {filteredFaqs.slice(0, visibleCount).map((faq, index) => (
                  <div key={faq.id} className="accordion-item mb-3 border-0 shadow-sm">
                    <h3 className="accordion-header">
                      <button
                        className={`accordion-button ${openIndex === index ? '' : 'collapsed'}`}
                        type="button"
                        onClick={() => handleToggle(index)}
                        aria-expanded={openIndex === index}
                      >
                        <i className="fas fa-question-circle text-primary me-2"></i>
                        {faq.question}
                      </button>
                    </h3>
                    <div
                      className={`accordion-collapse collapse ${openIndex === index ? 'show' : ''}`}
                    >
                      <div className="accordion-body">
                        <i className="fas fa-info-circle text-muted me-2"></i>
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {visibleCount < filteredFaqs.length && (
              <div className="text-center mt-4">
                <button
                  onClick={handleSeeMore}
                  className="btn btn-outline-primary"
                  style={{color: 'white'}}
                >
                  <i className="fas fa-chevron-down me-2"></i>
                  Show More FAQs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default HelpCenter;