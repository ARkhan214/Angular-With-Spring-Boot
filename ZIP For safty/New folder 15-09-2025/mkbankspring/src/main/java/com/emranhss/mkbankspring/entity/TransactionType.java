package com.emranhss.mkbankspring.entity;

public enum TransactionType {

    INITIALBALANCE,
    DEPOSIT,
    FD_DEPOSIT,
    WITHDRAW,
    FIXED_DEPOSIT,
    FIXED_DEPOSIT_CLOSED,
    FD_CLOSED_PENALTY,
    TRANSFER,
    RECEIVE,
    DPS_DEPOSIT,

    // Bill Payments
    BILL_PAYMENT,              // Generic bill payment
    BILL_PAYMENT_ELECTRICITY,  // Electricity bill payment
    BILL_PAYMENT_GAS,          // Gas bill payment
    BILL_PAYMENT_WATER,        // Water bill payment
    BILL_PAYMENT_INTERNET,     // Internet / broadband bill payment
    BILL_PAYMENT_MOBILE,       // Mobile recharge / postpaid bill payment
    BILL_PAYMENT_CREDIT_CARD   // Credit card bill payment

}
