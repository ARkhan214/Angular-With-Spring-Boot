package com.emranhss.mkbankspring.service;

import com.emranhss.mkbankspring.entity.Accounts;
import com.emranhss.mkbankspring.entity.Transaction;
import com.emranhss.mkbankspring.repository.AccountRepository;
import com.emranhss.mkbankspring.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    @Autowired
    private AccountRepository accountRepository;

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

    public Transaction addTransaction(Transaction transaction) {
        Accounts sender = transaction.getAccount();
        if (!sender.isAccountActiveStatus()) {
            throw new RuntimeException("Sender account is closed!");
        }

        double newBalance = sender.getBalance();
        switch (transaction.getType()) {
            case DEPOSIT -> newBalance += transaction.getAmount();
            case WITHDRAW -> {
                if (transaction.getAmount() > newBalance) throw new RuntimeException("Insufficient balance!");
                newBalance -= transaction.getAmount();
            }
            case TRANSFER -> {
                if (transaction.getAmount() > newBalance) throw new RuntimeException("Insufficient balance!");
                newBalance -= transaction.getAmount();

                Accounts receiver = transaction.getReceiverAccount();
                if (receiver == null || !receiver.isAccountActiveStatus()) {
                    throw new RuntimeException("Receiver account is invalid or closed!");
                }
                receiver.setBalance(receiver.getBalance() + transaction.getAmount());
                accountRepository.save(receiver);
            }
        }

        sender.setBalance(newBalance);
        accountRepository.save(sender);
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsByAccount(Accounts account) {
        return transactionRepository.findByAccount(account);
    }

//    public List<Transaction> getAllTransactions() {
//        return transactionRepository.findAll();
//    }


}
