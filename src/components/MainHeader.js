import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const MainHeader = () => {
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setUserName(user.name);
    }
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUserName("");
    navigate("/");
  };

  return (
    <div className="fixed-top">
      <nav className="navbar navbar-expand navbar bg-white">
      <div className="container-fluid">
        <h3 className="navbar-brand">
          <Link to="/" className="nav-item nav-link">Crime Portal</Link>
          </h3>

        <div className="navbar-nav ms-auto d-flex align-items-center ">
          <Link to="/helpcenter" className="nav-item nav-link mb-1 text-black fw-semibold">
  Help Center
</Link>

          {userName ? (
            <>
              <Link to='/userdashboard' className="nav-item nav-link">
              <span className="mb-1 text-black fw-semibold">
                Welcome, {userName}
                </span>
              </Link>
              <button
                className="btn btn-outline-danger fw-semibold"
                onClick={handleLogout}
                style={{
                  padding: "5px 12px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "background-color 0.3s",
                  marginLeft: '10px',
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{
              padding: "5px 12px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              transition: "background-color 0.3s",
              textDecoration: "none",
            }}>
  Sign In
</Link>
            
          )}
        </div>
      </div>
      </nav>
    </div>
  );
};

export default MainHeader;
