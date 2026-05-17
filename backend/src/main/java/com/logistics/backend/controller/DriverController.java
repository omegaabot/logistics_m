package com.logistics.backend.controller;

import com.logistics.backend.model.Driver;
import com.logistics.backend.repository.DriverRepository;
import com.logistics.backend.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/drivers")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @PostMapping
    public Driver addDriver(@RequestBody Driver driver) {
        return driverService.addDriver(driver);
    }

    @GetMapping
    public List<Driver> getDrivers() {
        return driverService.getAllDrivers();
    }

    @Autowired
    private DriverRepository driverRepository;

    @PutMapping("/available")
    public Driver makeAvailable(@RequestParam Long driverId) {
        Driver driver = driverRepository.findById(driverId).orElseThrow();
        driver.setStatus("AVAILABLE");
        return driverRepository.save(driver);
    }
}