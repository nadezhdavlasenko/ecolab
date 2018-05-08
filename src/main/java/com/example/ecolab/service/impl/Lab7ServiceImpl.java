package com.example.ecolab.service.impl;

import com.example.ecolab.dto.Lab6CalculationResultDto;
import com.example.ecolab.dto.ProbRiskShort;
import com.example.ecolab.entity.WaterObject;
import com.example.ecolab.repository.WaterObjectRepository;
import com.example.ecolab.service.Lab7Service;
import org.decimal4j.util.DoubleRounder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Lab7ServiceImpl implements Lab7Service {

    private final WaterObjectRepository waterObjectRepository;

    @Autowired
    public Lab7ServiceImpl(WaterObjectRepository waterObjectRepository) {
        this.waterObjectRepository = waterObjectRepository;
    }

    @Override
    public WaterObject calculate(Long id) {


        WaterObject waterObject = null;
        try {
            waterObject = waterObjectRepository.findById(id).orElseThrow(Exception::new);
        } catch (Exception e) {
            e.printStackTrace();
        }


        if (waterObject.getPh() <= 7) {
            waterObject.setWaterProb(4 - waterObject.getPh());


        } else if (waterObject.getPh() > 7) {
            waterObject.setWaterProb(-11 + waterObject.getPh());

        }
            if (waterObject.getWaterProb() >= -2 && waterObject.getWaterProb() <= 2) {
                waterObject.setWaterRisk(ProbRiskShort.map.get(waterObject.getWaterProb()));
            } else if (waterObject.getWaterProb() < -2 && waterObject.getWaterProb() >= -2.5) {
                waterObject.setWaterRisk(0.006);
            } else if (waterObject.getWaterProb() < -2.5 && waterObject.getWaterProb() >= -3) {
                waterObject.setWaterRisk(0.001);
            } else if (waterObject.getWaterProb() > 2 && waterObject.getWaterProb() <= 2.5) {
                waterObject.setWaterRisk(0.994);
            } else if (waterObject.getWaterProb() > 2.5 && waterObject.getWaterProb() <= 3) {
                waterObject.setWaterRisk(0.999);
            } else if (waterObject.getWaterProb() < -3) {
                waterObject.setWaterRisk(0.00);
            } else if (waterObject.getWaterProb() > 3) {
                waterObject.setWaterRisk(1.00);
            }


            waterObject.setColorProb(-3.33 + 0.067 * (waterObject.getColor() - waterObject.getNaturColor() + 20));

        if (waterObject.getColorProb() >= -2 && waterObject.getColorProb() <= 2) {
            waterObject.setColorRisk(ProbRiskShort.map.get(waterObject.getColorProb()));
        } else if (waterObject.getColorProb() < -2 && waterObject.getColorProb() >= -2.5) {
            waterObject.setColorRisk(0.006);
        } else if (waterObject.getColorProb() < -2.5 && waterObject.getColorProb() >= -3) {
            waterObject.setColorRisk(0.001);
        } else if (waterObject.getColorProb() > 2 && waterObject.getColorProb() <= 2.5) {
            waterObject.setColorRisk(0.994);
        } else if (waterObject.getColorProb() > 2.5 && waterObject.getColorProb() <= 3) {
            waterObject.setColorRisk(0.999);
        } else if (waterObject.getColorProb() < -3) {
            waterObject.setColorRisk(0.00);
        } else if (waterObject.getColorProb() > 3) {
            waterObject.setColorRisk(1.00);
        }

//       Risk2,8942,9410 X1 7,9310 X2 2,7710 X3

        waterObject.setRekrRisk(2.894 - 2.94/100000*waterObject.getX1() + 7.93/10000*waterObject.getX2() + 2.77/10000*waterObject.getX3());

        waterObject.setDrinkRisk(waterObject.getEpid()/100);

//        waterObject.getWaterObjectClass();


            return waterObject;

    }
}
