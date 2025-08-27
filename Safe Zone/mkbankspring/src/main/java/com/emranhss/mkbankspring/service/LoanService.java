package com.emranhss.mkbankspring.service;

import com.emranhss.mkbankspring.entity.Accounts;
import com.emranhss.mkbankspring.entity.Loan;
import com.emranhss.mkbankspring.entity.LoanStatus;
import com.emranhss.mkbankspring.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class LoanService {
    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private AccountService accountService;

    // Account holder apply loan
    public Loan applyLoan(Long accountId, Loan loan) {
        Accounts account = accountService.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        loan.setAccount(account);
        loan.setStatus(LoanStatus.PENDING);
        loan.setLoanStartDate(new Date());

        // EMI Calculation
        double principal = loan.getLoanAmount();
        double monthlyRate = loan.getInterestRate() / 12 / 100;
        int months = loan.getDurationInMonths();
        double emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                (Math.pow(1 + monthlyRate, months) - 1);
        loan.setEmiAmount(Math.round(emi * 100.0) / 100.0);

        // Total and remaining amount
        loan.setTotalAlreadyPaidAmount(0);
        loan.setRemainingAmount(loan.getEmiAmount() * months);

        // Maturity Date
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MONTH, months);
        loan.setLoanMaturityDate(cal.getTime());

        loan.setUpdatedAt(new Date());
        return loanRepository.save(loan);
    }

    // Account holder view own loans
    public List<Loan> getLoansByAccount(Long accountId) {
        return loanRepository.findByAccountId(accountId);
    }

    // Admin view pending loans
    public List<Loan> getPendingLoans() {
        return loanRepository.findByStatus(LoanStatus.PENDING);
    }

    // Admin approve loan
    public Loan approveLoan(Long loanId) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));
        loan.setStatus(LoanStatus.ACTIVE);
        loan.setUpdatedAt(new Date());
        return loanRepository.save(loan);
    }

    // Admin reject loan
    public Loan rejectLoan(Long loanId) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));
        loan.setStatus(LoanStatus.CLOSED);
        loan.setUpdatedAt(new Date());
        return loanRepository.save(loan);
    }

    // Payment (Account holder pays EMI)
    public Loan payEMI(Long loanId, double amount) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        // Update paid amount
        double totalPaid = loan.getTotalAlreadyPaidAmount() + amount;
        loan.setTotalAlreadyPaidAmount(totalPaid);

        // Update remaining amount
        double remaining = (loan.getEmiAmount() * loan.getDurationInMonths()) - totalPaid;
        loan.setRemainingAmount(Math.max(0, remaining));

        // Update last payment date
        loan.setLastPaymentDate(new Date());
        loan.setUpdatedAt(new Date());

        // If fully paid, close loan
        if (remaining <= 0) {
            loan.setStatus(LoanStatus.CLOSED);
        }

        return loanRepository.save(loan);
    }
}
