import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    aadharNo: '',
    role: '',
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/${id}`);
      setUser(response.data || {}); 
    } catch (error) {
      console.log('Error fetching user:', error);
    }
  };
  

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/user/${id}`, user);
      navigate('/user');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className='content-wrapper' style={{background: 'none', marginTop: '60px'}}>
    <div className="row justify-content-center" >
      <div className='col-lg-8'>
      <div className="card shadow-sm" style={{marginTop:'40px'}}>
        <div className='card-header bg-primary text-white'>
        <h4 className="mb-0">
          <i className='fas fa-pencil-square me-2' />Edit User</h4>
        </div>
        
        <div className='card-body'>
        <form onSubmit={handleSubmit}>
          <div className="row" >
            <div className="col-md-6">
              <div className="form-group">
                <label className='form-label fw-bold'>Name</label>
              
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="form-control"
        
                
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="form-control"
        
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="form-control"
        
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="form-control"
      
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select
                  name="role"
                  className="form-select"
                  value={user.role}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="User">user</option>
                  <option value="Admin">Admin</option>
                  <option value="Officer">Officer</option>
                </select>
              </div>
            </div>
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

export default EditUser;
