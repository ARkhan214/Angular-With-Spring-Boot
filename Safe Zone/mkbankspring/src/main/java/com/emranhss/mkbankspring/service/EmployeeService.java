package com.emranhss.mkbankspring.service;

import com.emranhss.mkbankspring.dto.EmployeeDTO;
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

    //find Employee by id (connected with EmployeeResCon Method Number -2)
    public Employee findEmployeeById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }


    // Get Employee by User ID
    public EmployeeDTO getProfileByUserId(String email) {
        Employee employee = employeeRepository.findByUserEmail(email).orElse(null);

        EmployeeDTO dto = new EmployeeDTO();
        dto.setId(employee.getId());
        dto.setName(employee.getName());
        dto.setStatus(employee.getStatus());
        dto.setNid(employee.getNid());
        dto.setPhoneNumber(employee.getPhoneNumber());
        dto.setAddress(employee.getAddress());
        dto.setPosition(employee.getPosition());
        dto.setSalary(employee.getSalary());
        dto.setDateOfJoining(employee.getDateOfJoining());
        dto.setDateOfBirth(employee.getDateOfBirth());
        dto.setRetirementDate(employee.getRetirementDate());
        dto.setUserId(employee.getUser() != null ? employee.getUser().getId() : null);
        dto.setPhoto(employee.getPhoto());
        dto.setRole(employee.getRole());

        return dto;
    }

    public Employee findEmployeeByEmail(String email) {
        return employeeRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Employee not found for user with email: " + email));
    }

    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }
}
