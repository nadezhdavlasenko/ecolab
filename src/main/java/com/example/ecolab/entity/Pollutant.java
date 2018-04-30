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

    @Column(name = "Prob")
    Double Prob;

    @Column(name = "riskShort")
    Double riskShort;

    @Column(name = "kReserve")
    Double kReserve;

    @Column(name = "b")
    Double b;

    @Column(name = "riskLong")
    Double riskLong;


}
