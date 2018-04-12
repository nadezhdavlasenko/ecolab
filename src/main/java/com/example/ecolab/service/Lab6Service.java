package com.example.ecolab.service;

import com.example.ecolab.dto.CalculateLab6RequestDto;
import com.example.ecolab.dto.Lab6CalculationResultDto;
import org.springframework.stereotype.Service;


public interface Lab6Service {
    Lab6CalculationResultDto calculate(Long pollutantId);
}
