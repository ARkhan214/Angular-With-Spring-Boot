package com.emranhss.mkbankspring.entity;

public enum TransactionType {

    INITIALBALANCE,
    DEPOSIT,
    WITHDRAW,
    FIXED_DEPOSIT,
    TRANSFER,
    RECEIVE,

    // Bill Payments
    BILL_PAYMENT,              // Generic bill payment
    BILL_PAYMENT_ELECTRICITY,  // Electricity bill payment
    BILL_PAYMENT_GAS,          // Gas bill payment
    BILL_PAYMENT_WATER,        // Water bill payment
    BILL_PAYMENT_INTERNET,     // Internet / broadband bill payment
    BILL_PAYMENT_MOBILE,       // Mobile recharge / postpaid bill payment
    BILL_PAYMENT_CREDIT_CARD   // Credit card bill payment
}
