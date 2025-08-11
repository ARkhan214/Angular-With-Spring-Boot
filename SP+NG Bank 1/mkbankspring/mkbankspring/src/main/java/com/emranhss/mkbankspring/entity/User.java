package com.emranhss.mkbankspring.entity;

import jakarta.persistence.*;

import java.util.List;


@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private boolean isActivetype;
    private String photoUrl;

    @OneToMany
    private List<Token> tokens;



}
