package com.emranhss.progect.repository;


import com.emranhss.progect.entity.Reference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReferenceRepository extends JpaRepository<Reference,Long> {
    List<Reference>findByJobSeekerId(Long jobSeekerId);
}
