package com.logistics.backend.controller;

import com.logistics.backend.model.City;
import com.logistics.backend.model.State;
import com.logistics.backend.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @PostMapping("/state")
    public State addState(@RequestBody State state) {
        return locationService.addState(state);
    }

    @PostMapping("/city")
    public City addCity(@RequestParam Long stateId, @RequestBody City city) {
        return locationService.addCity(stateId, city);
    }

    @GetMapping("/states")
    public List<State> getStates() {
        return locationService.getStates();
    }

    @GetMapping("/cities")
    public List<City> getCities() {
        return locationService.getCities();
    }
}