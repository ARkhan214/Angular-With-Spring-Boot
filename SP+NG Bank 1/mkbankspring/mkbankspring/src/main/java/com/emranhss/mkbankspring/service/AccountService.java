package com.emranhss.mkbankspring.service;

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

    public List<Accounts> getAll() {
        return accountRepository.findAll();
    }

    public Optional<Accounts> getById(Long id) {
        return accountRepository.findById(id);
    }

    public Accounts save(Accounts accounts) {
        return accountRepository.save(accounts);
    }

    public void delete(Long id) {
        accountRepository.deleteById(id);
    }
}
