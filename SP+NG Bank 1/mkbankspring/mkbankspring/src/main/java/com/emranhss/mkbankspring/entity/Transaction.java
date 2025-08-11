package com.emranhss.mkbankspring.entity;

import jakarta.persistence.*;
import jakarta.persistence.spi.PersistenceUnitTransactionType;

import java.util.Date;


@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(value = EnumType.STRING)
    private TransactionType type;

    private Long amount;
    private Date transactiontime;
    private String description;
    private Long accountId;
    private Long receiverAccountId;


}
