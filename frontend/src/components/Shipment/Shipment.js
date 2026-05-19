import React, { useEffect, useState } from "react";
import API from "../../api";
import { toast } from "react-toastify";

function Shipment() {
  const [shipments, setShipments] = useState([]);
  const [cities, setCities] = useState([]);
  const [pickup, setPickup] = useState("");
  const [delivery, setDelivery] = useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    fetchShipments();
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const res = await API.get("/locations/cities");
      setCities(res.data);
    } catch (err) {
      toast.error("Failed to load cities ❌");
    }
  };

  const fetchShipments = async () => {
    try {
      const res = await API.get("/shipments");
      setShipments(res.data);
    } catch (err) {
      toast.error("Unauthorized ❌");
    }
  };

  const createShipment = async () => {
    if (!pickup || !delivery) {
      toast.error("Please select both locations ❌");
      return;
    }

    if (pickup === delivery) {
      toast.error("Pickup and Delivery cannot be same ❌");
      return;
    }

    try {
      await API.post("/shipments", {
        pickupLocation: pickup,
        deliveryLocation: delivery,
        priority: "HIGH",
      });

      toast.success("Shipment Created 🚚");

      setPickup("");
      setDelivery("");
      fetchShipments();
    } catch (err) {
      toast.error("Failed to create shipment ❌");
    }
  };

  const deliverShipment = async (id) => {
    try {
      await API.put(`/shipments/deliver?shipmentId=${id}`);
      toast.success("Shipment Delivered ✅");
      fetchShipments();
    } catch (err) {
      toast.error("Delivery failed ❌");
    }
  };

  return (
    <div>
      <h2>📦 Shipments</h2>

      {/* 🔥 Create Shipment (only USER) */}
      {role === "ROLE_USER" && (
        <div
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            marginBottom: "20px",
          }}
        >
          <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            style={{ padding: "8px", marginRight: "10px" }}
          >
            <option value="">Select Pickup</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          <select
            value={delivery}
            onChange={(e) => setDelivery(e.target.value)}
            style={{ padding: "8px", marginRight: "10px" }}
          >
            <option value="">Select Delivery</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          <button
            onClick={createShipment}
            style={{
              padding: "8px 12px",
              background: "#273c75",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Create
          </button>
        </div>
      )}

      {/* 🔥 Shipment Cards */}
      {shipments.map((s) => (
        <div
          key={s.id}
          style={{
            borderRadius: "10px",
            margin: "15px 0",
            padding: "15px",
            background: "#fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p><b>ID:</b> {s.id}</p>
              <p><b>Route:</b> {s.route || "Not generated"}</p>
            </div>

            <div>
              <p>
                <b>Status:</b>{" "}
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: "5px",
                    background:
                      s.status === "DELIVERED"
                        ? "#4cd137"
                        : s.status === "ASSIGNED"
                        ? "#00a8ff"
                        : "#fbc531",
                    color: "#fff",
                  }}
                >
                  {s.status}
                </span>
              </p>

              <p>
                <b>Driver:</b> {s.driver ? s.driver.name : "None"}
              </p>
            </div>
          </div>

          {s.status !== "DELIVERED" && (
            <button
              onClick={() => deliverShipment(s.id)}
              style={{
                marginTop: "10px",
                padding: "6px 10px",
                background: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Mark Delivered
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Shipment;