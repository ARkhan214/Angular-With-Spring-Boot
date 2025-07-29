package com.example.crud.service;

import com.example.crud.entity.Employee;
import com.example.crud.repository.IEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private IEmployeeRepository iEmployeeRepository;

    public List<Employee> getAll() {
        return iEmployeeRepository.findAll();
    }

    public Employee getById(Long id) {
        return iEmployeeRepository.findById(id).orElse(null);

    }

    public void save(Employee employee){
        iEmployeeRepository.save(employee);
    }


    public void delete(Long id) {
        iEmployeeRepository.deleteById(id);
    }
}
