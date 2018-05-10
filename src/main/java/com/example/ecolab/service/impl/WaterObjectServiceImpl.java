package com.example.ecolab.service.impl;

import com.example.ecolab.entity.WaterObject;
import com.example.ecolab.repository.WaterObjectRepository;
import com.example.ecolab.service.WaterObjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WaterObjectServiceImpl implements WaterObjectService {

    private final WaterObjectRepository waterObjectRepository;

    @Autowired
    public WaterObjectServiceImpl(WaterObjectRepository waterObjectRepository){
        this.waterObjectRepository = waterObjectRepository;
    }

    @Override
    public List<WaterObject> getAll() {
        List<WaterObject> waterObjectList = new ArrayList<>();
        waterObjectRepository.findAll().forEach(waterObjectList::add);
        return waterObjectList;
    }

    @Override
    public WaterObject getOne(Long id) {
        WaterObject waterObject = new WaterObject();
        try {
            waterObject = waterObjectRepository.findById(id).orElseThrow(Exception::new);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return waterObject;
    }

    @Override
    public void save(WaterObject waterObject) {
        waterObjectRepository.save(waterObject);
    }
}
