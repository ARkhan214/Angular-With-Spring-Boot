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

    @Autowired
    public TransactionRestController(TransactionService transactionService,
                                     AccountRepository accountRepository){
        this.transactionService = transactionService;
        this.accountRepository = accountRepository;
    }

    //  Add a new transaction (handles Deposit, Withdraw, Transfer)
    @PostMapping("")
    public ResponseEntity<Transaction> addTransaction(@RequestBody Transaction transaction) {

        // Sender account fetch & set
        Accounts sender = accountRepository.findById(transaction.getAccount().getId())
                .orElseThrow(() -> new RuntimeException("Sender account not found!"));

        // Receiver account fetch & set
        Accounts receiver = accountRepository.findById(transaction.getReceiverAccount().getId())
                .orElseThrow(() -> new RuntimeException("Sender account not found!"));



        if (transaction.getReceiverAccount() != null && transaction.getReceiverAccount().getId() != null) {
            receiver = accountRepository.findById(transaction.getReceiverAccount().getId())
                    .orElseThrow(() -> new RuntimeException("Receiver account not found!"));
        }

        transaction.setAccount(sender);
        transaction.setReceiverAccount(receiver);

        // Set current time if transactionTime is null
        if (transaction.getTransactionTime() == null) {
            transaction.setTransactionTime(new Date());
        }

        // Call service to process transaction
        Transaction savedTransaction = transactionService.addTransaction(transaction);

        return ResponseEntity.ok(savedTransaction);
    }




    //  Get all transactions
    @GetMapping("/all")
    public ResponseEntity<List<Transaction>> getAllTransactions(){
        List<Transaction> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }

    //  Get transactions by account ID
    @GetMapping("/account/{accountId}")
    public ResponseEntity<List<Transaction>> getTransactionsByAccount(@PathVariable Long accountId){
        Accounts account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        List<Transaction> transactions = transactionService.getTransactionsByAccount(account);
        return ResponseEntity.ok(transactions);
    }


    //  Get transactions by type (Deposit, Withdraw, Transfer, Receive)
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Transaction>> getTransactionsByType(@PathVariable String type){
        List<Transaction> transactions = transactionService.getTransactionsByType(type);
        return ResponseEntity.ok(transactions);
    }

    // Get transactions by account ID + date range
    @GetMapping("/account/{accountId}/range")
    public ResponseEntity<List<Transaction>> getTransactionsByAccountAndDateRange(
            @PathVariable Long accountId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date end
    ){
        if (start != null && end != null){
            List<Transaction> transactions = transactionService.getTransactionsByAccountAndDateRange(accountId, start, end);
            return ResponseEntity.ok(transactions);
        } else {
            return getTransactionsByAccount(accountId);
        }
    }
}
