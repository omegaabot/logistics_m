import React, { useEffect, useState } from "react";
import API from "../../api";
import { toast } from "react-toastify";

function AdminPanel() {
  const [shipments, setShipments] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [driverFilter, setDriverFilter] = useState("ALL");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchData();
  }, []);
  const total = shipments.length;
  const delivered = shipments.filter((s) => s.status === "DELIVERED").length;
  const pending = shipments.filter((s) => s.status === "PENDING").length;

  const fetchData = async () => {
    const s = await API.get("/shipments");
    const d = await API.get("/drivers");

    setShipments(s.data);
    setDrivers(d.data);
  };

  const makeAvailable = async (driverId) => {
    try {
      await API.put(`/drivers/available?driverId=${driverId}`);
      toast.success("Driver is now AVAILABLE 🟢");
      fetchData();
    } catch (err) {
      toast.error("Failed to update driver ❌");
    }
  };

  const assignDriver = async (shipmentId, driverId) => {
    if (!driverId) return;

    try {
      await API.put(
        `/shipments/assign?shipmentId=${shipmentId}&driverId=${driverId}`,
      );

      toast.success("Driver Assigned 🚚");
      fetchData();
    } catch (err) {
      toast.error("Assignment failed ❌");
    }
  };

  return (
    <div>
      <h2>🧑‍💼 Admin Panel</h2>

      <div style={{ marginBottom: "20px" }}>
        <p>
          <b>Total:</b> {total}
        </p>
        <p>
          <b>Delivered:</b> {delivered}
        </p>
        <p>
          <b>Pending:</b> {pending}
        </p>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setFilter("ALL")}>All</button>
        <button
          onClick={() => setFilter("PENDING")}
          style={{ marginLeft: "10px" }}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("ASSIGNED")}
          style={{ marginLeft: "10px" }}
        >
          Assigned
        </button>
        <button
          onClick={() => setFilter("DELIVERED")}
          style={{ marginLeft: "10px" }}
        >
          Delivered
        </button>
      </div>

      <h3>📦 Shipments</h3>
      {shipments
        .filter((s) => {
          if (filter === "ALL") return true;
          return s.status === filter;
        })
        .map((s) => (
          <div
            key={s.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <p>ID: {s.id}</p>
            <p>Status: {s.status}</p>
            <p>Route: {s.route}</p>
            <p>Driver: {s.driver ? s.driver.name : "None"}</p>

            {/* Assign Driver */}
            {s.status === "PENDING" && (
              <select onChange={(e) => assignDriver(s.id, e.target.value)}>
                <option>Select Driver</option>
                {drivers
                  .filter((d) => d.status === "AVAILABLE")
                  .map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
              </select>
            )}
          </div>
        ))}

      <h3>🚚 Drivers</h3>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setDriverFilter("ALL")}>All</button>
        <button
          onClick={() => setDriverFilter("AVAILABLE")}
          style={{ marginLeft: "10px" }}
        >
          Available
        </button>
        <button
          onClick={() => setDriverFilter("BUSY")}
          style={{ marginLeft: "10px" }}
        >
          Busy
        </button>
      </div>
      {drivers
        .filter((d) => {
          if (driverFilter === "ALL") return true;
          return d.status === driverFilter;
        })
        .map((d) => (
          <div
            key={d.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              margin: "10px 0",
              padding: "12px",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <p>
              <b>Name:</b> {d.name}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span
                style={{
                  color: d.status === "AVAILABLE" ? "green" : "red",
                }}
              >
                {d.status}
              </span>
            </p>

            {/* Set Available Button */}
            {d.status === "BUSY" && (
              <button onClick={() => makeAvailable(d.id)}>Set Available</button>
            )}
          </div>
        ))}
    </div>
  );
}

export default AdminPanel;
