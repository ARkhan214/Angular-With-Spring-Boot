package com.emranhss.progect.repository;

import com.emranhss.progect.entity.Experience;
import com.emranhss.progect.entity.JobSeeker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    List<Experience>findByJobSeekerId(Long jobSeekerId);
}
