import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          🚚 Logistics Dashboard
          {token && (
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              style={{
                padding: "6px 10px",
                background: "#e84118",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Logout
            </button>
          )}
        </div>

        {/* 🔥 Content */}
        <div style={{ padding: "20px" }}>
          {/* Navigation */}
          {token && (
            <div style={{ marginBottom: "20px" }}>
              <Link to="/">
                <button style={{ padding: "8px 12px" }}>User</button>
              </Link>

              {/* 🔐 Show only for ADMIN */}
              {role === "ROLE_ADMIN" && (
                <Link to="/admin">
                  <button style={{ padding: "8px 12px", marginLeft: "10px" }}>
                    Admin
                  </button>
                </Link>
              )}
            </div>
          )}

          {/* 🔥 Routes */}
          <Routes>
            {/* Public */}
            <Route path="/" element={<LoginPage />} />

            {/* Protected */}
            {token && (
              <>
                <Route path="/user" element={<UserPage />} />

                <Route
                  path="/admin"
                  element={
                    role === "ROLE_ADMIN" ? (
                      <AdminPage />
                    ) : (
                      <h2>Access Denied 🚫</h2>
                    )
                  }
                />
              </>
            )}

            {/* Fallback */}
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </div>

        {/* Toast */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
