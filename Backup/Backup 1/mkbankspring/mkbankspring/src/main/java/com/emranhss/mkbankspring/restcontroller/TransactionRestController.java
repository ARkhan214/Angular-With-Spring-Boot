package com.emranhss.mkbankspring.restcontroller;

import com.emranhss.mkbankspring.entity.Accounts;
import com.emranhss.mkbankspring.entity.Transaction;
import com.emranhss.mkbankspring.repository.AccountRepository;
import com.emranhss.mkbankspring.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/transactions/")
@CrossOrigin("*")
public class TransactionRestController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private AccountRepository accountRepository;

//    @Autowired
//    public TransactionRestController(TransactionService transactionService,
//                                     AccountRepository accountRepository){
//        this.transactionService = transactionService;
//        this.accountRepository = accountRepository;
//    }


    //   Method for Transaction Taka(Method Number -1)
    @PostMapping("{accountId}")
    public ResponseEntity<Transaction> addTransaction(
            @RequestBody Transaction transaction,
            @PathVariable Long accountId) {

        Transaction savedTransaction = transactionService.addTransaction(transaction, accountId);
        return ResponseEntity.ok(savedTransaction);
    }

    //  Get all transactions(Method Number -2)
    @GetMapping("/all")
    public ResponseEntity<List<Transaction>> getAllTransactions(){
        List<Transaction> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }

    //  Get transactions by account ID(Method Number -3)
    @GetMapping("account/{accountId}")
    public ResponseEntity<List<Transaction>> getTransactionsByAccount(@PathVariable Long accountId){
        Accounts account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        List<Transaction> transactions = transactionService.getTransactionsByAccount(account);
        return ResponseEntity.ok(transactions);
    }

    //for delete transaction by id(Method Number -4)
    @DeleteMapping("{id}")
    public void deleteTransactionByAccountId(Long accountId) {

        transactionService.deleteTransactionByAccountId(accountId);
    }


    //(Method Number -5)
    //Table Relation Use kore filter kora(Transaction table er sathe Account Table er Relation k kaje lagano)
    //Method for Search Transaction by deposit
    @GetMapping("/{accountId}/deposits")
    public ResponseEntity<List<Transaction>> getDeposits(@PathVariable Long accountId) {
        List<Transaction> deposits = transactionService.getDepositsByAccount(accountId);
        return ResponseEntity.ok(deposits);
    }

    //(Method Number -6)
    //Method for Search Transaction by withdraw
    @GetMapping("/{accountId}/withdraws")
    public ResponseEntity<List<Transaction>> getWithdraws(@PathVariable Long accountId) {
        List<Transaction> withdraws = transactionService.getWithdrawsByAccount(accountId);
        return ResponseEntity.ok(withdraws);
    }




}
