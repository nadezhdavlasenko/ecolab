package com.example.ecolab.service.impl;

import com.example.ecolab.entity.Pollutant;
import com.example.ecolab.repository.PollutantRepository;
import com.example.ecolab.service.PollutantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PollutantServiceImpl implements PollutantService {

    private final PollutantRepository pollutantRepository;

    @Autowired
    public PollutantServiceImpl(PollutantRepository pollutantRepository){
        this.pollutantRepository = pollutantRepository;
    }

    @Override
    public List<Pollutant> getAll() {
        List<Pollutant> pollutantList = new ArrayList<>();
        pollutantRepository.findAll().forEach(pollutantList::add);
        return pollutantList;
    }
}
