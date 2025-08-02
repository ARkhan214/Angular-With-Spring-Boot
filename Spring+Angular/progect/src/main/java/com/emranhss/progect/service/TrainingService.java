package com.emranhss.progect.service;


import com.emranhss.progect.entity.Training;
import com.emranhss.progect.repository.TrainingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainingService {

    @Autowired
    private TrainingRepository trainingRepository;

    public List<Training> getByJobSeekerId(Long id){
        return trainingRepository.findByJobSeekerId(id);
    }

    public Training save(Training training){
        return trainingRepository.save(training);
    }

    public void delete(Long id){
        trainingRepository.deleteById(id);
    }
}
