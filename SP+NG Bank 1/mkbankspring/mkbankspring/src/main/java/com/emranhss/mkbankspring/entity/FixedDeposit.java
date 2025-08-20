package com.emranhss.mkbankspring.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class FixedDeposit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Linked bank account for this FD
    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Accounts account;

    // Principal amount deposited
    private Double depositAmount;

    // Duration of FD in months
    private Integer durationInMonths;

    // Normal interest rate if FD runs till maturity
    private Double interestRate;

    // Lower interest rate applied for premature withdrawal
    private Double prematureInterestRate;

    // FD start date
    @Temporal(TemporalType.DATE)
    private Date startDate;

    // FD maturity date
    @Temporal(TemporalType.DATE)
    private Date maturityDate;

    // Final maturity amount (principal + interest, calculated)
    private Double maturityAmount;

    // If FD is withdrawn before maturity, store withdrawal date
    @Temporal(TemporalType.DATE)
    private Date prematureWithdrawalDate;

    // Status of FD (ACTIVE, CLOSED, WITHDRAWN)
    @Enumerated(EnumType.STRING)
    private FdStatus status;

    // check first creat
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    //chack last update
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
}
