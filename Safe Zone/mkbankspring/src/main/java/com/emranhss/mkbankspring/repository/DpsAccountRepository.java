package com.emranhss.mkbankspring.repository;


import com.emranhss.mkbankspring.entity.Dps;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DpsAccountRepository extends JpaRepository<Dps, Long> {

    // একটি account এর সব DPS খুঁজে পেতে
    List<Dps> findByAccountId(Long accountId);

    // Optional: Active DPS খুঁজে পেতে
    List<Dps> findByAccountIdAndStatus(Long accountId, String status);
}
