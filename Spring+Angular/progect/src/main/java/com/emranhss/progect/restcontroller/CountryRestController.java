package com.emranhss.progect.restcontroller;

import com.emranhss.progect.dto.CountryResponseDTO;
import com.emranhss.progect.entity.Country;
import com.emranhss.progect.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/countries/")
public class CountryRestController {

    @Autowired
    private CountryService countryService;


    @GetMapping("")
    public ResponseEntity<List<CountryResponseDTO>>getCountries(){
        List<CountryResponseDTO> dtoList = countryService.getAllCountryDTOs();
        return ResponseEntity.ok(dtoList);
    }


    @PostMapping("")
    public ResponseEntity<Country> createCountry(@RequestBody Country country){
        Country saved = countryService.saveCountry(country);
        return  ResponseEntity.ok(saved);
    }



}

