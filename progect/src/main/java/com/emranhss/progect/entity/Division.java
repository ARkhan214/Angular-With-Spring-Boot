package com.emranhss.progect.entity;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "divitions")
public class Division {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @Column(length = 50, nullable = false)
    private String name;

    //country code

    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;


    @OneToMany(mappedBy = "division",cascade = CascadeType.ALL)
    private List<District> districts;

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

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public List<District> getDistricts() {
        return districts;
    }

    public void setDistricts(List<District> districts) {
        this.districts = districts;
    }
}
