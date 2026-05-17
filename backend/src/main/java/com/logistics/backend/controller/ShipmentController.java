package com.logistics.backend.controller;

import com.logistics.backend.model.Shipment;
import com.logistics.backend.service.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shipments")
public class ShipmentController {

    @Autowired
    private ShipmentService shipmentService;

    @PostMapping
    public Shipment createShipment(@RequestBody Shipment shipment) {
        return shipmentService.createShipment(shipment);
    }

    @GetMapping
    public List<Shipment> getShipments() {
        return shipmentService.getAllShipments();
    }

    @PutMapping("/assign")
    public Shipment assignDriver(
            @RequestParam Long shipmentId,
            @RequestParam Long driverId) {
        return shipmentService.assignDriver(shipmentId, driverId);
    }

    @PutMapping("/deliver")
    public Shipment markDelivered(@RequestParam Long shipmentId) {
        return shipmentService.markDelivered(shipmentId);
    }
}