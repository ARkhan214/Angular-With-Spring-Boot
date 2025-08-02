package com.emranhss.progect.service;


import com.emranhss.progect.dto.DistrictResponseDTO;
import com.emranhss.progect.entity.District;
import com.emranhss.progect.entity.Division;
import com.emranhss.progect.repository.IDistrictRepo;
import com.emranhss.progect.repository.IDivisionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DistrictService {

    @Autowired
    private IDistrictRepo districtRepo;

    @Autowired
    private IDivisionRepo divisionRepo;

    public void save(District district){
       if (district.getDivision() !=null){
           int divId = district.getDivision().getId();
           Division division = divisionRepo.findById(divId)
                   .orElseThrow(() -> new RuntimeException("Division not found WITH THIS ID: " + divId));

           district.setDivision(division);
       }
        districtRepo.save(district);
    }


    public List<District>getAllDistrict(){
        return districtRepo.findAll();
    }

    //new
    public List<DistrictResponseDTO>getAllDistrictDTOs(){
        List<District> districts = getAllDistrict();

        return districts.stream().map(d -> {
            DistrictResponseDTO dto = new DistrictResponseDTO();
            dto.setId(d.getId());
            dto.setName(d.getName());

            List<Integer> psIds = d.getPoliceStations().stream()
                    .map(ps -> ps.getId())
                    .toList();

            dto.setPoliceStations(psIds);
            return dto;
        }).toList();
    }


    public District getDistrictById(int id) {
        return districtRepo.findById(id).get();
    }

    public void deleteDistrictById(int id) {
        districtRepo.deleteById(id);
    }

    public District getDistrictByName(String name) {
        return   districtRepo.findByName(name);
    }

}
