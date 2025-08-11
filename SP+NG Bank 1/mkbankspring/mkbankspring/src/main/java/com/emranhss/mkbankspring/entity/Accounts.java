package com.emranhss.mkbankspring.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Accounts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id ;

   private String userId ;
   private String type ;
   private Long balance ;
   private String userName;
   private boolean status;
   private String photo;
}
