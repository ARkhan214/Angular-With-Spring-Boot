package com.emranhss.mkbankspring.dto;

import java.util.Date;

public class TransactionDTO {
    private Long id;
    private String accountHolderName;
    private Long receiverAccountId;
    private String receiverAccountName;
    private String type; // DEBIT or CREDIT
    private String transactionType;
    private double amount;
    private Date transactionTime;
    private String description;

    // New fields for bill payment
    private String companyName;           // Bill company (DESCO, TITAS, etc.)
    private String accountHolderBillingId; // Customer billing reference

    public TransactionDTO() {
    }

    public TransactionDTO(Long id, String accountHolderName, Long receiverAccountId, String receiverAccountName, String type, String transactionType, double amount, Date transactionTime, String description, String companyName, String accountHolderBillingId) {
        this.id = id;
        this.accountHolderName = accountHolderName;
        this.receiverAccountId = receiverAccountId;
        this.receiverAccountName = receiverAccountName;
        this.type = type;
        this.transactionType = transactionType;
        this.amount = amount;
        this.transactionTime = transactionTime;
        this.description = description;
        this.companyName = companyName;
        this.accountHolderBillingId = accountHolderBillingId;
    }

//    public TransactionDTO(Long id, String accountHolderName, Long receiverAccountId, String receiverAccountName, String type, String transactionType, double amount, Date transactionTime, String description) {
//        this.id = id;
//        this.accountHolderName = accountHolderName;
//        this.receiverAccountId = receiverAccountId;
//        this.receiverAccountName = receiverAccountName;
//        this.type = type;
//        this.transactionType = transactionType;
//        this.amount = amount;
//        this.transactionTime = transactionTime;
//        this.description = description;
//    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountHolderName() {
        return accountHolderName;
    }

    public void setAccountHolderName(String accountHolderName) {
        this.accountHolderName = accountHolderName;
    }

    public Long getReceiverAccountId() {
        return receiverAccountId;
    }

    public void setReceiverAccountId(Long receiverAccountId) {
        this.receiverAccountId = receiverAccountId;
    }

    public String getReceiverAccountName() {
        return receiverAccountName;
    }

    public void setReceiverAccountName(String receiverAccountName) {
        this.receiverAccountName = receiverAccountName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Date getTransactionTime() {
        return transactionTime;
    }

    public void setTransactionTime(Date transactionTime) {
        this.transactionTime = transactionTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getAccountHolderBillingId() {
        return accountHolderBillingId;
    }

    public void setAccountHolderBillingId(String accountHolderBillingId) {
        this.accountHolderBillingId = accountHolderBillingId;
    }
}
