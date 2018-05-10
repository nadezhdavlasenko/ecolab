package com.example.ecolab.service;

import com.example.ecolab.entity.WaterObject;

import java.util.List;

public interface WaterObjectService {
    List<WaterObject> getAll();
    WaterObject getOne(Long id);
    void save(WaterObject waterObject);
}
