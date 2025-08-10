package com.emranhss.progect.service;

import com.emranhss.progect.dto.EducationDTO;
import com.emranhss.progect.entity.Education;
import com.emranhss.progect.entity.JobSeeker;
import com.emranhss.progect.repository.EducationRepository;
import com.emranhss.progect.repository.IJobSeekerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EducationService {

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private IJobSeekerRepository  jobSeekerRepository;

//    For view
    public List<EducationDTO> getByJobSeekerId(Long jobSeekerId) {
        List<Education> educations = educationRepository.findByJobSeekerId(jobSeekerId);
        return educations.stream()
                .map(EducationDTO::new)
                .collect(Collectors.toList());
    }

//    for save
    public Education saveEducation(Education education, String email) {
        JobSeeker jobSeeker = jobSeekerRepository.findByUserEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("JobSeeker not found"));
        education.setJobSeeker(jobSeeker);
        return educationRepository.save(education);
    }



//  delete
    public void delete(Long id) {
        educationRepository.deleteById(id);
    }


}
