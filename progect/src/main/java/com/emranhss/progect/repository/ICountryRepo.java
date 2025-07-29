package com.emranhss.progect.repository;

import com.emranhss.progect.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICountryRepo extends JpaRepository<Country,Long> {
}
