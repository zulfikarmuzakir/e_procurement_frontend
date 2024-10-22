import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import AdminDashboard from "./components/AdminDashboard";
import VendorDashboard from "./components/VendorDashboard";
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />

          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/" element={<ProductList />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
