import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          background: "#f5f6fa",
        }}
      >
        {/* 🔥 Header */}
        <div
          style={{
            background: "#2f3640",
            color: "#fff",
            padding: "15px 20px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          🚚 Logistics Dashboard
        </div>

        {/* 🔥 Content */}
        <div style={{ padding: "20px" }}>
          {/* Navigation */}
          <div style={{ marginBottom: "20px" }}>
            <Link to="/">
              <button style={{ padding: "8px 12px" }}>User</button>
            </Link>

            <Link to="/admin">
              <button style={{ padding: "8px 12px", marginLeft: "10px" }}>
                Admin
              </button>
            </Link>
          </div>

          <Routes>
            <Route path="/" element={<UserPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>

        {/* Toast */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;