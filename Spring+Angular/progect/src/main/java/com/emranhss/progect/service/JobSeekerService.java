package com.emranhss.progect.service;

import com.emranhss.progect.entity.JobSeeker;
import com.emranhss.progect.repository.IJobSeekerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobSeekerService {

    @Autowired
    private IJobSeekerRepository jobSeekerRepository;


    public List<JobSeeker>grtAll() {
        return jobSeekerRepository.findAll();
    }

    public Optional<JobSeeker> grtById(Long id) {
        return jobSeekerRepository.findById(id);
    }

    public JobSeeker save(JobSeeker jobSeeker) {
        return jobSeekerRepository.save(jobSeeker);
    }
    public  void  delete(Long id){
        jobSeekerRepository.deleteById(id);
    }

    public JobSeeker getProfileByUserId(int userId) {
        return jobSeekerRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("JobSeeker not found"));
    }
}
