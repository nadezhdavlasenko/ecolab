package com.example.ecolab.controller;

import com.example.ecolab.entity.Pollutant;
import com.example.ecolab.service.PollutantService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/pollutant")
public class PollutantController {

    private final PollutantService pollutantService;

    @Autowired
    public PollutantController(PollutantService pollutantService){
        this.pollutantService = pollutantService;
    }

    @GetMapping
    public List<Pollutant> pollutant(){
        return pollutantService.getAll();
    }
}
