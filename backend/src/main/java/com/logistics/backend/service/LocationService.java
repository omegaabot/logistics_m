package com.logistics.backend.service;

import com.logistics.backend.model.City;
import com.logistics.backend.model.State;
import com.logistics.backend.repository.CityRepository;
import com.logistics.backend.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    private StateRepository stateRepository;

    @Autowired
    private CityRepository cityRepository;

    public State addState(State state) {
        return stateRepository.save(state);
    }

    public City addCity(Long stateId, City city) {
        State state = stateRepository.findById(stateId).orElseThrow();
        city.setState(state);
        return cityRepository.save(city);
    }

    public List<State> getStates() {
        return stateRepository.findAll();
    }

    public List<City> getCities() {
        return cityRepository.findAll();
    }
}