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

    private double amount;
    private Date transactiontime;
    private String description;
    private Long accountId;
    private Long receiverAccountId;

    private String token;

    public Transaction() {
    }

    public Transaction(Long id, TransactionType type, double amount, Date transactiontime, String description, Long accountId, Long receiverAccountId) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.transactiontime = transactiontime;
        this.description = description;
        this.accountId = accountId;
        this.receiverAccountId = receiverAccountId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Date getTransactiontime() {
        return transactiontime;
    }

    public void setTransactiontime(Date transactiontime) {
        this.transactiontime = transactiontime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Long getReceiverAccountId() {
        return receiverAccountId;
    }

    public void setReceiverAccountId(Long receiverAccountId) {
        this.receiverAccountId = receiverAccountId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
