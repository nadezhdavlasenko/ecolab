package com.example.ecolab.service.impl;

import com.example.ecolab.dto.Lab6CalculationResultDto;
import com.example.ecolab.dto.ProbRiskShort;
import com.example.ecolab.entity.Pollutant;
import com.example.ecolab.repository.PollutantRepository;
import com.example.ecolab.service.Lab6Service;
import org.decimal4j.util.DoubleRounder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Lab6ServiceImpl implements Lab6Service {

    private final PollutantRepository pollutantRepository;

    @Autowired
    public Lab6ServiceImpl(PollutantRepository pollutantRepository) {
        this.pollutantRepository = pollutantRepository;
    }

    @Override
    public Pollutant calculate(Long pollutantId) {

        Lab6CalculationResultDto resultDto = new Lab6CalculationResultDto();

        Pollutant pollutant = null;
        try {
            pollutant = pollutantRepository.findById(pollutantId).orElseThrow(Exception::new);
        } catch (Exception e) {
            e.printStackTrace();
        }

        Double logCMCL = Math.log10(pollutant.getAverageConcentration() / pollutant.getMCL());

        if (pollutant.getPollutantClass() == 1){
            pollutant.setProb(DoubleRounder.round((-9.5 + 11.66 * logCMCL), 1));
            pollutant.setKReserve(7.5);
            pollutant.setB(2.35);

        } else
            if (pollutant.getPollutantClass() == 2){
                pollutant.setProb(DoubleRounder.round((-5.51 + 7.49 * logCMCL), 1));
                pollutant.setKReserve(6.0);
                pollutant.setB(1.28);
            } else
            if (pollutant.getPollutantClass() == 3){
                pollutant.setProb(DoubleRounder.round((-2.35 + 3.73 * logCMCL), 1));
                pollutant.setKReserve(4.5);
                pollutant.setB(1.0);
            } else
            {
                pollutant.setProb(DoubleRounder.round((-1.41 + 2.33 * logCMCL),1));
                pollutant.setKReserve(3.0);
                pollutant.setB(0.87);
            }

        if (pollutant.getProb() >= -2 && pollutant.getProb() <= 2) {
            pollutant.setRiskShort(ProbRiskShort.map.get(pollutant.getProb()));
        }

        pollutant.setRiskLong(1 - Math.exp(Math.log(0.84) * pollutant.getAverageConcentration() / pollutant.getMCL() * pollutant.getB()/pollutant.getKReserve()));





//        Pollutant pollutant = new Pollutant();
//        pollutant.getPollutantClass();


        return null;
    }
}
