package com.emranhss.mkbankspring.repository;

import com.emranhss.mkbankspring.entity.Accounts;
import com.emranhss.mkbankspring.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Long> {

    List<Transaction> findByAccount(Accounts account);

    // Get transactions by account ID
    List<Transaction> findByAccountId(Long accountId);

    // Get transactions by account ID (newest first)
    List<Transaction> findByAccountIdOrderByTransactionTimeDesc(Long accountId);

    // Get transactions by type (Deposit, Withdraw, etc.)
    List<Transaction> findByType(String type);
}
