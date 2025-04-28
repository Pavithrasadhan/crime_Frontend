import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [aadharNo, setAadharNo] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const changeRoleHandler = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { name, email, phone, password, aadharNo, role };
    console.log(newUser);

    axios.post('http://localhost:5000/api/user/register', newUser)
      .then((response) => {
        console.log(response.data);
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setAadharNo('');
        setRole('');
        navigate('/user');
      })
      .catch((error) => {
        console.log(error);
        alert("Error adding user. Please try again.");
      });
  };

  const handleCancel = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setAadharNo('');
    setRole('');
    navigate("/user")
  };

  return (
    <div className='content-wrapper' style={{ marginTop: "60px", background: 'none' }}>
      <div className="row justify-content-center">
        <div className='col-lg-8'>
        <div className="card shadow-sm" style={{marginTop: '40px'}}>
          <div className="card-header bg-primary text-white">
            <h4 className='mb-0'>
              <i className='fas fa-plus' />Add New User</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className='row'>
                <div className='col-md-6'>
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      className="form-control"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='Enter Name'
                    />
                  </div>

                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      className="form-control"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Enter Email'
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone:</label>
                    <input
                      className="form-control"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder='Enter Phone Number'
                    />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className="form-group">
                    <label>Password:</label>
                    <input
                      className="form-control"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='Enter Password'
                    />
                  </div>

                  <div className="form-group">
                    <label>Aadhar No:</label>
                    <input
                      className="form-control"
                      type="text"
                      value={aadharNo}
                      onChange={(e) => setAadharNo(e.target.value)}
                      placeholder='Enter Aadhar No'
                    />
                  </div>

                  <div className="form-group">
                    <label>Role:</label>
                    <select
                      className="form-select"
                      aria-label="Select Role"
                      value={role}
                      onChange={changeRoleHandler}
                    >
                      <option value="">Select Role</option>
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                      <option value="Officer">Officer</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-4">
                <button className="btn btn-primary" type="submit" style={{marginRight: '6px'}}>
                  <i className='fas fa-check' />Add User</button>
                <button className="btn btn-outline-danger" type="button" onClick={handleCancel}>
                  <i className='fas fa-cancel me-1' />Cancel</button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
