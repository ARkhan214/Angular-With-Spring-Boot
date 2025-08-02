package com.emranhss.progect.service;


import com.emranhss.progect.entity.Skill;
import com.emranhss.progect.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    @Autowired
    public SkillRepository skillRepository;

    public List<Skill> getByJobSeekerId(Long jobSeekerId){
        return skillRepository.fndByJobSeekerId(jobSeekerId);
    }

    public Skill save(Skill skill){
        return skillRepository.save(skill);
    }

    public void delete(Long id){
        skillRepository.deleteById(id);
    }
}
