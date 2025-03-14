package com.codeb.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codeb.entity.Brand;

public interface BrandRepository extends JpaRepository<Brand, Long> {

}