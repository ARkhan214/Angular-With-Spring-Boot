package com.emranhss.progect.service;


import com.emranhss.progect.dto.CountryResponseDTO;
import com.emranhss.progect.entity.Country;
import com.emranhss.progect.repository.ICountryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {


    @Autowired
    private ICountryRepo countryRepository;

    public List<Country>getAllCountries(){
        return countryRepository.findAll();
    }

    public List<CountryResponseDTO>getAllCountryDTOs(){
        return getAllCountries().stream().map(c ->{
            CountryResponseDTO dto = new CountryResponseDTO();
            dto.setId(c.getId());
            dto.setName(c.getName());

            List<Integer>divisionIds =c.getDivisions().stream()
                    .map(d-> d.getId())
                    .toList();
            dto.setDivition(divisionIds);

            return dto;

        }).toList();
    }

    public Country saveCountry(Country country){
        return countryRepository.save(country);
    }



}
