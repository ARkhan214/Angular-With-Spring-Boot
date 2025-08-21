package com.emranhss.mkbankspring.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Dps {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Accounts account;
    private Double monthlyInstallment;
    private Integer durationInMonths;

    @Temporal(TemporalType.DATE)
    private Date startDpsDate;

    // Maturity date of DPS (startDate + duration)
    @Temporal(TemporalType.DATE)
    private Date dpsMaturityDate;
    private Double interestRate;
    private Double maturityAmount;

    // Number of installments paid
    private Integer totalDepositsMade;

    // Status of DPS (ACTIVE, CLOSED, DEFAULTED)
    @Enumerated(EnumType.STRING)
    private DpsStatus dpsStatus;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dpsLastUpdatedAt;

    public Dps() {
    }

    public Dps(Long id, Accounts account, Double monthlyInstallment, Integer durationInMonths, Date startDpsDate, Date dpsMaturityDate, Double interestRate, Double maturityAmount, Integer totalDepositsMade, DpsStatus dpsStatus, Date dpsLastUpdatedAt) {
        this.id = id;
        this.account = account;
        this.monthlyInstallment = monthlyInstallment;
        this.durationInMonths = durationInMonths;
        this.startDpsDate = startDpsDate;
        this.dpsMaturityDate = dpsMaturityDate;
        this.interestRate = interestRate;
        this.maturityAmount = maturityAmount;
        this.totalDepositsMade = totalDepositsMade;
        this.dpsStatus = dpsStatus;
        this.dpsLastUpdatedAt = dpsLastUpdatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Accounts getAccount() {
        return account;
    }

    public void setAccount(Accounts account) {
        this.account = account;
    }

    public Double getMonthlyInstallment() {
        return monthlyInstallment;
    }

    public void setMonthlyInstallment(Double monthlyInstallment) {
        this.monthlyInstallment = monthlyInstallment;
    }

    public Integer getDurationInMonths() {
        return durationInMonths;
    }

    public void setDurationInMonths(Integer durationInMonths) {
        this.durationInMonths = durationInMonths;
    }

    public Date getStartDpsDate() {
        return startDpsDate;
    }

    public void setStartDpsDate(Date startDpsDate) {
        this.startDpsDate = startDpsDate;
    }

    public Date getDpsMaturityDate() {
        return dpsMaturityDate;
    }

    public void setDpsMaturityDate(Date dpsMaturityDate) {
        this.dpsMaturityDate = dpsMaturityDate;
    }

    public Double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(Double interestRate) {
        this.interestRate = interestRate;
    }

    public Double getMaturityAmount() {
        return maturityAmount;
    }

    public void setMaturityAmount(Double maturityAmount) {
        this.maturityAmount = maturityAmount;
    }

    public Integer getTotalDepositsMade() {
        return totalDepositsMade;
    }

    public void setTotalDepositsMade(Integer totalDepositsMade) {
        this.totalDepositsMade = totalDepositsMade;
    }

    public DpsStatus getDpsStatus() {
        return dpsStatus;
    }

    public void setDpsStatus(DpsStatus dpsStatus) {
        this.dpsStatus = dpsStatus;
    }

    public Date getDpsLastUpdatedAt() {
        return dpsLastUpdatedAt;
    }

    public void setDpsLastUpdatedAt(Date dpsLastUpdatedAt) {
        this.dpsLastUpdatedAt = dpsLastUpdatedAt;
    }
}
