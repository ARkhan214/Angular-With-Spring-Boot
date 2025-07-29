package com.emranhss.progect.dto;

import java.util.List;

public class DistrictResponseDTO {

    private int id;
    private String name;
    private List<Integer> policeStations;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Integer> getPoliceStations() {
        return policeStations;
    }

    public void setPoliceStations(List<Integer> policeStations) {
        this.policeStations = policeStations;
    }
}
