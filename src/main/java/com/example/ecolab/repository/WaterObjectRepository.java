package com.example.ecolab.repository;//package com.example.ecolab.repository;
//

import com.example.ecolab.entity.WaterObject;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WaterObjectRepository extends CrudRepository<WaterObject, Long> {


}

//import com.example.ecolab.entity.Pollutant;
//import org.springframework.stereotype.Repository;
//
//@Repository
//public interface PollutantRepository extends CrudRepository<Pollutant, Long>{}
