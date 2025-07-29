package com.emranhss.progect.dto;

import java.util.List;

public class CountryResponseDTO {

    private int id;
    private String name;
    private List<Integer> divition;

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

    public List<Integer> getDivition() {
        return divition;
    }

    public void setDivition(List<Integer> divition) {
        this.divition = divition;
    }
}
