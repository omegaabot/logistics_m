import React, { useEffect } from "react";

function AdminPage() {
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "ROLE_ADMIN") {
      alert("Access Denied 🚫");
      window.location.href = "/user";
    }
  }, []);

  return <h2>Admin Dashboard</h2>;
}

export default AdminPage;