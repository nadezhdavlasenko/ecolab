package com.example.ecolab.controller;

import com.example.ecolab.entity.WaterObject;
import com.example.ecolab.service.WaterObjectService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/waterobject")
public class WaterObjectController {

    private final WaterObjectService waterObjectService;

    @Autowired
    public WaterObjectController(WaterObjectService waterObjectService){
        this.waterObjectService = waterObjectService;
    }

    @GetMapping
    public List<WaterObject> waterObject(){
        return waterObjectService.getAll();
    }
}
