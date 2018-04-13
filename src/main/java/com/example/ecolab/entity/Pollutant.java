package com.example.ecolab.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Pollutant")
public class Pollutant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "name")
    String name;

    @Column(name = "class")
    Integer pollutantClass;

    @Column(name = "averageConcentration")
    Double averageConcentration;

    @Column(name = "MCL")
    Double MCL;


}
