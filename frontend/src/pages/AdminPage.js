import React, { useEffect } from "react";
import Shipment from "../components/Shipment/Shipment";

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

      {/* 🔥 Admin sees all shipments */}
      <Shipment />
    </div>
  );
}

export default AdminPage;