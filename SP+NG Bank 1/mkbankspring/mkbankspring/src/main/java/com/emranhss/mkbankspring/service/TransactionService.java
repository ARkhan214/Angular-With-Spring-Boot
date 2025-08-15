package com.emranhss.mkbankspring.service;

import com.emranhss.mkbankspring.entity.Accounts;
import com.emranhss.mkbankspring.entity.Transaction;
import com.emranhss.mkbankspring.entity.TransactionType;
import com.emranhss.mkbankspring.repository.AccountRepository;
import com.emranhss.mkbankspring.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private AccountRepository accountRepository;

    // Method for Transaction Taka (connected with TransactionResCon Method Number -1)
    public Transaction addTransaction(Transaction transaction, Long id) {

        Accounts sender = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found!"));

        if (!sender.isAccountActiveStatus()) {
            throw new RuntimeException("Sender account is closed!");
        }

        double newBalance = sender.getBalance();


        if (transaction.getType() == TransactionType.DEPOSIT) {
            newBalance += transaction.getAmount();
        } else if (transaction.getType() == TransactionType.WITHDRAW) {
            if (transaction.getAmount() > newBalance) {
                throw new RuntimeException("Insufficient balance!");
            }
            newBalance -= transaction.getAmount();
        }


        sender.setBalance(newBalance);
        accountRepository.save(sender);

        transaction.setAccount(sender);
        transaction.setTransactionTime(new Date());

        return transactionRepository.save(transaction);
    }


    // Save or update transaction
    public Transaction saveTransaction(Transaction transaction){
        return transactionRepository.save(transaction);
    }

    // Get all transactions(connected with TransactionResCon Method Number -2)
    public List<Transaction> getAllTransactions(){
        return transactionRepository.findAll();
    }

    // Get transactions by Account ID
    public Transaction getTransactionByAccountId(Long accountId){
        return transactionRepository.findById(accountId).get();
    }

    // Get transactions by accountId
    public List<Transaction> getTransactionsByAccountId(Long accountId){
        return transactionRepository.findByAccountId(accountId);
    }

    //for delete transaction by id (connected with TransactionResCon Method Number -4)
    public void deleteTransactionByAccountId(Long accountId) {
        transactionRepository.deleteByAccountId(accountId);
    }


    // Get transactions by Accounts object (connected with TransactionResCon Method Number -3)
    public List<Transaction> getTransactionsByAccount(Accounts account) {
        return transactionRepository.findByAccount(account);
    }



    //Table Relation Use kore filter kora(Transaction table er sathe Account Table er Relation k kaje lagano)
    //Transaction Type baboher kore filter kora(connected with TransactionResCon Method Number -5)
    //Method for Search Transaction by deposit
    public List<Transaction> getDepositsByAccount(Long accountId) {
        Accounts account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found!"));

        return account.getTransactions().stream()
                .filter(t -> t.getType() == TransactionType.DEPOSIT)
                .toList();
    }


    //Table Relation Use kore filter kora(Transaction table er sathe Account Table er Relation k kaje lagano)
    //Transaction Type baboher kore filter kora(connected with TransactionResCon Method Number -6)
    //Method for Search Transaction by withdraw
    public List<Transaction> getWithdrawsByAccount(Long accountId) {
        Accounts account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found!"));

        return account.getTransactions().stream()
                .filter(t -> t.getType() == TransactionType.WITHDRAW)
                .toList();
    }


}
