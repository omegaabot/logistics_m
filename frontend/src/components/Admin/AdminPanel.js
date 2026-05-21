import React, { useEffect, useState, useCallback } from "react";
import API from "../../api";
import { toast } from "react-toastify";

function AdminPanel() {
  const [shipments, setShipments] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [driverFilter, setDriverFilter] = useState("ALL");
  const [filter, setFilter] = useState("ALL");
  const [editingShipmentId, setEditingShipmentId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const total = shipments.length;
  const delivered = shipments.filter((s) => s.status === "DELIVERED").length;
  const pending = shipments.filter((s) => s.status === "PENDING" || s.status === "ASSIGNED").length;

  const fetchData = async () => {
    const s = await API.get("/shipments");
    const d = await API.get("/drivers");

    console.debug("AdminPanel :: drivers data:", d.data);
    console.debug("AdminPanel :: shipments data:", s.data);

    setShipments(s.data);
    setDrivers(d.data);
  };

  const makeAvailable = async (driverId) => {
    try {
      await API.put(`/drivers/available?driverId=${driverId}`);
      toast.success("Driver is now AVAILABLE");
      fetchData();
    } catch (err) {
      toast.error("Failed to update driver");
    }
  };

  const assignDriver = useCallback(async (shipmentId, driverId) => {
    if (!driverId) return;

    try {
      await API.put(
        `/shipments/assign?shipmentId=${shipmentId}&driverId=${driverId}`,
      );

      toast.success("Driver Assigned");
      setEditingShipmentId(null);
      fetchData();
    } catch (err) {
      toast.error("Assignment failed");
    }
  }, []);

  const availableDrivers = drivers.filter(
    (d) => d.status?.toUpperCase() === "AVAILABLE"
  );

  return (
    <div>
      <h2>Admin Panel</h2>

      <div style={{ marginBottom: "20px" }}>
        <p><b>Total:</b> {total}</p>
        <p><b>Delivered:</b> {delivered}</p>
        <p><b>Pending:</b> {pending}</p>
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

      <h3>Shipments</h3>
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

            <div style={{ marginTop: "10px" }}>
              <span
                style={{
                  cursor: "pointer",
                  color: "#2980b9",
                  fontWeight: 500,
                  borderBottom: "1px dashed #2980b9",
                }}
                onClick={() =>
                  setEditingShipmentId(
                    editingShipmentId === s.id ? null : s.id
                  )
                }
              >
                <b>Driver:</b> {s.driver ? s.driver.name : "None"}
              </span>

              {editingShipmentId === s.id && (
                <div style={{ marginTop: "8px" }}>
                  {availableDrivers.length === 0 ? (
                    <span style={{ color: "#e67e22", fontSize: "13px" }}>
                      No available drivers
                    </span>
                  ) : (
                    <select
                      value=""
                      onChange={(e) => assignDriver(s.id, e.target.value)}
                      style={{
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        minWidth: "180px",
                      }}
                      autoFocus
                    >
                      <option value="">Select Driver</option>
                      {availableDrivers.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

      <h3>Drivers</h3>
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
            <p><b>Name:</b> {d.name}</p>
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

            {d.status === "BUSY" && (
              <button onClick={() => makeAvailable(d.id)}>Set Available</button>
            )}
          </div>
        ))}
    </div>
  );
}

export default AdminPanel;

