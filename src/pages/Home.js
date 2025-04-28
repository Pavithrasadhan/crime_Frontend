import { Link } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";

const Home = () => {
    return (
        <div className="home-container" style={{ background:'none', height: '100vh'}}>
            
            <MainHeader />
            <div className="container-fluid d-flex justify-content-center align-items-center">
                <div className="card shadow-lg p-4 text-center" style={{ backgroundColor: '#f8f9fa', borderRadius: '15px', width: '50%', marginTop: '250px' }}>
                    <h2 className="mb-3">Have a Complaint?</h2>
                    <p>Register your complaint and track its status securely.</p>
                    <Link to="/signup" className="btn btn-primary btn-lg mt-3">
                        Sign Up
                    </Link>
                    <br />
                    
    
                </div>
            </div>
            <MainFooter />
        </div>
        
    );
};

export default Home;
