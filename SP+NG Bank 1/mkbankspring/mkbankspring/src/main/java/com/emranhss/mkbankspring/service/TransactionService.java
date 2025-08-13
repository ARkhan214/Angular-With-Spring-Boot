package com.emranhss.mkbankspring.service;

import com.emranhss.mkbankspring.entity.Transaction;
import com.emranhss.mkbankspring.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository){
        this.transactionRepository = transactionRepository;
    }

    // Save or update transaction
    public Transaction saveTransaction(Transaction transaction){
        return transactionRepository.save(transaction);
    }

    // Get all transactions
    public List<Transaction> getAllTransactions(){
        return transactionRepository.findAll();
    }

    // Get transactions by accountId
    public List<Transaction> getTransactionsByAccountId(Long accountId){
        return transactionRepository.findByAccountId(accountId);
    }

    // Get transactions by type
    public List<Transaction> getTransactionsByType(String type){
        return transactionRepository.findByType(type);
    }

    // Optional: Get transaction by Id
    public Optional<Transaction> getTransactionById(Long id){
        return transactionRepository.findById(id);
    }
}
