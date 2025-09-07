package com.emranhss.mkbankspring.repository;

import com.emranhss.mkbankspring.entity.GLTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GLTransactionRepository extends JpaRepository<GLTransaction, Long> {
}
