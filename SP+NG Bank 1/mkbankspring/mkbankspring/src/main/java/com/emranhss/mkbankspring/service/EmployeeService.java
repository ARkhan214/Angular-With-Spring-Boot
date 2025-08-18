package com.emranhss.mkbankspring.service;

import com.emranhss.mkbankspring.entity.Accounts;
import com.emranhss.mkbankspring.entity.Employee;
import com.emranhss.mkbankspring.entity.EmployeeStatus;
import com.emranhss.mkbankspring.repository.EmployeeRepository;
import com.emranhss.mkbankspring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

@Autowired
private EmployeeRepository employeeRepository;


    public Employee save(Employee employee) {
    return employeeRepository.save(employee);
    }

    //find all Employee (connected with EmployeeResCon Method Number -)
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    //find Employee by id (connected with EmployeeResCon Method Number -)
    public Employee findEmployeeById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }


    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }
}
