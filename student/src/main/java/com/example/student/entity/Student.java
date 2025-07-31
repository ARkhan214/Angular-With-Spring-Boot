package com.example.student.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private int roll;
    private float marks;
    private String subject;

    public Student() {
    }

    public Student(int id, String name, int roll, float marks, String subject) {
        this.id = id;
        this.name = name;
        this.roll = roll;
        this.marks = marks;
        this.subject = subject;
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

    public int getRoll() {
        return roll;
    }

    public void setRoll(int roll) {
        this.roll = roll;
    }

    public float getMarks() {
        return marks;
    }

    public void setMarks(float marks) {
        this.marks = marks;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
}
