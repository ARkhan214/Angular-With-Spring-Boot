package com.emranhss.progect.repository;

import com.emranhss.progect.entity.Hobby;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HobbyRepository extends JpaRepository<Hobby,Long> {
List<Hobby> findByJobSeekerId(Long jobSeekerId);
}
