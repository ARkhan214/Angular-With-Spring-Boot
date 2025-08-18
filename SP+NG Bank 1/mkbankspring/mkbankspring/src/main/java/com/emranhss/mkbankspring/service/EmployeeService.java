package com.emranhss.mkbankspring.service;

import com.emranhss.mkbankspring.entity.Employee;
import com.emranhss.mkbankspring.entity.EmployeeStatus;
import com.emranhss.mkbankspring.repository.EmployeeRepository;
import com.emranhss.mkbankspring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;



//    public void retireEmployee(Long id) {
//        Employee employee = employeeRepository.getEmployeeById(id);
//        employee.setStatus(EmployeeStatus.RETIRED);
//        employee.getUser().set;
//
//        // Close all accounts linked with employee
//        accountRepository.findByEmployee(employee)
//                .forEach(acc -> acc.setAccountActiveStatus(false));
//
//        employeeRepository.save(employee);
//    }



}
