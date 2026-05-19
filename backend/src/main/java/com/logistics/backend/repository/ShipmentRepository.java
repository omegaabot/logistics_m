package com.logistics.backend.repository;

import com.logistics.backend.model.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import com.logistics.backend.model.User;
import java.util.List;

public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    List<Shipment> findByUser(User user);
}