import React, { useEffect } from "react";

function UserPage() {
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role) {
      window.location.href = "/";
    }
  }, []);

  return <h2>User Dashboard</h2>;
}

export default UserPage;