import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayouts from "./layouts/MainLayouts";
import Dashboard from "./pages/Admin/Dashboard";
import Reports from "./pages/Admin/Reports";
import AddReports from "./pages/AddReports";
import User from "./pages/Admin/User";
import AddUser from "./pages/Admin/AddUser";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import EditReport from "./pages/Admin/EditReports";
import HelpCenter from "./pages/HelpCenter";
import EditUser from "./pages/Admin/EditUser";
import HelpCenterAdmin from "./pages/Admin/HelpCenterAdmin";
import AddFAQ from "./pages/Admin/AddFAQ";
import EditFaq from "./pages/Admin/EditFaq";

function App() {
  return (
    <Router>
      <div style={{backgroundImage: `url('/img/R.jpg')`}}>
        
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/addreports" element={<AddReports />} />
            
            <Route path="/helpcenter" element={<HelpCenter />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            
            {/* Admin Only Routes */}
            <Route path="/dashboard" element={<MainLayouts><Dashboard /></MainLayouts>} />

            <Route path="/reports" element={<MainLayouts> <Reports /> </MainLayouts>} />
            <Route path="/reports/addreports" element={<MainLayouts> <AddReports /> </MainLayouts>} />
            <Route path="/reports/editreports/:userName" element={<MainLayouts><EditReport /></MainLayouts>} />

            <Route path="/user" element={<MainLayouts> <User /> </MainLayouts>} />
            <Route path="/user/adduser" element={<MainLayouts> <AddUser /> </MainLayouts>} />
            <Route path="/user/edituser/:id" element={<MainLayouts><EditUser /></MainLayouts>} />

            <Route path="/faq" element={<MainLayouts><HelpCenterAdmin /></MainLayouts>} />
            <Route path="/faq/addfaq" element={<MainLayouts><AddFAQ /></MainLayouts>} />
            <Route path="/faq/editfaq/:id" element={<MainLayouts><EditFaq /></MainLayouts>} />
        
          </Routes>
          </div>
      
    </Router>
  );
}

export default App;
