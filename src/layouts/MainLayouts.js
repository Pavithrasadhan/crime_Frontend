import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Sidebar />
      
      <div className="wrapper container-fluid">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
