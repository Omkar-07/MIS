package com.codeb.jpa;


import org.springframework.data.jpa.repository.JpaRepository;

import com.codeb.entity.Group;

public interface GroupRepository extends JpaRepository<Group, Long> {
    
}