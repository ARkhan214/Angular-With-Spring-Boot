package com.emranhss.progect.restcontroller;


import com.emranhss.progect.dto.DivisionResponseDTO;
import com.emranhss.progect.entity.Division;
import com.emranhss.progect.service.DivisionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/division/")
public class DivisionRestController {

    @Autowired
    private DivisionService divisionService;

    @GetMapping("")
    public ResponseEntity<List<DivisionResponseDTO>> getDivition(){
        List<DivisionResponseDTO> dtoList = divisionService.getAllDivisionDTOs();
        return ResponseEntity.ok(dtoList);
    }

    @PostMapping("")
    public ResponseEntity<Division> createDivision(@RequestBody Division division){
        Division save = divisionService.saveDivision(division);
        return ResponseEntity.ok(save);
    }

}
