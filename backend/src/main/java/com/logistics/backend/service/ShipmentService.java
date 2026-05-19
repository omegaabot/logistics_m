package com.logistics.backend.service;

import java.util.Map;
import java.util.HashMap;
import java.util.List;

import org.springframework.web.client.RestTemplate;

import com.logistics.backend.model.Shipment;
import com.logistics.backend.model.City;
import com.logistics.backend.model.Driver;
import com.logistics.backend.repository.CityRepository;
import com.logistics.backend.repository.DriverRepository;
import com.logistics.backend.repository.ShipmentRepository;

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

    public Shipment createShipment(Shipment shipment) {

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

    // ✅ FIX 1
    public List<Shipment> getAllShipments() {
        return shipmentRepository.findAll();
    }

    // ✅ FIX 2
    public Shipment assignDriver(Long shipmentId, Long driverId) {
        Shipment shipment = shipmentRepository.findById(shipmentId).orElseThrow();
        Driver driver = driverRepository.findById(driverId).orElseThrow();

        shipment.setDriver(driver);
        shipment.setStatus("ASSIGNED");

        driver.setStatus("BUSY");
        driverRepository.save(driver);

        return shipmentRepository.save(shipment);
    }

    // ✅ FIX 3
    public Shipment markDelivered(Long shipmentId) {

        Shipment shipment = shipmentRepository.findById(shipmentId).orElseThrow();

        shipment.setStatus("DELIVERED");

        Driver driver = shipment.getDriver();

        if (driver != null) {
            driver.setStatus("AVAILABLE");
            driverRepository.save(driver);
        }

        return shipmentRepository.save(shipment);
    }
}