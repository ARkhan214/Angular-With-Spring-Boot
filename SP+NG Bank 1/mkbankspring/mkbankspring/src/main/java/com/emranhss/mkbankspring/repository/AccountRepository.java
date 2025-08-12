package com.emranhss.mkbankspring.repository;

import com.emranhss.mkbankspring.entity.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Accounts,Long> {

    Optional<Accounts> findById(Long id);
}
