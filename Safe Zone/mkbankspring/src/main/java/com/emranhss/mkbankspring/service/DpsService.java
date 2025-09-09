package com.emranhss.mkbankspring.service;

import com.emranhss.mkbankspring.dto.AccountsDTO;
import com.emranhss.mkbankspring.dto.DpsDTO;
import com.emranhss.mkbankspring.dto.DpsRequestDto;
import com.emranhss.mkbankspring.entity.*;
import com.emranhss.mkbankspring.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DpsService {

    @Autowired
    private DpsAccountRepository dpsAccountRepository;

    @Autowired
    private DpsPaymentRepository dpsPaymentRepository;

    @Autowired
    private GLTransactionRepository glTransactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    // creat dps
//    public Dps createDps(DpsRequestDto requestDto, Long accountId) {
//        Accounts account = accountRepository.findById(accountId)
//                .orElseThrow(() -> new RuntimeException("Account not found"));
//
//        double interestRate = getInterestRateByTerm(requestDto.getDurationInMonths());
//
//        Dps dpsAccount = new Dps();
//        dpsAccount.setAccount(account);
//        dpsAccount.setMonthlyAmount(requestDto.getMonthlyInstallment());
//        dpsAccount.setTermMonths(requestDto.getDurationInMonths());
//        dpsAccount.setAnnualInterestRate(interestRate);
//        dpsAccount.setStartDate(new Date());
//        dpsAccount.setStatus(DpsStatus.ACTIVE);
//        dpsAccount.setMonthsPaid(0);
//
//        return dpsAccountRepository.save(dpsAccount);
//    }


    @Transactional
    public Dps createDps(Dps dps, Long accountId) {

        Accounts account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        System.out.println(account + "111111111111111111111111111");

        double interestRate = getInterestRateByTerm(dps.getTermMonths());

        Dps newDps = new Dps();
        newDps.setAccount(account);
//        newDps.setMonthlyAmount(dps.getMonthsPaid());
        newDps.setMonthlyAmount(dps.getMonthlyAmount());
        newDps.setMonthsPaid(dps.getMonthsPaid());
//        newDps.setTermMonths(dps.getTermMonths());
        newDps.setTermMonths(dps.getTermMonths());
        newDps.setAnnualInterestRate(interestRate);


        Date startDate = new Date();
        newDps.setStartDate(startDate);

        // nextDebitDate = startDate + 1 month
        Calendar cal = Calendar.getInstance();
        cal.setTime(startDate);
        cal.add(Calendar.MONTH, 1);


        newDps.setNextDebitDate(cal.getTime());

        newDps.setStatus(DpsStatus.ACTIVE);

        newDps.setMonthsPaid(0);
        newDps.setMissedCount(0);
        newDps.setTotalDeposited(0.0);

        System.out.println(newDps + "2222222222222222222222222");

        return dpsAccountRepository.save(newDps);
    }


    //interest rate
    private double getInterestRateByTerm(int durationInMonths) {
        if (durationInMonths <= 6) return 5.0;
        else if (durationInMonths <= 12) return 8.5;
        else return 10.0;
    }

    //monthly payments
    public void processMonthlyPayment(Long dpsId, String token) {
        Dps dpsAccount = dpsAccountRepository.findById(dpsId)
                .orElseThrow(() -> new RuntimeException("DPS not found"));

        Accounts account = dpsAccount.getAccount();
        double amount = dpsAccount.getMonthlyAmount();

        if (account.getBalance() < amount)
            throw new RuntimeException("Insufficient balance for monthly DPS payment.");

        account.setBalance(account.getBalance() - amount);
        dpsAccount.setMonthsPaid(dpsAccount.getMonthsPaid() + 1);
        dpsAccount.setTotalDeposited(dpsAccount.getTotalDeposited() + amount);

        DpsPayment payment = new DpsPayment();
        payment.setDps(dpsAccount);
        payment.setPaymentDate(new Date());
        payment.setAmount(amount);
        payment.setPenalty(0.0);


        Transaction txn = new Transaction();
        txn.setAccount(account);
        System.out.println("Account number " + account);
        txn.setAmount(amount);
        txn.setTransactionTime(new Date());
        txn.setType(TransactionType.DPS_DEPOSIT);
        txn.setDescription("DPS Payment");
        txn.setToken(token);
        System.out.println("token----------" + token);
        transactionRepository.save(txn);


        dpsPaymentRepository.save(payment);
        accountRepository.save(account);
        dpsAccountRepository.save(dpsAccount);
    }

    //apply penalty
    public void applyPenalty(Long dpsId, double penaltyPercent) {
        Dps dpsAccount = dpsAccountRepository.findById(dpsId)
                .orElseThrow(() -> new RuntimeException("DPS not found"));

        double penalty = dpsAccount.getMonthlyAmount() * penaltyPercent / 100;
        Accounts account = dpsAccount.getAccount();

        if (account.getBalance() < (dpsAccount.getMonthlyAmount() + penalty))
            throw new RuntimeException("Insufficient balance for penalty payment.");

        account.setBalance(account.getBalance() - (dpsAccount.getMonthlyAmount() + penalty));
        dpsAccount.setMonthsPaid(dpsAccount.getMonthsPaid() + 1);

        DpsPayment payment = new DpsPayment();
        payment.setDps(dpsAccount);
        payment.setPaymentDate(new Date());
        payment.setAmount(dpsAccount.getMonthlyAmount());
        payment.setPenalty(penalty);
        dpsPaymentRepository.save(payment);

        GLTransaction glTransaction = new GLTransaction();
        glTransaction.setAmount(penalty);
        glTransaction.setTransactionDate(new Date());
        glTransaction.setDescription("DPS Penalty");
        glTransactionRepository.save(glTransaction);

        accountRepository.save(account);
        dpsAccountRepository.save(dpsAccount);
    }

    //Dps close
    public void closeDps(Long dpsId) {
        Dps dpsAccount = dpsAccountRepository.findById(dpsId)
                .orElseThrow(() -> new RuntimeException("DPS not found"));

        if (dpsAccount.getStatus() == DpsStatus.CLOSED)
            throw new RuntimeException("DPS already closed.");

        double totalDeposited = dpsPaymentRepository.findByDpsAccount(dpsAccount)
                .stream()
                .mapToDouble(DpsPayment::getAmount)
                .sum();

        double interest = totalDeposited * dpsAccount.getAnnualInterestRate() / 100;
        double finalAmount = totalDeposited + interest;

        Accounts account = dpsAccount.getAccount();
        account.setBalance(account.getBalance() + finalAmount);

        dpsAccount.setStatus(DpsStatus.CLOSED);
        dpsAccount.setNextDebitDate(new Date());

        accountRepository.save(account);
        dpsAccountRepository.save(dpsAccount);
    }

    //force closed
    public void forceCloseIfMissed(Long dpsId) {
        Dps dpsAccount = dpsAccountRepository.findById(dpsId)
                .orElseThrow(() -> new RuntimeException("DPS not found"));

        int paidMonths = dpsAccount.getMonthsPaid();
        int duration = dpsAccount.getTermMonths();

        if ((duration - paidMonths) >= 3) {
            double totalDeposited = dpsPaymentRepository.findByDpsAccount(dpsAccount)
                    .stream()
                    .mapToDouble(DpsPayment::getAmount)
                    .sum();

            double interest = totalDeposited * 1.5 / 100;
            double finalAmount = totalDeposited + interest;

            Accounts account = dpsAccount.getAccount();
            account.setBalance(account.getBalance() + finalAmount);

            dpsAccount.setStatus(DpsStatus.CLOSED);
            dpsAccount.setNextDebitDate(new Date());

            accountRepository.save(account);
            dpsAccountRepository.save(dpsAccount);
        }
    }


    //===========================View Part
    // ✅ Login account এর সব DPS দেখার জন্য
//    public List<Dps> getDpsByAccountId(Long accountId) {
//        return dpsAccountRepository.findByAccountId(accountId);
//    }

    public List<DpsDTO> getDpsByAccountId(Long accountId) {
        List<Dps> dpsList = dpsAccountRepository.findByAccountId(accountId);

        return dpsList.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // Entity → DTO mapping method according to your DpsDTO
    private DpsDTO mapToDto(Dps dps) {
        if (dps == null) return null;

        Long accId = null;
        String accName = null;
        Accounts acc = dps.getAccount();
        if (acc != null) {
            accId = acc.getId();
            accName = acc.getName();
        }

        return new DpsDTO(
                dps.getId(),
                accId,
                accName,
                dps.getMonthlyAmount(),
                dps.getTermMonths(),
                dps.getStartDate(),
                dps.getNextDebitDate(),
                dps.getStatus(),
                dps.getTotalDeposited(),
                dps.getMissedCount(),
                dps.getMonthsPaid(),
                dps.getAnnualInterestRate()
        );
    }


    // ✅ এক DPS এর বিস্তারিত view
    public Dps getDpsById(Long dpsId, Long accountId) {
        Dps dps = dpsAccountRepository.findById(dpsId)
                .orElseThrow(() -> new RuntimeException("DPS not found"));

        if (!dps.getAccount().getId().equals(accountId)) {
            throw new RuntimeException("You are not authorized to view this DPS");
        }

        return dps;
    }
}
