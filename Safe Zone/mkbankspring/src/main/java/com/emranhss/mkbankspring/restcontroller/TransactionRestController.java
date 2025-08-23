package com.emranhss.mkbankspring.restcontroller;

import com.emranhss.mkbankspring.entity.Accounts;
import com.emranhss.mkbankspring.entity.Transaction;
import com.emranhss.mkbankspring.entity.User;
import com.emranhss.mkbankspring.repository.AccountRepository;
import com.emranhss.mkbankspring.repository.UserRepository;
import com.emranhss.mkbankspring.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions/")
public class TransactionRestController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private AccountRepository accountRepository;


    @Autowired
    private UserRepository userRepository;

    //  Get all transactions(Method Number -2)
    @GetMapping("all")
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }

    //For Admin dashbord
    @GetMapping("positive")
    public ResponseEntity<List<Transaction>> getPositiveTransactions() {
        return ResponseEntity.ok(transactionService.getPositiveTransactions());
    }

    //  Get transactions by account ID(Method Number -3)
    @GetMapping("account/{accountId}")
    public ResponseEntity<List<Transaction>> getTransactionsByAccount(@PathVariable Long accountId) {
        Accounts account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        List<Transaction> transactions = transactionService.getTransactionsByAccountId(accountId);
        return ResponseEntity.ok(transactions);
    }

    //for delete transaction by id(Method Number -4)
    @DeleteMapping("{id}")
    public void deleteTransactionByAccountId(@PathVariable Long accountId) {

        transactionService.deleteTransactionByAccountId(accountId);
    }


    //(Method Number -5)
    //Table Relation Use kore filter kora(Transaction table er sathe Account Table er Relation k kaje lagano)
    //Method for Search Transaction by deposit
    @GetMapping("{accountId}/deposits")
    public ResponseEntity<List<Transaction>> getDeposits(@PathVariable Long accountId) {
        List<Transaction> deposits = transactionService.getDepositsByAccount(accountId);
        return ResponseEntity.ok(deposits);
    }

    //(Method Number -6)
    //Method for Search Transaction by withdraw
    @GetMapping("{accountId}/withdraws")
    public ResponseEntity<List<Transaction>> getWithdraws(@PathVariable Long accountId) {
        List<Transaction> withdraws = transactionService.getWithdrawsByAccount(accountId);
        return ResponseEntity.ok(withdraws);
    }

    //for transaction after add sequrity(Initial,deposit,withdraw)
    @PostMapping("tr/{id}")
    public Transaction deposit(
            @RequestBody Transaction transaction,
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "");  // token add
        return transactionService.addTransaction(transaction, id, token);
    }

    /// /method transfer
//@PostMapping("tr/{senderId}/{receiverId}")
//public Transaction transfer(
//        @RequestBody Transaction transaction,
//        @PathVariable Long senderId,
//        @PathVariable Long receiverId,
//        @RequestHeader("Authorization") String authHeader) {
//
//    String token = authHeader.replace("Bearer ", "");
//    return transactionService.onlyTransfer(transaction, senderId, receiverId, token);
//}


//method transfer
    @PostMapping("tr/transfer/{receiverId}")
    public Transaction transfer(
            @RequestBody Transaction transaction,
            @PathVariable Long receiverId,
            Authentication authentication) {

        String token = (String) authentication.getCredentials();  // raw JWT token
        String username = authentication.getName();
        Optional<User> user = userRepository.findByEmail(username);
        User u = user.orElseThrow(() -> new RuntimeException("User not found with email: " + username));
        Accounts sender = accountRepository.findAccountByUser(u)
                .orElseThrow(() -> new RuntimeException("Account not found for user: " + username));


        return transactionService.onlyTransfer(transaction, sender.getId(), receiverId, token);
    }


}
