import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeRoleHandler = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic frontend validation
    if (!name || !email || !phone || !password || !aadharNo || !role) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const aadharRegex = /^[0-9]{12}$/;

    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      setError("Phone number must be 10 digits.");
      return;
    }

    if (!aadharRegex.test(aadharNo)) {
      setError("Aadhar number must be 12 digits.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError(null);

    axios.post("http://localhost:5000/api/user/register", {
      name,
      email,
      phone,
      password,
      aadharNo,
      role,
    })
      .then((result) => {
        console.log(result);

        if (result.data.success) {
          setLoading(false);
          setError(null);
          navigate('/login');
        } else {
          setLoading(false);
          setError(result.data.message || "SignUp failed");
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("Signup failed, please try again.");
        }
      });
  };

  return (
    <div className="home-container" style={{ background:'none', height: '100vh' }}>
      <MainHeader />

      <div className="container-fluid">
        <div className="d-flex justify-content-center align-items-center">
          <div className="rounded pl-3 pr-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', marginTop: '130px' }}>
            <h2><center>Sign Up</center></h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div className="alert alert-info">Loading...</div>}

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
              <div className="mb-3" style={{ margin: '10px' }}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder='Enter Name'
                  autoComplete='off'
                  name='name'
                  className='form-control rounded-0'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3" style={{ margin: '10px' }}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder='Enter Email'
                  autoComplete='off'
                  name='email'
                  className='form-control rounded-0'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3" style={{ margin: '10px' }}>
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  placeholder='Enter Phone'
                  autoComplete='off'
                  name='phone'
                  className='form-control rounded-0'
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              </div>
              <div className="col-md-6">

              <div className="mb-3" style={{ margin: '10px' }}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder='Enter Password'
                  name='password'
                  className='form-control rounded-0'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-3" style={{ margin: '10px' }}>
                <label>Aadhar No.</label>
                <input
                  type="text"
                  placeholder='Enter Aadhar No.'
                  autoComplete='off'
                  name='aadharNo'
                  className='form-control rounded-0'
                  onChange={(e) => setAadharNo(e.target.value)}
                />
              </div>

              <div className="mb-3" style={{ margin: '10px' }}>
                <label>Role</label>
                <select
                  className="form-select"
                  aria-label="role"
                  onChange={changeRoleHandler}
                  value={role}
                >
                  <option value="">-- Select Role --</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Officer">Officer</option>
                </select>
              </div>
              </div>

              <button type="submit" className="btn btn-success w-100 rounded-0">
                Sign Up
              </button>
              </div>
            </form>

            <p className="mt-3">Already have an account?</p>
            <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
              Login
            </Link>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

export default SignUp;
