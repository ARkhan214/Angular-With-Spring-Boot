package com.emranhss.mkbankspring.restcontroller;

import com.emranhss.mkbankspring.entity.Loan;
import com.emranhss.mkbankspring.service.AccountService;
import com.emranhss.mkbankspring.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loan/")
public class LoanRestController {
    @Autowired
    private LoanService loanService;

    @Autowired
    private AccountService accountService;

    // Account holder apply for a loan
    @PostMapping("apply")
    public ResponseEntity<Loan> applyLoan(@RequestBody Loan loan, Authentication authentication) {
        // Get account id from logged-in user
        Long accountId = accountService.findAccountByEmail(authentication.getName()).getId();
        Loan appliedLoan = loanService.applyLoan(accountId, loan);
        return ResponseEntity.ok(appliedLoan);
    }

    // Account holder view own loans
    @GetMapping("myloans")
    public ResponseEntity<List<Loan>> getMyLoans(Authentication authentication) {
        Long accountId = accountService.findAccountByEmail(authentication.getName()).getId();
        List<Loan> loans = loanService.getLoansByAccount(accountId);
        return ResponseEntity.ok(loans);
    }

    // Account holder pay EMI
    @PostMapping("pay/{loanId}")
    public ResponseEntity<Loan> payEMI(@PathVariable Long loanId,
                                       @RequestParam double amount) {
        Loan loan = loanService.payEMI(loanId, amount);
        return ResponseEntity.ok(loan);
    }

    // Admin view all pending loans
    @GetMapping("pending")
    public ResponseEntity<List<Loan>> getPendingLoans() {
        List<Loan> loans = loanService.getPendingLoans();
        return ResponseEntity.ok(loans);
    }

    // Admin approve a loan
    @PostMapping("approve/{loanId}")
    public ResponseEntity<Loan> approveLoan(@PathVariable Long loanId) {
        Loan loan = loanService.approveLoan(loanId);
        return ResponseEntity.ok(loan);
    }

    // Admin reject a loan
    @PostMapping("reject/{loanId}")
    public ResponseEntity<Loan> rejectLoan(@PathVariable Long loanId) {
        Loan loan = loanService.rejectLoan(loanId);
        return ResponseEntity.ok(loan);
    }
}
