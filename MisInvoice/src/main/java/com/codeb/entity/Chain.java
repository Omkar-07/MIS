package com.codeb.entity;


import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor 
public class Chain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "chain")
    private Set<Client> clients;

    @OneToMany(mappedBy = "chain")
    private Set<Group> groups;

    @OneToMany(mappedBy = "chain")
    private Set<Brand> brands;

 
}