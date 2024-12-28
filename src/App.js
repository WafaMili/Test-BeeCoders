import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AdminDashboard from "./components/AdminDashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
          <img src="images/images (1).png" alt="BeeCoders" width="40" height="40" />{" "}
            THE BRIDGE
          </Link>
          <Link className="nav-link" to="/admin">
          <img src="images/admin-icon.webp" alt="BeeCoders" width="40" height="40" />{" "}
            Admin
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
