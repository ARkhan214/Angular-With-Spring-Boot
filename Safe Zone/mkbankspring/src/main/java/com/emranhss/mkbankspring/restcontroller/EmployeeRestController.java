package com.emranhss.mkbankspring.restcontroller;

import com.emranhss.mkbankspring.dto.AccountsDTO;
import com.emranhss.mkbankspring.dto.EmployeeDTO;
import com.emranhss.mkbankspring.dto.TransactionDTO;
import com.emranhss.mkbankspring.entity.Accounts;
import com.emranhss.mkbankspring.entity.Employee;
import com.emranhss.mkbankspring.entity.User;
import com.emranhss.mkbankspring.repository.EmployeeRepository;
import com.emranhss.mkbankspring.repository.UserRepository;
import com.emranhss.mkbankspring.service.AuthService;
import com.emranhss.mkbankspring.service.EmployeeService;
import com.emranhss.mkbankspring.service.TransactionService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees/")
public class EmployeeRestController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionService transactionService;

    // for employee save or update or registration (Method Number -1)
    @PostMapping("")
    public ResponseEntity<Map<String, String>> registerAccount(
            @RequestPart(value = "user") String userJson,
            @RequestPart(value = "employee") String employeeJson,
            @RequestParam(value = "photo") MultipartFile file
    ) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        User user = objectMapper.readValue(userJson, User.class);
        Employee employee = objectMapper.readValue(employeeJson, Employee.class);

        try {
            authService.registerEmployee(user, file, employee);
            Map<String, String> response = new HashMap<>();
            response.put("Message", "User Added Successfully ");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Message", "User Add Faild " + e);
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // (Method 1) find all Employee
//    @GetMapping("all")
//    public ResponseEntity<List<Employee>> getAllEmployees() {
//        List<Employee> employees = employeeService.getAllEmployees();
//        return ResponseEntity.ok(employees);
//    }


    @GetMapping("all")
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {

        return ResponseEntity.ok(employeeService.getAllEmployeesDTO());
    }


    // (Method 2) find Employee by id(related with EmployeeService method -3)
//    @GetMapping("{id}")
//    public EmployeeDTO getEmployeeById(@PathVariable Long id) {
//        return employeeService.getProfileByUserId(id);
//    }

//    @GetMapping("profile")
//    public ResponseEntity<?> getProfileForEmployee(Authentication authentication) {
//
//        System.out.println("Authenticated User: " + authentication.getName());
//        System.out.println("Authorities: " + authentication.getAuthorities());
//        String email = authentication.getName();
//        Optional<User> user =userRepository.findByEmail(email);
//        Employee employee = employeeService.findEmployeeById(user.get().getId());
//        System.out.println(employee+"3333333");
//        return ResponseEntity.ok(employee);
//
//    }

//    @GetMapping("/profile")
//    public ResponseEntity<EmployeeDTO> getProfile(Authentication authentication) {
//        String email = authentication.getName();
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        EmployeeDTO employeeProfile = employeeService.getProfileByUserId(user.getId());
//        return ResponseEntity.ok(employeeProfile);
//    }

//
@GetMapping("profile")
public EmployeeDTO getProfile(Authentication authentication) {
    return employeeService.getProfileByUserId(authentication.getName());
}

//Employee eta diea Account Holder er TransactionStatement dekhbe
    @GetMapping("{accountId}")
    public List<TransactionDTO> getTransactionStatement(@PathVariable Long accountId) {
        return transactionService.getTransactionsByAccountID(accountId);
    }


    //Total Salary calculate
    @GetMapping("total-salary")
    public ResponseEntity<Double> getTotalSalary() {
        return ResponseEntity.ok(employeeService.getTotalSalary());
    }

}
