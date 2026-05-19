import React, { useEffect } from "react";
import Shipment from "../components/Shipment/Shipment";

function UserPage() {
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>

      {/* 🔥 Show shipment component */}
      <Shipment />
    </div>
  );
}

export default UserPage;