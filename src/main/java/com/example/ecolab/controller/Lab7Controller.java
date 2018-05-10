package com.example.ecolab.controller;

//import com.example.ecolab.dto.CalculateLab6RequestDto;
import com.example.ecolab.entity.WaterObject;
import com.example.ecolab.service.Lab7Service;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "/lab7")
public class Lab7Controller {
    private final Lab7Service lab7Service;
    @Autowired
    public Lab7Controller(Lab7Service lab7Service){
        this.lab7Service = lab7Service;
    }

    @GetMapping("/calculate")
    public WaterObject riskAssessment(Long id){

        return lab7Service.calculate(id);
    }
}
