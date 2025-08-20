package com.emranhss.mkbankspring.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Account holder of this loan
    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Accounts account;

    // Principal loan amount
    private double loanAmount;

    // Annual interest rate in percentage
    private double interestRate;

    // Duration of loan in months
    private int durationInMonths;

    // Monthly installment (EMI)
    private double emiAmount;

    // Loan type (PERSONAL, HOME, CAR, etc.)
    @Enumerated(EnumType.STRING)
    private LoanType loanType;

    // Loan status (ACTIVE, CLOSED, DEFAULTED)
    @Enumerated(EnumType.STRING)
    private LoanStatus status;

    // Loan start date
    @Temporal(TemporalType.DATE)
    private Date startDate;

    // Loan maturity date
    @Temporal(TemporalType.DATE)
    private Date maturityDate;

    // Total amount already paid
    private double totalPaid;

    // Remaining amount to be paid
    private double remainingAmount;

    // Penalty rate for late payment or default (optional)
    private double penaltyRate;

    // Date when last payment was made
    @Temporal(TemporalType.DATE)
    private Date lastPaymentDate;

    // Audit fields
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    // Constructors, getters, setters
    public Loan() {
    }
}
