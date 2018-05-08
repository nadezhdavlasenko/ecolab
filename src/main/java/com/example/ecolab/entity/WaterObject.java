package com.example.ecolab.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Waterobject")
public class WaterObject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "name")
    String name;

    @Column(name = "lat")
    Integer lat;

    @Column(name = "lon")
    Integer lon;

    @Column(name = "ph")
    Integer ph;

    @Column(name = "epid")
    Double epid;

    @Column(name = "naturColor")
    Integer naturColor;

    @Column(name = "color")
    Integer color;

    @Column(name = "x1")
    Integer x1 ;

    @Column(name = "x2")
    Integer x2 ;

    @Column(name = "x3")
    Integer x3 ;

    @Column(name = "waterProb")
    Integer waterProb;

    @Column(name = "waterRisk")
    Double waterRisk;

    @Column(name = "colorProb")
    Double colorProb;

    @Column(name = "colorRisk")
    Double colorRisk;

    @Column(name = "rekrRisk")
    Double rekrRisk;

    @Column(name = "drinkRisk")
    Double drinkRisk;


}