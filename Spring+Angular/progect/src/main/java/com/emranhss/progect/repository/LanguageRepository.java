package com.emranhss.progect.repository;

import com.emranhss.progect.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LanguageRepository extends JpaRepository<Language,Long> {
    List<Language> findByJobSeekerId(Long jobSeekerId);
}
