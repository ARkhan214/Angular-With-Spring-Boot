package com.emranhss.progect.restcontroller;

import com.emranhss.progect.dto.PoliceStationResponseDTO;
import com.emranhss.progect.entity.PoliceStation;
import com.emranhss.progect.service.PoliceStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policestation/")
public class PoliceStationRestController {

    @Autowired
    private PoliceStationService policeStationService;

    @PostMapping
    public ResponseEntity<PoliceStation> createPoliceStation(@RequestBody PoliceStation policeStation) {
        PoliceStation created = policeStationService.create(policeStation);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<List<PoliceStationResponseDTO>> getAllPoliceStations() {
        List<PoliceStationResponseDTO> list = policeStationService.getAllPoliceStationDTO();
        return ResponseEntity.ok(list);
    }

    @GetMapping("{id}")
    public ResponseEntity<PoliceStation> getPoliceStationById(@PathVariable int id) {
        return policeStationService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PoliceStation> updatePoliceStation(@PathVariable int id,
                                                             @RequestBody PoliceStation policeStation) {
        try {
            PoliceStation updated = policeStationService.update(id, policeStation);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePoliceStation(@PathVariable int id) {
        policeStationService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


//    @PostMapping("")
//    public void save(@RequestBody PoliceStation ps){
//
//        policeStationService.saveOrUpdate(ps);
//    }


//    @GetMapping("")
//    public List<PoliceStation> getAll(){
//
//        return policeStationService.findAll();
//    }

//    @GetMapping("{id}")
//    public PoliceStation getById(@PathVariable Integer id) {
//
//        return policeStationService.findById(id).get();
//    }

//    @PutMapping("{id}")
//    public void Update(@RequestBody PoliceStation ps) {
//
//        policeStationService.saveOrUpdate(ps);
//
//    }


//    @DeleteMapping("{id}")
//    public void deleteById(@PathVariable Integer id) {
//
//        policeStationService.deleteById(id);
//    }

}