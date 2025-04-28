import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });

      const userData = result.data;

      if (userData) {
        const { _id, role = "User", token, name, email } = userData;
        localStorage.setItem("user", JSON.stringify({ _id, role, token, name, email }));
        const userRole = role.toLowerCase();
        if (userRole === "admin" || userRole === "officer") {
          navigate("/dashboard");
        } else if (userRole === "user") {
          navigate("/userdashboard");
        } else {
          navigate("/profile");
        }
      } else {
        setError("Invalid login response.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || 
        "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container " style={{  background:'none' }}>
      <MainHeader />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="p-3 rounded w-25"
          style={{
            marginTop: "-200px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
          }}
        >
          <h2><center>Login</center></h2>
          {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email"><strong>Email</strong></label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control rounded-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password"><strong>Password</strong></label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control rounded-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-success w-100 rounded-0"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-3">Don't have an account?</p>
          <Link
            to="/signup"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

export default Login;
