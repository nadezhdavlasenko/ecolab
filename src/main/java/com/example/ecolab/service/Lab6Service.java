package com.example.ecolab.service;

//import com.example.ecolab.dto.CalculateLab6RequestDto;
import com.example.ecolab.entity.Pollutant;


public interface Lab6Service {
    Pollutant calculate(Long pollutantId);
}
