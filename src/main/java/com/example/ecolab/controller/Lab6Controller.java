package com.example.ecolab.controller;

import com.example.ecolab.dto.CalculateLab6RequestDto;
import com.example.ecolab.dto.Lab6CalculationResultDto;
import com.example.ecolab.service.Lab6Service;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "/lab6")
public class Lab6Controller {
    private final Lab6Service lab6Service;
    @Autowired
    public Lab6Controller(Lab6Service lab6Service){
        this.lab6Service = lab6Service;
    }

    @GetMapping("/calculate")
    public Lab6CalculationResultDto riskAssessment(Long pollutantId){

        return lab6Service.calculate(pollutantId);
    }
}
