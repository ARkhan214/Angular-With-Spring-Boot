package com.emranhss.progect.repository;

import com.emranhss.progect.entity.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingRepository extends JpaRepository<Training,Long> {
    List<Training> findByJobSeekerId(Long jobSeekerId);
}
