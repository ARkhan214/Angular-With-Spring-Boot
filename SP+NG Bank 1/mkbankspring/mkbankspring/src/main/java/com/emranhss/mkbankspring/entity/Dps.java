package com.emranhss.mkbankspring.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Dps {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Linked bank account for this DPS
    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Accounts account;

    // Monthly installment amount
    private Double monthlyInstallment;

    // Duration of DPS in months
    private Integer durationInMonths;

    // Start date of DPS
    @Temporal(TemporalType.DATE)
    private Date startDate;

    // Maturity date of DPS (startDate + duration)
    @Temporal(TemporalType.DATE)
    private Date maturityDate;

    // Interest rate offered by bank
    private Double interestRate;

    // Total amount to be received after maturity
    private Double maturityAmount;

    // Number of installments paid
    private Integer totalDepositsMade;

    // Status of DPS (ACTIVE, CLOSED, DEFAULTED)
    @Enumerated(EnumType.STRING)
    private DpsStatus status;

    // Audit fields
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
}
