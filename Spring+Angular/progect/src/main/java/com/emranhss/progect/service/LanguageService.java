package com.emranhss.progect.service;


import com.emranhss.progect.entity.Language;
import com.emranhss.progect.repository.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LanguageService {


    @Autowired
    private LanguageRepository languageRepository;

    public List<Language>getByJobSeekerId(Long jobSeekerId){
        return languageRepository.findByJobSeekerId(jobSeekerId);
    }

    public Language save(Language language){
        return languageRepository.save(language);
    }

    public void delete(Long id){
        languageRepository.deleteById(id);
    }
}
