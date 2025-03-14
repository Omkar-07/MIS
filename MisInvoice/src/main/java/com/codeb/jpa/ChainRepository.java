package com.codeb.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codeb.entity.Chain;

public interface ChainRepository extends JpaRepository<Chain, Long> {

}