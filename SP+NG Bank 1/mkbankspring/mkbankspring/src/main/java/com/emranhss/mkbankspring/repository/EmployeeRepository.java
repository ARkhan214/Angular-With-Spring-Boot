package com.emranhss.mkbankspring.repository;

import com.emranhss.mkbankspring.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
