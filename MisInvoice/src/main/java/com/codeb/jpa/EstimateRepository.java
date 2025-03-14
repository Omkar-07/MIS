package com.codeb.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codeb.entity.Estimate;

public interface EstimateRepository extends JpaRepository<Estimate, Long> {
   
}
