package com.emranhss.mkbankspring.service;

import com.emranhss.mkbankspring.dto.AccountsDTO;
import com.emranhss.mkbankspring.entity.Accounts;
import com.emranhss.mkbankspring.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    //find all account (connected with AccountResCon Method Number -3)
    public List<Accounts> getAll() {
        return accountRepository.findAll();
    }

    //    Method for Transaction Taka (id diea account er data ana)(connected with AccountResCon Method Number 3 & 4)
    public Optional<Accounts> findById(Long id) {
        return accountRepository.findById(id);
    }


    //find account by id (connected with AccountResCon Method Number -2)
    public Accounts findAccountById(Long id) {
        return accountRepository.findById(id).orElse(null);
    }

    //method for save (connected with AccountResCon Method Number -4)
    public Accounts save(Accounts accounts) {
        return accountRepository.save(accounts);
    }

    //method for delete
    public void delete(Long id) {
        accountRepository.deleteById(id);
    }

//    public Accounts getProfileByUserId(Long userId) {
//        return accountRepository.findByUserId(userId)
//                .orElseThrow(() -> new RuntimeException("Account not found"));
//    }


    // Profile method (returns DTO)
    public AccountsDTO getProfileByEmail(String email) {
        Accounts account = findAccountByEmail(email);

        AccountsDTO dto = new AccountsDTO();
        dto.setId(account.getId());
        dto.setName(account.getName());
        dto.setAccountActiveStatus(account.isAccountActiveStatus());
        dto.setAccountType(account.getAccountType());
        dto.setBalance(account.getBalance());
        dto.setNid(account.getNid());
        dto.setPhoneNumber(account.getPhoneNumber());
        dto.setAddress(account.getAddress());
        dto.setPhoto(account.getPhoto());
        dto.setDateOfBirth(account.getDateOfBirth());
        dto.setAccountOpeningDate(account.getAccountOpeningDate());
        dto.setAccountClosingDate(account.getAccountClosingDate());
        dto.setRole(account.getRole() != null ? account.getRole().name() : null);

        return dto;
    }



    // Find Account by Email
    public Accounts findAccountByEmail(String email) {
        return accountRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Account not found for user with email: " + email));
    }

    // Find Account Id by Email
    public Long findAccountIdByEmail(String email) {
        Accounts account = findAccountByEmail(email);
        return account.getId();
    }
}
