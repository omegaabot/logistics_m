import React, { useEffect } from "react";
import AdminPanel from "../components/Admin/AdminPanel";

function AdminPage() {
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "ROLE_ADMIN") {
      alert("Access Denied 🚫");
      window.location.href = "/user";
    }
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <AdminPanel />
    </div>
  );
}

export default AdminPage;