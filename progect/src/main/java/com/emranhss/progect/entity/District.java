package com.emranhss.progect.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "districts")
public class District {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int id;

    @Column(length = 50, nullable = false)
    private String name;

    @OneToMany(mappedBy = "district" ,cascade = CascadeType.ALL)
    //sir ekhane jsonignor disa
    private List<PoliceStation>policeStations;


    @ManyToOne
    @JoinColumn(name = "division_id")
    private Division division;


    public District() {
    }

    public District(int id, String name, List<PoliceStation> policeStations) {
        this.id = id;
        this.name = name;
        this.policeStations = policeStations;
    }

    public  District(List<PoliceStation>policeStations){

        this.policeStations = policeStations;
    }

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

    public List<PoliceStation> getPoliceStations() {
        return policeStations;
    }

    public void setPoliceStations(List<PoliceStation> policeStations) {
        this.policeStations = policeStations;
    }

    public Division getDivision() {
        return division;
    }

    public void setDivision(Division division) {
        this.division = division;
    }
}
