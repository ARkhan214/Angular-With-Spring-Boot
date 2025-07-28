package com.example.crud.entity;


import jakarta.persistence.*;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private float salary;
    private String designation;

    public Employee() {
    }

    public Employee(Long id, String name, float salary, String designation) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.designation = designation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getSalary() {
        return salary;
    }

    public void setSalary(float salary) {
        this.salary = salary;
    }

    public String getDesagination() {
        return designation;
    }

    public void setDesagination(String designation) {
        this.designation = designation;
    }
}
