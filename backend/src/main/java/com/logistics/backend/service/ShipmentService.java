package com.logistics.backend.service;

import java.util.Map;
import java.util.HashMap;
import java.util.List;

import org.springframework.web.client.RestTemplate;
import org.springframework.security.core.context.SecurityContextHolder;

import com.logistics.backend.model.Shipment;
import com.logistics.backend.model.City;
import com.logistics.backend.model.Driver;
import com.logistics.backend.model.User;

import com.logistics.backend.repository.CityRepository;
import com.logistics.backend.repository.DriverRepository;
import com.logistics.backend.repository.ShipmentRepository;
import com.logistics.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepository;

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private UserRepository userRepository;

    // 🔐 CREATE SHIPMENT (with user from JWT)
    public Shipment createShipment(Shipment shipment) {

        // Get logged-in user from JWT
        String email = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        shipment.setUser(user);

        String url = "http://localhost:8001/route";

        Map<String, Object> request = new HashMap<>();
        request.put("start", shipment.getPickupLocation());
        request.put("end", shipment.getDeliveryLocation());

        try {
            Map response = restTemplate.postForObject(url, request, Map.class);

            if (response != null && response.get("error") == null) {
                shipment.setCost((Integer) response.get("cost"));
                shipment.setRoute(response.get("path").toString());
            } else {
                shipment.setStatus("FAILED");
            }
        } catch (Exception e) {
            System.err.println("Error calling routing service: " + e.getMessage());
            shipment.setStatus("FAILED");
        }

        // Auto assign driver
        Driver driver = driverRepository.findFirstByStatus("AVAILABLE");

        if (driver != null) {
            shipment.setDriver(driver);
            shipment.setStatus("ASSIGNED");

            driver.setStatus("BUSY");
            driverRepository.save(driver);
        } else {
            if (!"FAILED".equals(shipment.getStatus())) {
                shipment.setStatus("PENDING");
            }
        }

        return shipmentRepository.save(shipment);
    }

    // 🔥 IMPORTANT: ROLE-BASED FETCH
    public List<Shipment> getAllShipments() {

        String email = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Admin sees all shipments
        if (user.getRole().name().equals("ROLE_ADMIN")) {
            return shipmentRepository.findAll();
        }

        // Other users see only their shipments
        return shipmentRepository.findByUser(user);
    }

    // Assign driver manually
    public Shipment assignDriver(Long shipmentId, Long driverId) {

        Shipment shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new RuntimeException("Shipment not found"));

        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        shipment.setDriver(driver);
        shipment.setStatus("ASSIGNED");

        driver.setStatus("BUSY");
        driverRepository.save(driver);

        return shipmentRepository.save(shipment);
    }

    // Mark shipment delivered
    public Shipment markDelivered(Long shipmentId) {

        Shipment shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new RuntimeException("Shipment not found"));

        shipment.setStatus("DELIVERED");

        Driver driver = shipment.getDriver();

        if (driver != null) {
            driver.setStatus("AVAILABLE");
            driverRepository.save(driver);
        }

        return shipmentRepository.save(shipment);
    }
}