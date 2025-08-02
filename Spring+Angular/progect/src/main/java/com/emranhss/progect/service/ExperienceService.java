package com.emranhss.progect.service;

import com.emranhss.progect.entity.Experience;
import com.emranhss.progect.repository.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceService {

    @Autowired
    private ExperienceRepository experienceRepository;

    public List<Experience>getByJobSeekerId(Long jobSeekerId) {
        return experienceRepository.findByJobSeekerId(jobSeekerId);
    }

    public Experience save(Experience experience) {
        return experienceRepository.save(experience);
    }

    public void delete(Experience experience) {
        experienceRepository.delete(experience);
    }
}
