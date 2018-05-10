package com.example.ecolab.controller;

import com.example.ecolab.entity.WaterObject;
import com.example.ecolab.service.WaterObjectService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @PostMapping(value = "/update")
    public WaterObject update(@RequestBody WaterObject waterObject){
      //  WaterObject waterObject = waterObjectService.getOne(id);

//        if (!waterObject.isPresent())
//            return ResponseEntity.notFound().build();

       // waterObject.setId(id);

        waterObjectService.save(waterObject);

//        return ResponseEntity.noContent().build();
        return waterObject;
    }
}
