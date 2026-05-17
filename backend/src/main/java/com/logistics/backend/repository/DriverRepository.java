package com.logistics.backend.repository;

import com.logistics.backend.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRepository extends JpaRepository<Driver, Long> {

    Driver findFirstByStatus(String status);
}