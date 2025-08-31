package com.emranhss.mkbankspring.dto;

public class LoanDto {

    private Long id;
    private double loanAmount;
    private double emiAmount;
    private String status;
    private String loanType;
    private AccountsDTO account; // এখানে DTO use করলাম

    public LoanDto() {
    }

    public LoanDto(Long id, double loanAmount, double emiAmount, String status, String loanType, AccountsDTO account) {
        this.id = id;
        this.loanAmount = loanAmount;
        this.emiAmount = emiAmount;
        this.status = status;
        this.loanType = loanType;
        this.account = account;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getLoanAmount() {
        return loanAmount;
    }

    public void setLoanAmount(double loanAmount) {
        this.loanAmount = loanAmount;
    }

    public double getEmiAmount() {
        return emiAmount;
    }

    public void setEmiAmount(double emiAmount) {
        this.emiAmount = emiAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    public AccountsDTO getAccount() {
        return account;
    }

    public void setAccount(AccountsDTO account) {
        this.account = account;
    }
}
